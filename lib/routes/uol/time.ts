import type { Route } from '@/types';
import { fetchLance } from './utils';

export const route: Route = {
    path: '/time/:slug',
    name: 'Notícias de Time',
    url: 'https://www.lance.com.br',
    maintainers: ['gemini-code-assist'],
    example: '/lance/time/flamengo',
    parameters: {
        slug: 'ID do time, encontrado na URL do site. Ex: `flamengo` para o time do Flamengo.',
    },
    categories: ['sports', 'traditional-media'],
    description: 'Retorna as notícias mais recentes de um time de futebol específico do Lance!.',
    handler: fetchLance,
    radar: [
        {
            source: [
                'lance.com.br/atletico-mineiro',
                'lance.com.br/bahia',
                'lance.com.br/botafogo',
                'lance.com.br/ceara',
                'lance.com.br/corinthians',
                'lance.com.br/gremio',
                'lance.com.br/fortaleza',
                'lance.com.br/fluminense',
                'lance.com.br/flamengo',
                'lance.com.br/cruzeiro',
                'lance.com.br/internacional',
                'lance.com.br/palmeiras',
                'lance.com.br/santos',
                'lance.com.br/sao-paulo',
                'lance.com.br/vasco',
                'lance.com.br/vitoria',
            ],
            target: (params, url) => `/lance/time/${new URL(url).pathname.substring(1)}`,
        },
    ],
};