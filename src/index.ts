import {TaskLoader} from './taskLoader';
import {runTasks} from './taskRunner';
import Timeout from 'await-timeout';
import type {WarmupConf, FastifyInstanceLike} from '../types/types';

export async function fastifyWarmup(fastify: FastifyInstanceLike, conf: WarmupConf) {
    const {
        warmupData,
        maxConcurrent = Infinity,
        basePath,
        timeout
    } = conf;

    /* istanbul ignore next */
    if (!warmupData) {
        const errorText = 'warmupData can not be undefined!';
        fastify.log.error(errorText);
        throw new Error(errorText);
    }

    /* istanbul ignore next */
    if (!basePath) {
        const errorText = 'basePath can not be undefined!';
        fastify.log.error(errorText);
        throw new Error(errorText);
    }

    const taskLoader = new TaskLoader(warmupData, basePath, fastify.log);
    const taskList = await taskLoader.run();

    if (timeout) {
        const timer = new Timeout();
        try {
            await Promise.race([
                runTasks(fastify, taskList, maxConcurrent),
                timer.set(timeout, 'warmup timeout!')
            ]);
        }
        finally {
            timer.clear();
        }
    }
    else {
        await runTasks(fastify, taskList, maxConcurrent);
    }

}

export type {WarmupConf} from '../types/types';