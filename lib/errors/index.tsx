import { type NotFoundHandler, type ErrorHandler } from 'hono';
import { routePath } from 'hono/route';
import { getDebugInfo, setDebugInfo } from '@/utils/debug-info';
import { config } from '@/config';
import * as Sentry from '@sentry/node';
import logger from '@/utils/logger';
import Error from '@/views/error';

import { FetchError, RequestError } from 'ofetch';
import { HTTPError } from 'hono/http-exception';
import NotFoundError from './types/not-found';
import RejectError from './types/reject';
import RequestInProgressError from './types/request-in-progress';

import { requestMetric } from '@/utils/otel';

export const errorHandler: ErrorHandler = (error, ctx) => {
    const requestPath = ctx.req.path;
    const matchedRoute = routePath(ctx);
    const hasMatchedRoute = matchedRoute !== '/*';

    const debug = getDebugInfo();
    if (ctx.res.headers.get('RSSHub-Cache-Status')) {
        debug.hitCache++;
    }
    debug.error++;

    debug.errorPaths[requestPath] = (debug.errorPaths[requestPath] || 0) + 1;

    if (hasMatchedRoute) {
        debug.errorRoutes[matchedRoute] = (debug.errorRoutes[matchedRoute] || 0) + 1;
    }
    setDebugInfo(debug);

    if (config.sentry.dsn) {
        Sentry.withScope((scope) => {
            scope.setTag('name', requestPath.split('/')[1]);
            Sentry.captureException(error);
        });
    }

    let errorMessage = (process.env.NODE_ENV || process.env.VERCEL_ENV) === 'production' ? error.message : error.stack || error.message;
    if (error instanceof HTTPError || error instanceof RequestError || error instanceof FetchError) {
        ctx.status(503);
    } else if (error instanceof RequestInProgressError) {
        ctx.header('Cache-Control', `public, max-age=${config.requestTimeout / 1000}`);
        ctx.status(503);
    } else if (error instanceof RejectError || error.name === 'RejectError') {
        ctx.status(403);
    } else if (error instanceof NotFoundError || error.name === 'NotFoundError') {
        ctx.status(404);
        errorMessage += 'The route does not exist or has been deleted.';
    } else {
        ctx.status(503);
    }
    const message = `${error.name}: ${errorMessage}`;

    logger.error(`Error in ${requestPath}: ${message}`);
    requestMetric.error({ path: matchedRoute, method: ctx.req.method, status: ctx.res.status });

    return config.isPackage || ctx.req.query('format') === 'json'
        ? ctx.json({
              error: {
                  message: error.message ?? error,
              },
          })
        : ctx.html(<Error requestPath={requestPath} message={message} errorRoute={hasMatchedRoute ? matchedRoute : requestPath} nodeVersion={process.version} />);
};

export const notFoundHandler: NotFoundHandler = (ctx) => errorHandler(new NotFoundError(), ctx);
