DaddyArray
===========

[![npm version][npm-image]][npm-url] [![license][license-image]][license-url] [![downloads][downloads-image]][downloads-url]

Really promising asynchronous and parallel work with large arrays without slowing down the GUI.

Install with [npm](https://www.npmjs.com/):

npm:
```sh
npm install daddy-array --save
```

## Doc

```ts
/**
 * Asynchronously determines whether all the members of an array satisfy the specified test.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array until returns a value which is coercible to the Boolean
 * value false, or until the end of the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
function asyncEvery<T = any>(arr: T[],
    more: (x: T, i: number, arr: T[], stop: () => void) => boolean): Promise<Result<boolean>>;

/**
 * Asynchronously returns the elements of an array that meet the condition specified in a *more* function.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more The filter function. Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
function asyncFilter<T = any>(arr: T[],
    more: (x: T, i: number, arr: T[], stop: () => void) => boolean): Promise<Result<T[]>>;

/**
 * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more The predicate method. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find
 * returns undefined. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 *
 * @returns Promise resolves *{result: value of found element, success: true or false if stop enumeration}*.
 */
function asyncFind<T = any>(arr: T[],
    more: (x: T, i: number, arr: T[], stop: () => void) => boolean): Promise<Result<T>>;

/**
 * Returns the index of the first element in the array where predicate is true, and -1 otherwise.
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
function asyncFindIndex<T = any>(arr: T[], more: (x: T, i: number, arr: T[], stop: () => void) => boolean,
    fromIndex?: number): Promise<Result<number>>;

/**
 * Asynchronously performs the specified *more* action for each element in an array.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: arr, success: true or false if stop enumeration}*.
 */
function asyncForEach<T = any>(arr: T[],
    more: (x: T, i: number, arr: T[], stop: () => void) => void): Promise<Result<T[]>>;

/**
 * Returns the index of the first occurrence of a value in an array. The length of chunk to process calculated
 * automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param value The value to locate in the array.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 *
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
function asyncIndexOf<T = any>(arr: T[], value: T, fromIndex?: number): Promise<Result<number>>;

/**
 * Returns the index of the first occurrence of a value in an array. The length of chunk to process calculated
 * automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param value The value to locate in the array.
 * @param fromIndex The array index at which to begin the search. By default the search starts at the last index in
 * the array.
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
function asyncLastIndexOf<T = any>(arr: T[], value: T, fromIndex?: number): Promise<Result<number>>;

/**
 * Asynchronously calls the specified *more* function on each element of an array, and returns an array that
 * contains the results. The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
function asyncMap<T = any, R = any>(arr: T[],
    more: (x: T, i: number, arr: T[], stop: () => void) => R): Promise<Result<R[]>>;

/**
 * Asynchronously calls the specified *more* function for all the elements in an array.
 * The return value of the *more* function is the accumulated result, and is provided as an argument in the next
 * call to the *more* function. The length of chunk to process is calculated automatically to avoid slowing down
 * the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *more* function provides this value as an argument instead of an first array value.
 *
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
function asyncReduce<T = any, R = any>(arr: T[],
    more: (r: R, x: T, i: number, arr: T[], stop: () => void) => void, init: R): Promise<Result<R>>;

/**
 * Asynchronously calls the specified *more* function for all the elements in an array, in descending order.
 * The return value of the *more* function is the accumulated result, and is provided as an argument in the next
 * call to the *more* function. The length of chunk to process is calculated automatically to avoid slowing down
 * the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *more* function provides this value as an argument instead of an first array value.
 *
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
function asyncReduceRight<T = any, R = any>(arr: T[],
    more: (r: R, x: T, i: number, arr: T[], stop: () => void) => void, init: R): Promise<Result<R>>;

/**
 * Asynchronously determines whether the specified *more* function returns true for any element of an array.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param more Called one time for each element in the array until returns a value which is coercible to the Boolean
 * value true, or until the end of the array. To stop enumeration call *stop*.
 *
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
function asyncSome<T = any>(arr: T[],
    more: (x: T, i: number, arr: T[], stop: () => void) => boolean): Promise<Result<boolean>>;
```

## How to use

```tsx
import * as Daddy from "daddy-array";

const arr = [];
for (let i = 0; i < 0xFFFF; i++) arr.push(i + 1);
Daddy.asyncForEach(arr, (x, i, a, stop) => {
    // SOME ACTION WITH ARRAY ELEMENT X
    // stop() to stop enumeration
}).then(x => console.log(x.result, x.success ? 'SUCCESS' : 'CANCELLED')).catch(e => console.error(e));
Daddy.asyncEvery(arr, x => !!x).then(x => console.log(x.result, 'asyncEvery'));
Daddy.asyncSome(arr, x => x == -1).then(x => console.log(x.result, 'asyncSome'));
Daddy.asyncFind(arr, x => x == -1).then(x => console.log(x.result, 'asyncFind'));
Daddy.asyncFind(arr, x => x == 10).then(x => console.log(x.result, 'asyncFind'));
Daddy.asyncFindIndex(arr, x => x == 10).then(x => console.log(x.result, 'asyncFindIndex'));
Daddy.asyncIndexOf(arr, 10).then(x => console.log(x.result, 'asyncIndexOf'));
Daddy.asyncLastIndexOf(arr, 10).then(x => console.log(x.result, 'asyncLastIndexOf'));
Daddy.asyncReduce(arr, r => ++r.count && r, {count: 0}).then(x => console.log(x.result, 'asyncReduce'));
Daddy.asyncReduceRight(arr, r => ++r.count && r, {count: 0}).then(x => console.log(x.result, 'asyncReduceRight'));
```

## License

[MIT](LICENSE). Copyright (c) 2020 Vitaliy Dyukar.

[npm-image]: https://img.shields.io/npm/v/daddy-array.svg?style=flat-square
[npm-url]: https://npmjs.org/package/daddy-array
[license-image]: https://img.shields.io/npm/l/daddy-array.svg?style=flat-square
[license-url]: https://npmjs.org/package/daddy-array
[downloads-image]: http://img.shields.io/npm/dm/daddy-array.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/daddy-array