import type { Data } from '@/types';
import type { Context } from 'hono';
import { URL } from 'node:url';
import cache from '@/utils/cache';
import got from '@/utils/got';
import { load } from 'cheerio';

const fetcher = (path: string, ctx: Context): Promise<Data> => {
    const base = `https://esporte.uol.com.br/futebol/${path}/`;

    return cache.tryGet(base, async () => {
        const { data: html } = await got(base);
        const $ = load(html);

        const pageTitle = $('title').text();
        const description = $('meta[name="description"]').attr('content') || pageTitle;

        const cards = $('article a, .results-items a, .cards-list a, .thumb-caption a');

        let items = cards
            .toArray()
            .map((el) => {
                const a = $(el);
                const href = a.attr('href');
                const title = a.find('h3, h2, .title').text().trim() || a.attr('title') || a.text().trim();
                if (!href || !title || href.startsWith('https://shopping.uol.com.br')) {
                    return null;
                }
                const link = new URL(href, base).href;
                const itemDescription = a.find('p, .summary, .subtitle').text().trim();
                return { title, link, description: itemDescription };
            })
            .filter((item): item is Exclude<typeof item, null> => item !== null)
            .filter((item, index, self) => index === self.findIndex((t) => t.link === item.link));

        const limit = ctx.req.query('limit') ? Number.parseInt(ctx.req.query('limit'), 10) : 15;

        return {
            title: pageTitle,
            link: base,
            item: items.slice(0, Math.min(limit, 50)),
            description,
            language: 'pt-br',
        };
    });
};

export const fetchUOLTime = (ctx: Context) => fetcher(`times/${ctx.req.param('slug')}`, ctx);
export const fetchUOLCampeonato = (ctx: Context) => fetcher(`campeonatos/${ctx.req.param('slug')}`, ctx);