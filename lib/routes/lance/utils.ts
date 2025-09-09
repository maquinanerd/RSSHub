import type { Context } from 'hono';
import type { DataItem } from '@/types';
import cache from '@/utils/cache';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';
import { art } from '@/utils/render';
import path from 'node:path';

const baseUrl = 'https://www.lance.com.br';

export const fetchLance = async (ctx: Context) => {
    const slug = ctx.req.param('slug');
    const url = `${baseUrl}/${slug}`;

    const { data: response } = await got(url);
    const $ = load(response);

    const feedTitle = $('title').first().text().split('|')[0].trim();

    const list = $('.list-item-wrapper a')
        .toArray()
        .map((item) => {
            const element = $(item);
            const link = new URL(element.attr('href') as string, baseUrl).href;
            const title = element.find('h2, .item-title').text().trim();
            return { title, link };
        })
        .filter((item) => item.link && item.title);

    const items = await Promise.all(
        list.map((item) =>
            cache.tryGet(item.link, async () => {
                const { data: detailResponse } = await got(item.link);
                const $$ = load(detailResponse);

                $$('.related-content, .ads-container, .OUTBRAIN, [class*="ads"]').remove();

                const description = art(path.join(__dirname, 'templates/description.art'), {
                    image: $$('.lazyload[data-src]').first().attr('data-src'),
                    content: $$('.content-container').html(),
                });

                const pubDate = $$('div.author-info > p > time').attr('datetime');

                const dataItem: DataItem = {
                    title: item.title,
                    link: item.link,
                    description,
                    pubDate: pubDate ? parseDate(pubDate) : undefined,
                };
                return dataItem;
            })
        )
    );

    return {
        title: `Lance! - ${feedTitle}`,
        link: url,
        item: items,
        description: `Notícias sobre ${feedTitle} no Lance!.`,
        language: 'pt-br',
    };
};

