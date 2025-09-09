import type { Data } from '@/types';
import type { Context } from 'hono';
import { URL } from 'node:url';
import cache from '@/utils/cache';
import got from '@/utils/got';
import { load } from 'cheerio';

export const fetchChampionshipNews = (path: string, title: string, description: string, ctx: Context): Promise<Data> => {
    const base = `https://esporte.uol.com.br/futebol/campeonatos/${path}/`;

    return cache.tryGet(base, async () => {
        const { data: html } = await got(base);
        const $ = load(html);

        // Seleciona somente os cards de notícias, ignorando tabelas e placares do topo.
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
            title,
            link: base,
            item: items.slice(0, Math.min(limit, 50)),
            description,
            language: 'pt-br',
        };
    });
};
