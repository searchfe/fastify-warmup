# fastify-warmup

fastify warmup plugin

## options

```ts
interface WarmupConf {
    warmupData: Record<string, string[] | string>;
    maxConcurrent: number;
    timeout: number;
}
```

其中 dataPath 中的值可以为一个目录或文件:

- 当为目录时，加载该目录下的所有 .json 文件。
- **当为一个文件时，必须以 .json 结尾。**

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

把 url 单独抽离出来，不放在预热数据文件中的原因：

1. 预热数据产出与 server 的路径解偶。
2. 多路径复用同一预热数据。

