function asyncEnum(arr, more, resolve, defResult, initResult, enumFrom, getBreak, getResult) {
    if (!arr || !arr.length || !more) {
        resolve({result: defResult, success: true});
        return;
    }

    var doFrom = enumFrom;
    var doLen = 1;
    var doStop = false;
    var result = initResult;
    var stop = () => doStop = true;
    var forEach = () => {
        var startTime = Date.now();
        for (var i = doFrom; i < Math.min(doFrom + doLen, arr.length); i++) {
            result = getResult(stop, i, result);
            if ((getBreak && getBreak(result)) || doStop) break;
        }
        doFrom += doLen;
        if ((doFrom >= arr.length) || doStop) {
            resolve({result, success: !doStop});
            return;
        }
        doLen = (Date.now() - startTime < 34) ? (doLen << 1) : Math.max(doLen >> 1, 1);
        setTimeout(forEach, 0);
    };

    forEach();
}

export function asyncEvery(arr, more) {
    return new Promise(resolve => {
        asyncEnum(arr, more, resolve, true, true, 0, r => !r, (s, i) => more(arr[i], i, arr, s));
    });
}

export function asyncForEach(arr, more) {
    return new Promise(resolve => {
        asyncEnum(arr, more, resolve, arr, arr, 0, null, (s, i) => more(arr[i], i, arr, s));
    });
}

export function asyncMap(arr, more) {
    return new Promise(resolve => {
        asyncEnum(arr, more, resolve, arr, [], 0, null, (s, i, r) => {
            r[i] = more(arr[i], i, arr, s);
            return r;
        });
    });
}

export function asyncReduce(arr, more, init) {
    return new Promise(resolve => {
        var defInit = arr.length && (arguments.length < 3);
        asyncEnum(arr, more, resolve, arr, defInit ? 1 : 0, defInit ? arr[0] : init, null, (s, i, r) => {
            r = more(r, arr[i], i, arr, s);
            return r;
        });
    });
}

export function asyncReduceRight(arr, more, init) {
    return new Promise(resolve => {
        var arrLen = arr && arr.length;
        var defInit = arrLen && (arguments.length < 3);
        asyncEnum(arr, more, resolve, arr, defInit ? 1 : 0, defInit ? arr[0] : init, null, (s, i, r) => {
            var index = arrLen - i - 1;
            r = more(r, arr[index], index, arr, s);
            return r;
        });
    });
}

export function asyncSome(arr, more) {
    return new Promise(resolve => {
        asyncEnum(arr, more, resolve, false, false, 0, r => r, (s, i) => more(arr[i], i, arr, s));
    });
}