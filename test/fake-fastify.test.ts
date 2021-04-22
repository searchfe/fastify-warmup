import {fastifyWarmup} from '../src';
import path from 'path';
import Timeout from 'await-timeout';
import fastify from 'fastify';

const f = fastify();


const aSet = new Set();

const app = {
    log: console,
    inject(data) {
        aSet.add(data.data);
    }
};

test('fake fastify warmupData array', async () => {
    await fastifyWarmup(app, {
        warmupData: ['fake.json'],
        maxConcurrent: 3,
        basePath: path.resolve(__dirname, '../test/warmupData')
    });

    expect(aSet.has('fake')).toBe(true);
});