import type { Route } from '@/types';
import { fetchLance } from './utils';

export const route: Route = {
    path: '/campeonato/:slug+',
    name: 'Notícias de Campeonato',
    url: 'https://www.lance.com.br',
    maintainers: ['gemini-code-assist'],
    example: '/lance/campeonato/brasileirao',
    parameters: {
        slug: 'ID do campeonato, encontrado na URL do site. Ex: `brasileirao` ou `tudo-sobre/campeonato-italiano`.',
    },
    categories: ['sports', 'traditional-media'],
    description: 'Retorna as notícias mais recentes de um campeonato de futebol específico do Lance!.',
    handler: fetchLance,
    radar: [
        {
            source: [
                'lance.com.br/champions-league',
                'lance.com.br/premier-league',
                'lance.com.br/la-liga',
                'lance.com.br/bundesliga',
                'lance.com.br/tudo-sobre/campeonato-italiano',
                'lance.com.br/ligue-1',
                'lance.com.br/copa-do-brasil',
                'lance.com.br/brasileirao',
                'lance.com.br/libertadores',
                'lance.com.br/copa-do-mundo',
            ],
            target: (params, url) => `/lance/campeonato/${new URL(url).pathname.substring(1)}`,
        },
    ],
};

