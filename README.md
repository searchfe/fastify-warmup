# fastify-warmup

fastify warmup plugin

## options

```ts
interface Conf {
    warmupData: {
        [routerPath: string]: {
            dataPath: string[];
        }
    };
    maxConcurrent: number;
    timeout: number;
}
```

其中 dataPath 中的值可以为一个目录或文件。当为目录时，加载该目录下的所有 .json 文件。

预热文件格式：

```ts
interface WarmupData {
    method: String;
    query: Object;
    payload: Object;
    headers: Object;
    cookies: Object;
}
```

