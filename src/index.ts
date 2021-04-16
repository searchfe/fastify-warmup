import type {FastifyInstance} from 'fastify';
import type {WarmupConf} from './types';
import fs from 'fs/promises';

export async function warmupPlugin(fastify: FastifyInstance, conf: WarmupConf) {
    const {
        warmupData,
        maxConcurrent = Infinity,
        timeout = Infinity
    } = conf;

    if (!warmupData) {
        const errorText = 'warmupData can not be undefined!';
        fastify.log.fatal(errorText);
        throw new Error(errorText);
    }

    const res = await fastify.inject({
        method: 'post',
        url: '/',
        query: {
            someKey: 'meixg'
        }
    });
}