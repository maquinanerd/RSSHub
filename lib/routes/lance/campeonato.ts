import type { Route } from '@/types';
import { fetchLance } from './utils';

export const route: Route = {
    path: '/campeonato/:slug+',
    name: 'Notícias de Campeonato',
    url: 'https://www.lance.com.br',
    maintainers: ['gemini-code-assist'],
    example: '/lance/campeonato/brasileirao-serie-a.html',
    parameters: {
        slug: 'ID do campeonato, encontrado na URL do site. Ex: `brasileirao-serie-a.html` ou `tudo-sobre/campeonato-italiano`.',
    },
    categories: ['sports', 'traditional-media'],
    description: 'Retorna as notícias mais recentes de um campeonato de futebol específico do Lance!.',
    handler: fetchLance,
    radar: [
        {
            source: [
                'lance.com.br/brasileirao-serie-a.html',
                'lance.com.br/copa-do-brasil.html',
                'lance.com.br/libertadores.html',
                'lance.com.br/champions-league.html',
                'lance.com.br/premier-league.html',
                'lance.com.br/la-liga.html',
                'lance.com.br/bundesliga.html',
                'lance.com.br/tudo-sobre/campeonato-italiano',
                'lance.com.br/ligue-1.html',
                'lance.com.br/copa-do-mundo.html',
            ],
            target: (params, url) => `/lance/campeonato/${new URL(url).pathname.substring(1)}`,
        },
    ],
};
