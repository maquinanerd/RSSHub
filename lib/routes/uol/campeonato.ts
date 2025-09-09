import type { Route } from '@/types';
import { fetchUOLCampeonato } from './utils';

export const route: Route = {
    path: '/campeonato/:slug',
    name: 'Notícias de Campeonato',
    url: 'https://www.uol.com.br/esporte/futebol/',
    maintainers: ['gemini-code-assist'],
    example: '/uol/campeonato/brasileirao-serie-a',
    parameters: {
        slug: 'ID do campeonato, encontrado na URL do site. Ex: `brasileirao-serie-a`.',
    },
    categories: ['sports', 'traditional-media'],
    description: 'Retorna as notícias mais recentes de um campeonato de futebol específico do UOL Esporte.',
    handler: fetchUOLCampeonato,
    radar: [
        {
            source: [
                'uol.com.br/esporte/futebol/campeonatos/brasileirao-serie-a',
                'uol.com.br/esporte/futebol/campeonatos/copa-do-brasil',
                'uol.com.br/esporte/futebol/campeonatos/libertadores',
                'uol.com.br/esporte/futebol/campeonatos/copa-sul-americana',
                'uol.com.br/esporte/futebol/campeonatos/liga-dos-campeoes',
                'uol.com.br/esporte/futebol/campeonatos/campeonato-ingles',
                'uol.com.br/esporte/futebol/campeonatos/campeonato-espanhol',
                'uol.com.br/esporte/futebol/campeonatos/campeonato-italiano',
            ],
            target: (params, url) => `/uol/campeonato/${new URL(url).pathname.split('/').pop()}`,
        },
    ],
};