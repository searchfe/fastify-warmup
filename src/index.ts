import {TaskLoader} from './taskLoader';
import {runTasks} from './taskRunner';
import type {FastifyInstance} from 'fastify';
import type {WarmupConf} from '../types/types';

export async function fastifyWarmup(fastify: FastifyInstance, conf: WarmupConf) {
    const {
        warmupData,
        maxConcurrent = Infinity,
        basePath
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

    await runTasks(fastify, taskList, maxConcurrent);
}

export type {WarmupConf} from '../types/types';