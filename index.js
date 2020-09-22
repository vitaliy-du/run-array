function asyncEnum(arr, more, from, done, def, init, get) {
	return new Promise(function (finish) {
		if (!arr || !arr.length || !more) {
			finish({result: def, success: true});
			return;
		}

		var doFrom = (from > -1) ? from : arr.length + from;
		var doLen = 1;
		var doStop = false;
		var onStop = function () {
			doStop = true;
		};
		var result = init;

		var forEach = function () {
			var startTime = Date.now();
			for (var i = doFrom; i < Math.min(doFrom + doLen, arr.length); i++) {
				result = get(onStop, i, result);
				if (doStop || (done && done(result))) {
					doFrom = arr.length;
					break;
				}
			}
			doFrom += doLen;
			if (doFrom >= arr.length) {
				finish({result, success: !doStop});
				return;
			}
			doLen = (Date.now() - startTime < 34) ? (doLen << 1) : Math.max(doLen >> 1, 1);
			setTimeout(forEach, 0);
		};

		forEach();
	});
}

function prlEnum(prl, arr, more, from, done, def, init, exec, get) {
	return new Promise(function (finish) {
		if (!arr || !arr.length || !more) {
			finish({result: def, success: true});
			return;
		}

		var doFrom = (from > -1) ? from : arr.length + from;
		var doLen = prl || 4;
		var doStop = false;
		var onStop = function () {
			doStop = true;
		};
		var result = init;
		var push = function (i, a) {
			a.push(new Promise(resolve => exec(resolve, onStop, i, result)));
		};
		var startTime = Date.now();

		var forEach = function () {
			var promises = [];
			for (var i = doFrom; i < Math.min(doFrom + doLen, arr.length); i++) {
				push(i, promises);
			}
			Promise.all(promises).then(results => {
				for (var i = 0; i < results.length; i++) {
					result = get(results[i], doFrom + i, result);
					if (doStop || (done && done(result))) {
						doFrom = arr.length;
						break;
					}
				}
				doFrom += doLen;
				if (doFrom >= arr.length) {
					finish({result, success: !doStop});
					return;
				}
				if (Date.now() - startTime < 34) {
					forEach();
				} else {
					setTimeout(forEach, 0);
					startTime = Date.now();
				}
			});
		};

		forEach();
	});
}

export function asyncEvery(arr, more) {
	return asyncEnum(arr, more,  0, r => !r, true, true,
		(s, i) => !!more(arr[i], i, arr, s));
}

export function asyncFilter(arr, more) {
	return asyncEnum(arr, more, 0, null, [], [],
		(s, i, r) => {
			var x = arr[i];
			more(x, i, arr, s) && r.push(x);
			return r;
		});
}

export function asyncFind(arr, more) {
	return asyncEnum(arr, more, 0, r => r !== undefined, undefined, undefined,
		(s, i, r) => more(arr[i], i, arr, s) ? arr[i] : r);
}

export function asyncFindIndex(arr, more, fromIndex) {
	return asyncEnum(arr, more, fromIndex || 0, r => r > -1, -1, -1,
		(s, i, r) => more(arr[i], i, arr, s) ? i : r);
}

export function asyncForEach(arr, more) {
	return asyncEnum(arr, more, 0, null, arr, arr,
		(s, i, r) => {
			more(arr[i], i, arr, s);
			return r;
		});
}

export function asyncIndexOf(arr, value, fromIndex) {
	return asyncEnum(arr, true, fromIndex || 0, r => r > -1, -1, -1,
		(s, i, r) => arr[i] === value ? i : r);
}

export function asyncLastIndexOf(arr, value, fromIndex) {
	var arrLen = arr && arr.length || 0;
	return asyncEnum(arr, true, -fromIndex || 0, r => r > -1, -1, -1,
		(s, i, r) => {
			var index = arrLen - i - 1;
			return arr[index] === value ? index : r;
		});
}

export function asyncMap(arr, more) {
	return asyncEnum(arr, more, arr, 0, null, new Array(arr.length),
		(s, i, r) => {
			r[i] = more(arr[i], i, arr, s);
			return r;
		});
}

export function asyncReduce(arr, more, init) {
	var defInit = arr.length && (arguments.length < 3);
	return asyncEnum(arr, more, defInit ? 1 : 0, null, undefined, defInit ? arr[0] : init,
		(s, i, r) => more(r, arr[i], i, arr, s));
}

export function asyncReduceRight(arr, more, init) {
	var arrLen = arr && arr.length || 0;
	var defInit = arrLen && (arguments.length < 3);
	return asyncEnum(arr, more, defInit ? 1 : 0, null, undefined, defInit ? arr[0] : init,
		(s, i, r) => {
			var index = arrLen - i - 1;
			return more(r, arr[index], index, arr, s);
		});
}

export function asyncSome(arr, more) {
	return asyncEnum(arr, more, 0, r => r, false, false,
		(s, i) => !!more(arr[i], i, arr, s));
}

export function prlEvery(prl, arr, more) {
	return prlEnum(prl, arr, more, 0, r => !r, true, true,
		(done, s, i) => more(done, arr[i], i, arr, s), x => !!x);
}

export function prlFilter(prl, arr, more) {
	return prlEnum(prl, arr, more, 0, null, [], [],
		(done, s, i) => more(done, arr[i], i, arr, s), (x, i, r) => {
			x && r.push(arr[i]);
			return r;
		});
}

export function prlFind(prl, arr, more) {
	return prlEnum(prl, arr, more, 0, r => r !== undefined, undefined, undefined,
		(done, s, i) => more(done, arr[i], i, arr, s), (x, i, r) => x ? arr[i] : r);
}

export function prlFindIndex(prl, arr, more, fromIndex) {
	return prlEnum(prl, arr, more, fromIndex || 0, r => r > -1, -1, -1,
		(done, s, i) => more(done, arr[i], i, arr, s), (x, i, r) => x ? i : r);
}

export function prlForEach(prl, arr, more) {
	return prlEnum(prl, arr, more, 0, null, arr, arr,
		(done, s, i) => more(done, arr[i], i, arr, s), () => arr);
}

export function prlMap(prl, arr, more) {
	return prlEnum(prl, arr, more, 0, null, arr, new Array(arr.length),
		(done, s, i) => more(done, arr[i], i, arr, s), (x, i, r) => {
			r[i] = x;
			return r;
		});
}

export function prlReduce(prl, arr, more, init) {
	var defInit = arr.length && (arguments.length < 3);
	return prlEnum(prl, arr, more, defInit ? 1 : 0, null, undefined, defInit ? arr[0] : init,
		(done, s, i, r) => more(done, r, arr[i], i, arr, s), (x, i, r) => r);
}

export function prlReduceRight(prl, arr, more, init) {
	var arrLen = arr && arr.length || 0;
	var defInit = arrLen && (arguments.length < 3);
	return prlEnum(prl, arr, more, defInit ? 1 : 0, null, undefined, defInit ? arr[0] : init,
		(done, s, i, r) => {
			var index = arrLen - i - 1;
			more(done, r, arr[index], index, arr, s);
		}, (x, i, r) => r);
}

export function prlSome(prl, arr, more) {
	return prlEnum(prl, arr, more, 0, r => r, false, false,
		(done, s, i) => more(done, arr[i], i, arr, s), x => !!x);
}