import got from '@/utils/got';
import cheerio from 'cheerio';

export const route = {
    path: '/brasileirao',
    name: 'Brasileirão - notícias',
    example: '/uol/brasileirao?limit=10',
    async handler(ctx) {
        const base = 'https://esporte.uol.com.br/futebol/campeonatos/brasileirao/';
        const { data: html } = await got(base);
        const $ = cheerio.load(html);

        const cards = $('article a, .results-items a');

        let items = cards.toArray().map((el) => {
            const a = $(el);
            const href = a.attribs.href;
            const title = a.text().trim();
            if (!href || !title) {
                return null;
            }
            return {
                title,
                link: new URL(href, base).href,
            };
        });

        items = items.slice(0, Number.parseInt(ctx.query.limit || '10', 10));

        ctx.state.data = {
            title: 'UOL Esporte – Brasileirão',
            link: base,
            item: items,
        };
    },
};
