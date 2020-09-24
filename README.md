SysArray
===========

[![npm version][npm-image]][npm-url] [![license][license-image]][license-url] [![downloads][downloads-image]][downloads-url]

Really promising asynchronous and parallel work with large arrays without slowing down the GUI.
The length of chunk to process automatically calculated to avoid slowing down the GUI.

Install with [npm](https://www.npmjs.com/):

npm:
```sh
npm install sys-array --save
```

## How to use

```tsx
import * as SysArray from "sys-array";

const arr = [];
for (let i = 0; i < 0xFFFF; i++) arr.push(i + 1);
SysArray.asyncForEach(arr, (x, i, a, stop) => {
    // SOME ACTION WITH ARRAY ELEMENT X
    // call stop() to stop
}).then(x => console.log('asyncForEach', x.success));
SysArray.asyncEvery(arr, x => !!x).then(x => console.log('asyncEvery', x.result));
SysArray.asyncSome(arr, x => x == -1).then(x => console.log('asyncSome', x.result));
SysArray.asyncFind(arr, x => x == -1).then(x => console.log('asyncFind', x.result));
SysArray.asyncFind(arr, x => x == 10).then(x => console.log('asyncFind', x.result));
SysArray.asyncFindIndex(arr, x => x == 10).then(x => console.log('asyncFindIndex', x.result));
SysArray.asyncIndexOf(arr, 10).then(x => console.log('asyncIndexOf', x.result));
SysArray.asyncLastIndexOf(arr, 10).then(x => console.log('asyncLastIndexOf', x.result));
SysArray.asyncReduce(arr, r => ++r.count && r, {count: 0}).then(x => console.log('asyncReduce', x.result));
SysArray.asyncReduceRight(arr, r => ++r.count && r, {count: 0}).then(x => console.log('asyncReduceRight', x.result));

SysArray.prlForEach(4, arr, (done, x, i, a, stop) => {
    // SOME ACTION WITH ARRAY ELEMENT X
    // call stop() to stop
    done();
}).then(x => console.log('prlForEach', x.success));
SysArray.prlEvery(4, arr, (done, x) => done(!!x)).then(x => console.log('prlEvery', x.result));
SysArray.prlSome(4, arr, (done, x) => done(x == -1)).then(x => console.log('prlSome', x.result));
SysArray.prlFind(4, arr, (done, x) => done(x == -1)).then(x => console.log('prlFind', x.result));
SysArray.prlFind(4, arr, (done, x) => done(x == 10)).then(x => console.log('prlFind', x.result));
SysArray.prlFindIndex(4, arr, (done, x) => done(x == 10), 0).then(x => console.log('prlFindIndex', x.result));
SysArray.prlReduce(4, arr, (done, r) => done(++r.count && r), {count: 0}).then(x => console.log('prlReduce', x.result));
SysArray.prlReduceRight(4, arr, (done, r) => done(++r.count && r), {count: 0}).then(x => console.log('prlReduceRight', x.result));
```

## Doc

```ts
/**
 * Asynchronously determines whether all the members of an array satisfy the specified test.
 * The length of chunk to process automatically calculated to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array until returns a value which is coercible to the Boolean
 * value false, or until the end of the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
function asyncEvery<T = any>(arr: T[], more: (x: T, i: number, arr: T[],
    stop: () => void) => boolean): Promise<Result<boolean>>;

/**
 * Asynchronously returns the elements of an array that meet the condition specified in a *more* function.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more The filter function. Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
function asyncFilter<T = any>(arr: T[], more: (x: T, i: number, arr: T[],
    stop: () => void) => boolean): Promise<Result<T[]>>;

/**
 * Asynchronously returns the value of the first element in the array where predicate is true, and undefined
 * otherwise. The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more The predicate method. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find
 * returns undefined. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 *
 * @returns Promise resolves *{result: value of found element, success: true or false if stop enumeration}*.
 */
function asyncFind<T = any>(arr: T[], more: (x: T, i: number, arr: T[],
    stop: () => void) => boolean): Promise<Result<T>>;

/**
 * Asynchronously returns the index of the first element in the array where predicate is true, and -1 otherwise.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more The predicate method. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element index. Otherwise, find
 * returns -1. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 *
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
function asyncFindIndex<T = any>(arr: T[], more: (x: T, i: number, arr: T[],
    stop: () => void) => boolean, fromIndex?: number): Promise<Result<number>>;

/**
 * Asynchronously performs the specified *more* action for each element in an array.
 * The length of chunk to process automatically calculated to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: arr, success: true or false if stop enumeration}*.
 */
function asyncForEach<T = any>(arr: T[], more: (x: T, i: number, arr: T[],
    stop: () => void) => void): Promise<Result<T[]>>;

/**
 * Asynchronously returns the index of the first occurrence of a value in an array. The length of chunk to process
 * calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param value The value to locate in the array.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 *
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
function asyncIndexOf<T = any>(arr: T[], value: T, fromIndex?: number): Promise<Result<number>>;

/**
 * Asynchronously returns the index of the first occurrence of a value in an array. The length of chunk to process
 * calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param value The value to locate in the array.
 * @param fromIndex The array index at which to begin the search. By default the search starts at the last index in
 * the array.
 *
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
function asyncLastIndexOf<T = any>(arr: T[], value: T, fromIndex?: number): Promise<Result<number>>;

/**
 * Asynchronously calls the specified *more* function on each element of an array, and returns an array that
 * contains the results. The length of chunk to process automatically calculated to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
function asyncMap<T = any, R = any>(arr: T[], more: (x: T, i: number, arr: T[],
    stop: () => void) => R): Promise<Result<R[]>>;

/**
 * Asynchronously calls the specified *more* function for all the elements in an array.
 * The return value of the *more* function is the accumulated result, and is provided as an argument in the next
 * call to the *more* function. The length of chunk to process automatically calculated to avoid slowing down
 * the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *more* function provides this value as an argument instead of an first array value.
 *
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
function asyncReduce<T = any, R = any>(arr: T[], more: (r: R, x: T, i: number, arr: T[],
    stop: () => void) => void, init: R): Promise<Result<R>>;

/**
 * Asynchronously calls the specified *more* function for all the elements in an array, in descending order.
 * The return value of the *more* function is the accumulated result, and is provided as an argument in the next
 * call to the *more* function. The length of chunk to process automatically calculated to avoid slowing down
 * the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *more* function provides this value as an argument instead of an first array value.
 *
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
function asyncReduceRight<T = any, R = any>(arr: T[], more: (r: R, x: T, i: number, arr: T[],
    stop: () => void) => void, init: R): Promise<Result<R>>;

/**
 * Asynchronously determines whether the specified *more* function returns true for any element of an array.
 * The length of chunk to process automatically calculated to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array until returns a value which is coercible to the Boolean
 * value true, or until the end of the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
function asyncSome<T = any>(arr: T[], more: (x: T, i: number, arr: T[],
    stop: () => void) => boolean): Promise<Result<boolean>>;

/**
 * Async-parallel determines whether all the members of an array satisfy the specified test.
 * The length of chunk to process automatically calculated to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more Promise that called one time for each element in the array until returns a value which is coercible
 * to the Boolean value false, or until the end of the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
function prlEvery<T = any>(prl: number, arr: T[], more: (done: (result: boolean) => void, x: T, i: number,
    arr: T[], stop: () => void) => void): Promise<Result<boolean>>;

/**
 * Async-parallel returns the elements of an array that meet the condition specified in a *more* promise.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more The filter promise. Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
function prlFilter<T = any>(prl: number, arr: T[], more: (done: (result: boolean) => void, x: T, i: number,
    arr: T[], stop: () => void) => void): Promise<Result<T[]>>;

/**
 * Async-parallel returns the value of the first element in the array where predicate is true, and undefined
 * otherwise. The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more The predicate promise. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find
 * returns undefined. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 *
 * @returns Promise resolves *{result: value of found element, success: true or false if stop enumeration}*.
 */
function prlFind<T = any>(prl: number, arr: T[], more: (done: (result: boolean) => void, x: T, i: number,
    arr: T[], stop: () => void) => void): Promise<Result<T>>;

/**
 * Async-parallel returns the index of the first element in the array where predicate is true, and -1 otherwise.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more The predicate method. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element index. Otherwise, find
 * returns -1. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 *
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
function prlFindIndex<T = any>(prl: number, arr: T[], more: (done: (result: boolean) => void, x: T, i: number,
    arr: T[], stop: () => void) => void, fromIndex?: number): Promise<Result<number>>;

/**
 * Async-parallel performs the specified *more* action for each element in an array.
 * The length of chunk to process automatically calculated to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: arr, success: true or false if stop enumeration}*.
 */
function prlForEach<T = any>(prl: number, arr: T[], more: (done: () => void, x: T, i: number,
    arr: T[], stop: () => void) => void): Promise<Result<T[]>>;

/**
 * Async-parallel calls the specified *more* function on each element of an array, and returns an array that
 * contains the results. The length of chunk to process automatically calculated to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
function prlMap<T = any, R = any>(prl: number, arr: T[], more: (done: (result: R) => void, x: T, i: number,
    arr: T[], stop: () => void) => void): Promise<Result<R[]>>;

/**
 * Async-parallel calls the specified *more* function for all the elements in an array.
 * The return value of the *more* function is the accumulated result, and is provided as an argument in the next
 * call to the *more* function. The length of chunk to process automatically calculated to avoid slowing down
 * the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *more* function provides this value as an argument instead of an first array value.
 *
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
function prlReduce<T = any, R = any>(prl: number, arr: T[], more: (done: (result: R) => void, r: R,
    x: T, i: number, arr: T[], stop: () => void) => void, init: R): Promise<Result<R>>;

/**
 * Async-parallel calls the specified *more* function for all the elements in an array, in descending order.
 * The return value of the *more* function is the accumulated result, and is provided as an argument in the next
 * call to the *more* function. The length of chunk to process automatically calculated to avoid slowing down
 * the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *more* function provides this value as an argument instead of an first array value.
 *
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
function prlReduceRight<T = any, R = any>(prl: number, arr: T[], more: (done: (result: R) => void, r: R,
    x: T, i: number, arr: T[], stop: () => void) => void, init: R): Promise<Result<R>>;

/**
 * Async-parallel determines whether the specified *more* function returns true for any element of an array.
 * The length of chunk to process automatically calculated to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param more Called one time for each element in the array until returns a value which is coercible to the Boolean
 * value true, or until the end of the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
function prlSome<T = any>(prl: number, arr: T[], more: (done: (result: boolean) => void, x: T, i: number,
    arr: T[], stop: () => void) => void): Promise<Result<boolean>>;
```

## License

[MIT](LICENSE). Copyright (c) 2020 Vitaliy Dyukar.

[npm-image]: https://img.shields.io/npm/v/sys-array.svg?style=flat-square
[npm-url]: https://npmjs.org/package/sys-array
[license-image]: https://img.shields.io/npm/l/sys-array.svg?style=flat-square
[license-url]: https://npmjs.org/package/sys-array
[downloads-image]: http://img.shields.io/npm/dm/sys-array.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/sys-array