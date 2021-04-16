import fastify from 'fastify';
import {fastifyWarmup} from '../src';
import path from 'path';
import { sleep } from '../src/utils';

const app = fastify({
    logger: true
});

(async () => {
    app.get('/a', async (req, rep) => {
        // @ts-ignore
        console.log('a', req.query.warmup);
        await sleep(1000);
        // @ts-ignore
        return req.query.warmup;
    });

    app.get('/b', async (req, rep) => {
        // @ts-ignore
        console.log('b', req.query.warmup);
        await sleep(500);
        // @ts-ignore
        return req.query.warmup;
    });

    await fastifyWarmup(app, {
        warmupData: {
            '/a': ['a'],
            '/b': 'b.json'
        },
        basePath: path.resolve(__dirname, '../test/warmupData')
    });

    const address = await app.listen(3001);
})();