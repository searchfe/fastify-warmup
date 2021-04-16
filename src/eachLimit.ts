export function eachLimit<T, R>(
    items: T[],
    handler: (item: T) => Promise<R>,
    limit: number
): Promise<R[]> {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(items)) {
            reject('items is not array.');
        }


        let runningTask = 0;
        let itemIndex = 0;
        let result = [] as R[];

        runTasks();

        function checkFinish() {
            if (runningTask === 0) {
                resolve(result);
            }
        }

        function runTasks() {
            while (runningTask < limit && itemIndex < items.length) {
                handler(items[itemIndex])
                    .then(res => {
                        result.push(res);
                    })
                    // 所有异常都应该在 handler 内处理，抛出来的就不管了
                    // 目前不需要支持提前退出
                    .catch()
                    .finally(() => {
                        runningTask--;
                        runTasks();
                        checkFinish();
                    });
                itemIndex++;
                runningTask++;
            }
        }
    });
}
