import fastify from 'fastify';
import {fastifyWarmup} from '../src';
import path from 'path';
import Timeout from 'await-timeout';

const app = fastify({
    logger: true
});

(async () => {
    app.get('/a', async (req, rep) => {
        // @ts-ignore
        console.log('a', req.query.warmup);
        await Timeout.set(1000);
        // @ts-ignore
        return req.query.warmup;
    });

    app.get('/b', async (req, rep) => {
        // @ts-ignore
        console.log('b', req.query.warmup);
        await Timeout.set(500);
        // @ts-ignore
        return req.query.warmup;
    });

    await fastifyWarmup(app, {
        warmupData: {
            '/a': ['a'],
            '/b': 'b.json'
        },
        basePath: path.resolve(__dirname, '../test/warmupData'),
        timeout: 10
    });

    const address = await app.listen(3001);
})();