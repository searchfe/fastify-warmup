import {TaskLoader} from './taskLoader';
import {runTasks} from './taskRunner';
import type {FastifyInstance} from 'fastify';
import type {WarmupConf} from './types';

export async function warmup(fastify: FastifyInstance, conf: WarmupConf) {
    const {
        warmupData,
        maxConcurrent = Infinity,
        timeout = Infinity,
        basePath
    } = conf;

    if (!warmupData) {
        const errorText = 'warmupData can not be undefined!';
        fastify.log.error(errorText);
        throw new Error(errorText);
    }

    if (!basePath) {
        const errorText = 'basePath can not be undefined!';
        fastify.log.error(errorText);
        throw new Error(errorText);
    }

    const taskLoader = new TaskLoader(warmupData, basePath, fastify.log);
    const taskList = await taskLoader.run();

    await runTasks(fastify, taskList, maxConcurrent);
}
