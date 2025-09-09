import type { Route } from '@/types';
import { fetchChampionshipNews } from './utils';

export const route: Route = {
    path: '/copadobrasil',
    name: 'Copa do Brasil - notícias',
    example: '/uol/copadobrasil?limit=10',
    categories: ['sports', 'traditional-media'],
    maintainers: ['gemini-code-assist'],
    handler: (ctx) => fetchChampionshipNews('copa-do-brasil', 'UOL Esporte – Copa do Brasil (notícias)', 'Notícias sobre a Copa do Brasil no UOL Esporte.', ctx),
};
