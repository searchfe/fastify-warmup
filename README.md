# fastify-warmup

A library used to warmup fastify server before call `.listen()`;

## how to use

```ts
function fastifyWarmup(fastify: FastifyInstance, conf: WarmupConf): void
```

## quick start

```shell
npm i fastify-warmup
```

```ts
import fastify from 'fastify';
import {fastifyWarmup} from 'fastify-warmup';

const app = fastify({logger: true});

(async () => {
    app.get('/a', async (req, rep) => {
    });
    app.get('/b', async (req, rep) => {
    });

    // will run after fastify.ready()
    await fastifyWarmup(app, {
        warmupData: {
            '/a': ['a'],
            '/b': 'b.json'
        },
        basePath: 'path/to/warmupBasePath'
    });

    const address = await app.listen(3001);
})();
```

## options

```ts
interface WarmupConf {
    warmupData: Record<string, string[] | string>;

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
```

The key of `warmupData` is the request url.

the Value of `warmupData` can be a string or string[], which can represents:

- **A folder**. will load a the files with extension `.json` in that folder.
- **A file**. **must be end with .json**

the .json file, which is the warmup data, can be：

```json
{
    "method": "get" | "post" | ...;
    "query": Object;
    "payload": Object;
    "headers": Object;
    "cookies": Object;
}
```


