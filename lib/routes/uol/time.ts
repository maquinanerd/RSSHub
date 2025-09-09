import type { Route } from '@/types';
import { fetchUOLTime } from './utils';

export const route: Route = {
    path: '/time/:slug',
    name: 'Notícias de Time',
    url: 'https://www.uol.com.br/esporte/futebol/',
    maintainers: ['gemini-code-assist'],
    example: '/uol/time/flamengo',
    parameters: {
        slug: 'ID do time, encontrado na URL do site. Ex: `flamengo` para o time do Flamengo.',
    },
    categories: ['sports', 'traditional-media'],
    description: 'Retorna as notícias mais recentes de um time de futebol específico do UOL Esporte.',
    handler: fetchUOLTime,
    radar: [
        {
            source: [
                'uol.com.br/esporte/futebol/times/atletico-mg',
                'uol.com.br/esporte/futebol/times/athletico-pr',
                'uol.com.br/esporte/futebol/times/bahia',
                'uol.com.br/esporte/futebol/times/botafogo',
                'uol.com.br/esporte/futebol/times/corinthians',
                'uol.com.br/esporte/futebol/times/cruzeiro',
                'uol.com.br/esporte/futebol/times/flamengo',
                'uol.com.br/esporte/futebol/times/fluminense',
                'uol.com.br/esporte/futebol/times/gremio',
                'uol.com.br/esporte/futebol/times/internacional',
                'uol.com.br/esporte/futebol/times/palmeiras',
                'uol.com.br/esporte/futebol/times/santos',
                'uol.com.br/esporte/futebol/times/sao-paulo',
                'uol.com.br/esporte/futebol/times/vasco',
            ],
            target: (params, url) => `/uol/time/${new URL(url).pathname.split('/').pop()}`,
        },
    ],
};