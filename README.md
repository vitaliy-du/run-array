DaddyArray
===========

[![Version](http://img.shields.io/npm/v/daddy-array.svg)](https://www.npmjs.org/package/daddy-array)

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
    more: (x: T, i: number, arr: T[], stop?: () => void) => void): Promise<Result<boolean>>;

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
    more: (x: T, i: number, arr: T[], stop?: () => void) => void): Promise<Result<T[]>>;

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
    more: (x: T, i: number, arr: T[], stop?: () => void) => void): Promise<Result<R>>;

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
    more: (r: R, x: T, i: number, arr: T[], stop?: () => void) => void, init: R): Promise<Result<R>>;

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
    more: (r: R, x: T, i: number, arr: T[], stop?: () => void) => void, init: R): Promise<Result<R>>;

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
    more: (x: T, i: number, arr: T[], stop?: () => void) => void): Promise<Result<boolean>>;
```

## How to use

```tsx
import {asyncForEach} from "daddy-array";

const arr = [];
for (let i = 0; i < 0xFFFF; i++) arr.push(i);
asyncForEach(arr, (x, i, a, stop) => {
    // SOME ACTION WITH ARRAY ELEMENT X
    // stop() to stop enumeration
}).then(x => console.log(x.result, x.success ? 'SUCCESS' : 'CANCELLED'));
```

## License

[MIT](LICENSE). Copyright (c) 2020 Vitaliy Dyukar.
