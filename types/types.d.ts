import type {FastifyInstance, FastifyLoggerInstance} from 'fastify';

export interface WarmupConf {
    warmupData: Record<string, string[] | string> | string | string[];

    /**
     * warmup tasks will be split to groups
     * [maxConcurrent]s per group
     */
    maxConcurrent?: number;
    timeout?: number;

    /**
     * all the files/folders in warmupData
     * will find based on basePath.
     */
    basePath: string;
}

export interface WarmupData {
    method: String;
    query: Object;
    payload: Object;
    headers: Object;
    cookies: Object;
}

export interface WarmupTask {
    url: string;
    file: string;
}

export type FastifyInstanceLike = FastifyInstance | {
    log: FastifyLoggerInstance,
    inject: Function
}