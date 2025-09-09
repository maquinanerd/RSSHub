import type { Route } from '@/types';
import cache from '@/utils/cache';
import got from '@/utils/got';
import { load } from 'cheerio';
import { URL } from 'url';

export const route: Route = {
    path: '/copadobrasil',
    name: 'Copa do Brasil - notícias',
    example: '/uol/copadobrasil?limit=10',
    async handler(ctx) {
        const base = 'https://esporte.uol.com.br/futebol/campeonatos/copa-do-brasil/';

        const html = await cache.tryGet(base, async () => (await got(base)).data, 5 * 60);
        const $ = load(html);

        const cards = $('article a, .results-items a, .cards-list a, .thumb-caption a');

        let items = cards
            .toArray()
            .map((el) => {
                const a = $(el);
                const href = a.attr('href');
                const title = a.find('h3, h2, .title').text().trim() || a.attr('title') || a.text().trim();
                if (!href || !title) {
                    return null;
                }

                const link = new URL(href, base).href;
                const description = a.find('p, .summary, .subtitle').text().trim();
                return { title, link, description };
            })
            .filter(Boolean) as Array<{ title: string; link: string; description?: string }>;

        const limit = Math.min(parseInt((ctx.query.limit as string) || '15', 10), 50);
        const filter = ctx.query.filter ? new RegExp(String(ctx.query.filter), 'i') : null;
        if (filter) {
            items = items.filter((it) => filter.test(it.title));
        }
        items = items.slice(0, limit);

        ctx.state.data = {
            title: 'UOL Esporte – Copa do Brasil (notícias)',
            link: base,
            item: items,
        };
    },
};
