import fastify from 'fastify';
import {fastifyWarmup} from '../src';
import path from 'path';
import Timeout from 'await-timeout';

const app = fastify({});

let aSet = new Set();
let bSet = new Set();;
let error = jest.fn();

app.get('/a', async (req, rep) => {
    // @ts-ignore
    const warmup = req.query.warmup as string;

    aSet.add(warmup);
    await Timeout.set(1000);
    return warmup;
});

app.get('/b', async (req, rep) => {
    // @ts-ignore
    const warmup = req.query.warmup as string;

    bSet.add(warmup);
    await Timeout.set(500);
    return warmup;
});

test('normal', async () => {

    await fastifyWarmup(app, {
        warmupData: {
            '/a': ['a', 'c.json', 'd'],
            '/b': 'b.json',
            '': 'b.json',
            '/c': ''
        },
        maxConcurrent: 3,
        basePath: path.resolve(__dirname, '../test/warmupData')
    });

    expect(aSet.has('1')).toBe(true);
    expect(aSet.has('2')).toBe(true);
    expect(bSet.has('b')).toBe(true);
});

test('warmupData array', async () => {
    await fastifyWarmup(app, {
        warmupData: [
            'array',
            'c.json'
        ],
        maxConcurrent: 3,
        basePath: path.resolve(__dirname, '../test/warmupData')
    });

    expect(aSet.has('array')).toBe(true);
    expect(bSet.has('c')).toBe(true);
});

test('empty options', async () => {
    try {
        // @ts-ignore
        await fastifyWarmup(app, {});
    }
    catch {
        error();
    }
    expect(error).toBeCalledTimes(1);
});

test('timeout', async () => {
    try {
        // @ts-ignore
        await fastifyWarmup(app, {
            warmupData: {
                '/a': ['a', 'c.json', 'd'],
                '/b': 'b.json',
                '': 'b.json',
            },
            maxConcurrent: 3,
            basePath: path.resolve(__dirname, '../test/warmupData'),
            timeout: 10
        });
    }
    catch {
        error();
    }

    expect(error).toBeCalledTimes(2);
});