export interface WarmupConf {
    [routerPath: string]: {
        dataPath: string;
        method: string;
    }
}