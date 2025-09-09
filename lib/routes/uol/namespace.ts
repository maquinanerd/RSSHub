import type { Namespace } from '@/types';
import { route as time } from './time';
import { route as campeonato } from './campeonato';

export const namespace: Namespace = {
    name: 'UOL Esporte',
    url: 'uol.com.br/esporte/futebol',
    description: 'Notícias de futebol do portal UOL Esporte.',
    categories: ['sports', 'traditional-media'],
    routes: [time, campeonato],
};