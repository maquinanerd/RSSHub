import type { Route } from '@/types';
import { fetchChampionshipNews } from './utils';

export const route: Route = {
    path: '/libertadores',
    name: 'Libertadores - notícias',
    example: '/uol/libertadores?limit=10',
    categories: ['sports', 'traditional-media'],
    maintainers: ['gemini-code-assist'],
    handler: (ctx) => fetchChampionshipNews('libertadores', 'UOL Esporte – Libertadores (notícias)', 'Notícias sobre a Copa Libertadores no UOL Esporte.', ctx),
};
