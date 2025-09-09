import type { Route } from '@/types';
import type { Context } from 'hono';
import { URL } from 'node:url';
import cache from '@/utils/cache';
import got from '@/utils/got';
import { load } from 'cheerio';

export const route: Route = {
    path: '/brasileirao',
    name: 'Brasileirão - notícias',
    example: '/uol/brasileirao?limit=10',
    categories: ['sports', 'traditional-media'],
    maintainers: ['gemini-code-assist'],
    handler: (ctx: Context) => {
        const base = 'https://esporte.uol.com.br/futebol/campeonatos/brasileirao/';
        const feedTitle = 'UOL Esporte – Brasileirão (notícias)';
        const feedDescription = 'Notícias sobre o Campeonato Brasileiro no UOL Esporte.';

        return cache.tryGet(base, async () => {
            const { data: html } = await got(base);
            const $ = load(html);

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
                    const description = a.find('p, .summary, .subtitle').text().trim();
                    return { title, link, description };
                })
                .filter((item): item is Exclude<typeof item, null> => item !== null)
                .filter((item, index, self) => index === self.findIndex((t) => t.link === item.link));

            const limit = ctx.req.query('limit') ? Number.parseInt(ctx.req.query('limit'), 10) : 15;
            const filter = ctx.req.query('filter');

            if (filter) {
                const regex = new RegExp(filter, 'i');
                items = items.filter((it) => regex.test(it.title));
            }

            return {
                title: feedTitle,
                link: base,
                item: items.slice(0, Math.min(limit, 50)),
                description: feedDescription,
                language: 'pt-br',
            };
        });
    },
};
