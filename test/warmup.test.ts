import fastify from 'fastify';
import {warmup} from '../src';
import path from 'path';
import {sleep} from '../src/utils';

const app = fastify({});

let aStr = '';
let bStr = '';
let error = jest.fn();

test('warmup', async () => {
    app.get('/a', async (req, rep) => {
        // @ts-ignore
        const warmup = req.query.warmup as string;

        aStr += warmup;
        await sleep(1000);
        return warmup;
    });

    app.get('/b', async (req, rep) => {
        // @ts-ignore
        const warmup = req.query.warmup as string;

        bStr += warmup;
        await sleep(500);
        return warmup;
    });

    await warmup(app, {
        warmupData: {
            '/a': ['a', 'c.json', 'd'],
            '/b': 'b.json',
            '': 'b.json',
        },
        maxConcurrent: 3,
        basePath: path.resolve(__dirname, '../test/warmupData')
    });

    try {
        // @ts-ignore
        await warmup(app, {});
    }
    catch {
        error();
    }

    expect(error).toBeCalledTimes(1);
    expect(aStr.split('')).toContain('1');
    expect(aStr.split('')).toContain('2');
    expect(bStr).toBe('b');
});