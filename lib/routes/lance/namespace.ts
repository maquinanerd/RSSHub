import type { Namespace } from '@/types';
import { route as time } from './time';
import { route as campeonato } from './campeonato';

export const namespace: Namespace = {
    name: 'Lance!',
    url: 'lance.com.br',
    description: 'Notícias de futebol do portal Lance!.',
    categories: ['sports', 'traditional-media'],
    routes: [time, campeonato],
};