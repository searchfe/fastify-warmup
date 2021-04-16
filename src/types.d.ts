export interface WarmupConf {
    warmupData: {
        [routerPath: string]: {
            dataPath: string[];
        }
    };
    maxConcurrent: number;
    timeout: number;
}

export interface WarmupData {
    method: String;
    query: Object;
    payload: Object;
    headers: Object;
    cookies: Object;
}