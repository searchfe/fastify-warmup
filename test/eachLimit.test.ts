import {eachLimit} from '../src/eachLimit';
import Timeout from 'await-timeout';

test('eachLimit', async () => {
    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let runningCount = 0;
    let doneCount = 0;
    await eachLimit(items, async (item) => {
        runningCount++;
        await Timeout.set(Math.random() * 1000);

        expect(runningCount <= 3).toBe(true);
        runningCount--;
        doneCount++;
        return;
    }, 3);

    expect(doneCount).toBe(items.length);
});