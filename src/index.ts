import type {FastifyInstance} from 'fastify';
import type {WarmupConf} from './types';
import fs from 'fs/promises';

export async function warmupPlugin(fastify: FastifyInstance, conf: WarmupConf) {
    const routes = Object.keys(conf);

    const res = await fastify.inject({
        method: 'post',
        url: '/',
        query: {
            someKey: 'meixg'
        }
    });
}