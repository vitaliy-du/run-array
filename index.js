function asyncEnum(arr, next, from, done, def, init, get) {
	return new Promise(function (finish) {
		if (!arr || !arr.length || !next) {
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

function prlEnum(prl, arr, next, from, done, def, init, exec, get) {
	return new Promise(function (finish) {
		if (!arr || !arr.length || !next) {
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

export function asyncEvery(arr, next) {
	return asyncEnum(arr, next,  0, r => !r, true, true,
		(s, i) => !!next(arr[i], i, arr, s));
}

export function asyncFilter(arr, next) {
	return asyncEnum(arr, next, 0, null, [], [],
		(s, i, r) => {
			var x = arr[i];
			next(x, i, arr, s) && r.push(x);
			return r;
		});
}

export function asyncFind(arr, next) {
	return asyncEnum(arr, next, 0, r => r !== undefined, undefined, undefined,
		(s, i, r) => next(arr[i], i, arr, s) ? arr[i] : r);
}

export function asyncFindIndex(arr, next, fromIndex) {
	return asyncEnum(arr, next, fromIndex || 0, r => r > -1, -1, -1,
		(s, i, r) => next(arr[i], i, arr, s) ? i : r);
}

export function asyncForEach(arr, next) {
	return asyncEnum(arr, next, 0, null, arr, arr,
		(s, i, r) => {
			next(arr[i], i, arr, s);
			return r;
		});
}

export function asyncIndexBy(arr, value, fromIndex) {
	return asyncEnum(arr, true, fromIndex || 0, r => r > -1, -1, -1,
		(s, i, r) => arr[i] === value ? i : r);
}

export function asyncLastIndexBy(arr, value, fromIndex) {
	var arrLen = arr && arr.length || 0;
	return asyncEnum(arr, true, -fromIndex || 0, r => r > -1, -1, -1,
		(s, i, r) => {
			var index = arrLen - i - 1;
			return arr[index] === value ? index : r;
		});
}

export function asyncMap(arr, next) {
	return asyncEnum(arr, next, arr, 0, null, new Array(arr.length),
		(s, i, r) => {
			r[i] = next(arr[i], i, arr, s);
			return r;
		});
}

export function asyncReduce(arr, next, init) {
	var defInit = arr.length && (arguments.length < 3);
	return asyncEnum(arr, next, defInit ? 1 : 0, null, undefined, defInit ? arr[0] : init,
		(s, i, r) => next(r, arr[i], i, arr, s));
}

export function asyncReduceRight(arr, next, init) {
	var arrLen = arr && arr.length || 0;
	var defInit = arrLen && (arguments.length < 3);
	return asyncEnum(arr, next, defInit ? 1 : 0, null, undefined, defInit ? arr[0] : init,
		(s, i, r) => {
			var index = arrLen - i - 1;
			return next(r, arr[index], index, arr, s);
		});
}

export function asyncSome(arr, next) {
	return asyncEnum(arr, next, 0, r => r, false, false,
		(s, i) => !!next(arr[i], i, arr, s));
}

export function prlEvery(prl, arr, next) {
	return prlEnum(prl, arr, next, 0, r => !r, true, true,
		(done, s, i) => next(done, arr[i], i, arr, s), x => !!x);
}

export function prlFilter(prl, arr, next) {
	return prlEnum(prl, arr, next, 0, null, [], [],
		(done, s, i) => next(done, arr[i], i, arr, s), (x, i, r) => {
			x && r.push(arr[i]);
			return r;
		});
}

export function prlFind(prl, arr, next) {
	return prlEnum(prl, arr, next, 0, r => r !== undefined, undefined, undefined,
		(done, s, i) => next(done, arr[i], i, arr, s), (x, i, r) => x ? arr[i] : r);
}

export function prlFindIndex(prl, arr, next, fromIndex) {
	return prlEnum(prl, arr, next, fromIndex || 0, r => r > -1, -1, -1,
		(done, s, i) => next(done, arr[i], i, arr, s), (x, i, r) => x ? i : r);
}

export function prlForEach(prl, arr, next) {
	return prlEnum(prl, arr, next, 0, null, arr, arr,
		(done, s, i) => next(done, arr[i], i, arr, s), () => arr);
}

export function prlMap(prl, arr, next) {
	return prlEnum(prl, arr, next, 0, null, arr, new Array(arr.length),
		(done, s, i) => next(done, arr[i], i, arr, s), (x, i, r) => {
			r[i] = x;
			return r;
		});
}

export function prlReduce(prl, arr, next, init) {
	var defInit = arr.length && (arguments.length < 3);
	return prlEnum(prl, arr, next, defInit ? 1 : 0, null, undefined, defInit ? arr[0] : init,
		(done, s, i, r) => next(done, r, arr[i], i, arr, s), (x, i, r) => r);
}

export function prlReduceRight(prl, arr, next, init) {
	var arrLen = arr && arr.length || 0;
	var defInit = arrLen && (arguments.length < 3);
	return prlEnum(prl, arr, next, defInit ? 1 : 0, null, undefined, defInit ? arr[0] : init,
		(done, s, i, r) => {
			var index = arrLen - i - 1;
			next(done, r, arr[index], index, arr, s);
		}, (x, i, r) => r);
}

export function prlSome(prl, arr, next) {
	return prlEnum(prl, arr, next, 0, r => r, false, false,
		(done, s, i) => next(done, arr[i], i, arr, s), x => !!x);
}

export function extendArrayPrototype() {
	Array.prototype.asyncEvery = function (next) { return asyncEvery(this, next); };
	Array.prototype.asyncFilter = function (next) { return asyncFilter(this, next); };
	Array.prototype.asyncFind = function (next) { return asyncFind(this, next); };
	Array.prototype.asyncFindIndex = function (next, fromIndex) { return asyncFindIndex(this, next, fromIndex); };
	Array.prototype.asyncForEach = function (next) { return asyncForEach(this, next); };
	Array.prototype.asyncIndexBy = function (value, fromIndex) { return asyncIndexBy(this, value, fromIndex); };
	Array.prototype.asyncLastIndexBy = function (value, fromIndex) { return asyncLastIndexBy(this, value, fromIndex); };
	Array.prototype.asyncMap = function (next) { return asyncMap(this, next); };
	Array.prototype.asyncReduce = function (next, init) { return asyncReduce(this, next, init); };
	Array.prototype.asyncReduceRight = function (next, init) { return asyncReduceRight(this, next, init); };
	Array.prototype.asyncSome = function (next) { return asyncSome(this, next); };
	Array.prototype.prlEvery = function (prl, next) { return prlEvery(prl, this, next); };
	Array.prototype.prlFilter = function (prl, next) { return prlFilter(prl, this, next); };
	Array.prototype.prlFind = function (prl, next) { return prlFind(prl, this, next); };
	Array.prototype.prlFindIndex = function (prl, next, fromIndex) { return prlFindIndex(prl, this, next, fromIndex); };
	Array.prototype.prlForEach = function (prl, next) { return prlForEach(prl, this, next); };
	Array.prototype.prlMap = function (prl, next) { return prlMap(prl, this, next); };
	Array.prototype.prlReduce = function (prl, next, init) { return prlReduce(prl, this, next, init); };
	Array.prototype.prlReduceRight = function (prl, next, init) { return prlReduceRight(prl, this, next, init); };
	Array.prototype.prlSome = function (prl, next) { return prlSome(prl, this, next); };
}