import type { Namespace } from '@/types';
import { route as brasileirao } from './brasileirao';
import { route as libertadores } from './libertadores';
import { route as copadobrasil } from './copadobrasil';

export const namespace: Namespace = {
    name: 'uol',
    url: 'https://esporte.uol.com.br/',
    routes: [brasileirao, libertadores, copadobrasil],
};