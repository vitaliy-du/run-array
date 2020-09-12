export const asyncForEach = (arr, more) => (
    new Promise(resolve => {
        if (!arr || !arr.length || !more) {
            resolve(true);
            return;
        }

        let doFrom = 0;
        let doLen = 1;
        const forEach = () => {
            let cancel = false;
            const startTime = Date.now();
            for (let i = doFrom; i < Math.min(doFrom + doLen, arr.length); i++) {
                if (more(arr[i], i, arr)) continue;
                cancel = true;
                break;
            }
            doFrom += doLen;
            if ((doFrom >= arr.length) || cancel) {
                resolve(!cancel);
                return;
            }
            doLen = (Date.now() - startTime < 34) ? (doLen << 1) : Math.max(doLen >> 1, 1);
            setTimeout(forEach, 0);
        };

        forEach();
    })
);