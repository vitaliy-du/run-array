function asyncEnum(arr, more, resolve, defResult, initResult, enumFrom, getBreak, getResult) {
	if (!arr || !arr.length || !more) {
		resolve({result: defResult, success: true});
		return;
	}

	var doFrom = (enumFrom > -1) ? enumFrom : arr.length + enumFrom;
	var doLen = 1;
	var doStop = false;
	var result = initResult;
	var stop = function () {
		doStop = true;
	};
	var forEach = function () {
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
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, true, true, 0, r => !r, (s, i) => !!more(arr[i], i, arr, s));
	});
}

export function asyncFilter(arr, more) {
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, [], [], 0, null, (s, i, r) => {
			var x = arr[i];
			if (more(x, i, arr, s)) r.push(x);
			return r;
		});
	});
}

export function asyncFind(arr, more) {
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, undefined, undefined, 0, r => r !== undefined,
			(s, i, r) => more(arr[i], i, arr, s) ? arr[i] : r);
	});
}

export function asyncFindIndex(arr, more, fromIndex) {
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, -1, -1, fromIndex || 0, r => r > -1,
			(s, i, r) => more(arr[i], i, arr, s) ? i : r);
	});
}

export function asyncForEach(arr, more) {
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, arr, arr, 0, null, (s, i, r) => {
			more(arr[i], i, arr, s);
			return r;
		});
	});
}

export function asyncIndexOf(arr, value, fromIndex) {
	return new Promise(function (resolve) {
		asyncEnum(arr, true, resolve, -1, -1, fromIndex || 0, r => r > -1, (s, i, r) => arr[i] === value ? i : r);
	});
}

export function asyncLastIndexOf(arr, value, fromIndex) {
	var arrLen = arr && arr.length || 0;
	return new Promise(function (resolve) {
		asyncEnum(arr, true, resolve, -1, -1, -fromIndex || 0, r => r > -1, (s, i, r) => {
			var index = arrLen - i - 1;
			return arr[index] === value ? index : r;
		});
	});
}

export function asyncMap(arr, more) {
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, arr, new Array(arr.length), 0, null, (s, i, r) => {
			r[i] = more(arr[i], i, arr, s);
			return r;
		});
	});
}

export function asyncReduce(arr, more, init) {
	var defInit = arr.length && (arguments.length < 3);
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, undefined, defInit ? arr[0] : init, defInit ? 1 : 0, null, (s, i, r) => {
			r = more(r, arr[i], i, arr, s);
			return r;
		});
	});
}

export function asyncReduceRight(arr, more, init) {
	var arrLen = arr && arr.length || 0;
	var defInit = arrLen && (arguments.length < 3);
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, undefined, defInit ? arr[0] : init, defInit ? 1 : 0, null, (s, i, r) => {
			var index = arrLen - i - 1;
			r = more(r, arr[index], index, arr, s);
			return r;
		});
	});
}

export function asyncSome(arr, more) {
	return new Promise(function (resolve) {
		asyncEnum(arr, more, resolve, false, false, 0, r => r, (s, i) => !!more(arr[i], i, arr, s));
	});
}