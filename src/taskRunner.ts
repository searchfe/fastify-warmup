import {eachLimit} from './eachLimit';
import {promises as fs} from 'fs';
import type {FastifyInstance} from "fastify";
import type {WarmupTask} from "../types/types";

export async function runTasks(
    fastify: FastifyInstance,
    taskList: WarmupTask[],
    limit: number
) {
    return eachLimit(taskList, async function(task) {
        try {
            const dataStr = await fs.readFile(task.file, 'utf-8');
            const data = JSON.parse(dataStr);
            data.url = task.url;
            await fastify.inject(data);
        }
        catch(e) {
            fastify.log.error(`warmup error: ${e && e.message}`);
        }
    }, limit);
}