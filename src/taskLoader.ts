import {promises as fs} from 'fs';
import path from 'path';
import type {FastifyInstance} from 'fastify';
import type {
    WarmupTask,
    WarmupConf
} from '../types/types';

export class TaskLoader {
    constructor(
        private warmupData: WarmupConf['warmupData'],
        private basePath: string,
        private logger: FastifyInstance['log']
    ) {}

    async run() {
        let taskList: WarmupTask[] = [];
        for (const [key, val] of Object.entries(this.warmupData)) {
            const tasks = await this.loadTaskFromPathList(key, val);
            taskList = taskList.concat(tasks);
        }
        return taskList;
    }

    async loadTaskFromPathList(key: string, val: string | string[]) {
        let taskList: WarmupTask[] = [];
        if (typeof val === 'string') {
            val = [val];
        };
        for (let i = 0; i < val.length; i++) {
            const tasks = await this.loadTaskFromPath(key, val[i]);
            taskList = taskList.concat(tasks);
        }
        return taskList;
    }

    async loadTaskFromPath(url: string, dataPath: string) {
        const taskList: WarmupTask[] = [];
        if (dataPath === '' || url === '') {
            return taskList;
        }

        const filePath = path.resolve(this.basePath, dataPath);

        // file
        // 这里不会检查文件是否存在
        if (path.extname(filePath) === '.json') {
            taskList.push({
                url,
                file: filePath
            });
            return taskList;
        }

        // folder
        let files: string[];
        try {
            files = await fs.readdir(filePath);
        }
        catch (e) {
            this.logger.error(`${filePath} not exist`);
            return taskList;
        }
    
        for (const file of files) {
            if (path.extname(file) === '.json') {
                const task = {
                    url: url,
                    file: path.resolve(filePath, file)
                };
                taskList.push(task);
            }
        }
        return taskList;
    }
}
