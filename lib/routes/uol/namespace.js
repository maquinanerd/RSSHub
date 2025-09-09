import { route as brasileirao } from './brasileirao.js';
import { route as libertadores } from './libertadores.js';
import { route as copadobrasil } from './copadobrasil.js';

export const namespace = {
    name: 'uol',
    url: 'https://esporte.uol.com.br/',
    routes: [brasileirao, libertadores, copadobrasil],
};
