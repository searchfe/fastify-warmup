export interface WarmupConf {
    warmupData: Record<string, string[] | string>;

    /**
     * 分成多组，每组 maxConcurrent 个
     */
    maxConcurrent: number;
    interval: number;
    timeout: number;
    basePath: string;
}

export interface WarmupData {
    method: String;
    query: Object;
    payload: Object;
    headers: Object;
    cookies: Object;
}

export interface WarmupTask {
    url: string;
    file: string;
}