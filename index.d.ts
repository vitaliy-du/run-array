export type ArrayResult<T> = {
	result: T;
	success: boolean;
}

/**
 * Asynchronously determines whether all the members of an array satisfy the specified test.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param next Called one time for each element in the array until returns a value which is coercible to the
 * Boolean value false, or until the end of the array. To stop enumeration call *stop*.
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
export const asyncEvery: <T = any>(arr: T[], next: (x: T, i: number, arr: T[],
	stop: () => void) => boolean) => Promise<ArrayResult<boolean>>;

/**
 * Asynchronously returns the elements of an array that meet the condition specified in a *next* function.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param next The filter function. Called one time for each element in the array.
 * To stop enumeration call *stop*.
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
export const asyncFilter: <T = any>(arr: T[], next: (x: T, i: number, arr: T[],
	stop: () => void) => boolean) => Promise<ArrayResult<T[]>>;

/**
 * Asynchronously returns the value of the first element in the array where predicate is true, and undefined
 * otherwise. The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param next The predicate method. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element value. Otherwise,
 * find returns undefined. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 * @returns Promise resolves *{result: value of found element, success: true or false if stop enumeration}*.
 */
export const asyncFind: <T = any>(arr: T[], next: (x: T, i: number, arr: T[],
	stop: () => void) => boolean) => Promise<ArrayResult<T>>;

/**
 * Asynchronously returns the index of the first element in the array where predicate is true, and -1 otherwise.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param next The predicate method. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element index. Otherwise,
 * find returns -1. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
export const asyncFindIndex: <T = any>(arr: T[], next: (x: T, i: number, arr: T[],
	stop: () => void) => boolean, fromIndex?: number) => Promise<ArrayResult<number>>;

/**
 * Asynchronously performs the specified *next* action for each element in an array.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param next Called one time for each element in the array. To stop enumeration call *stop*.
 * @returns Promise resolves *{result: arr, success: true or false if stop enumeration}*.
 */
export const asyncForEach: <T = any>(arr: T[], next: (x: T, i: number, arr: T[],
	stop: () => void) => void) => Promise<ArrayResult<T[]>>;

/**
 * Asynchronously returns the index of the first occurrence of a value in an array. The length of chunk to
 * process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param value The value to locate in the array.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
export const asyncIndexBy: <T = any>(arr: T[], value: T, fromIndex?: number) => Promise<ArrayResult<number>>;

/**
 * Asynchronously returns the index of the first occurrence of a value in an array. The length of chunk to
 * process calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param value The value to locate in the array.
 * @param fromIndex The array index at which to begin the search. By default the search starts at the last index
 * in the array.
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
export const asyncLastIndexBy: <T = any>(arr: T[], value: T, fromIndex?: number) => Promise<ArrayResult<number>>;

/**
 * Asynchronously calls the specified *next* function on each element of an array, and returns an array that
 * contains the results. The length of chunk to process is calculated automatically to avoid slowing down the
 * GUI.
 *
 * @param arr Array.
 * @param next Called one time for each element in the array. To stop enumeration call *stop*.
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
export const asyncMap: <T = any, R = any>(arr: T[], next: (x: T, i: number, arr: T[],
	stop: () => void) => R) => Promise<ArrayResult<R[]>>;

/**
 * Asynchronously calls the specified *next* function for all the elements in an array.
 * The return value of the *next* function is the accumulated result, and is provided as an argument in the next
 * call to the *next* function. The length of chunk to process is calculated automatically to avoid slowing down
 * the GUI.
 *
 * @param arr Array.
 * @param next Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *next* function provides this value as an argument instead of an first array value.
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
export const asyncReduce: <T = any, R = any>(arr: T[], next: (r: R, x: T, i: number, arr: T[],
	stop: () => void) => void, init: R) => Promise<ArrayResult<R>>;

/**
 * Asynchronously calls the specified *next* function for all the elements in an array, in descending order.
 * The return value of the *next* function is the accumulated result, and is provided as an argument in the next
 * call to the *next* function. The length of chunk to process is calculated automatically to avoid slowing down
 * the GUI.
 *
 * @param arr Array.
 * @param next Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *next* function provides this value as an argument instead of an first array value.
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
export const asyncReduceRight: <T = any, R = any>(arr: T[], next: (r: R, x: T, i: number, arr: T[],
	stop: () => void) => void, init: R) => Promise<ArrayResult<R>>;

/**
 * Asynchronously determines whether the specified *next* function returns true for any element of an array.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param arr Array.
 * @param next Called one time for each element in the array until returns a value which is coercible to the
 * Boolean value true, or until the end of the array. To stop enumeration call *stop*.
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
export const asyncSome: <T = any>(arr: T[], next: (x: T, i: number, arr: T[],
	stop: () => void) => boolean) => Promise<ArrayResult<boolean>>;

/**
 * Async-parallel determines whether all the members of an array satisfy the specified test.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next Promise that called one time for each element in the array until returns a value which is
 * coercible to the Boolean value false, or until the end of the array. To stop enumeration call *stop*.
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
export const prlEvery: <T = any>(prl: number, arr: T[], next: (done: (result: boolean) => void, x: T, i: number,
	arr: T[], stop: () => void) => void) => Promise<ArrayResult<boolean>>;

/**
 * Async-parallel returns the elements of an array that meet the condition specified in a *next* promise.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next The filter promise. Called one time for each element in the array.
 * To stop enumeration call *stop*.
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
export const prlFilter: <T = any>(prl: number, arr: T[], next: (done: (result: boolean) => void, x: T, i: number,
	arr: T[], stop: () => void) => void) => Promise<ArrayResult<T[]>>;

/**
 * Async-parallel returns the value of the first element in the array where predicate is true, and undefined
 * otherwise. The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next The predicate promise. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element value. Otherwise,
 * find returns undefined. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 * @returns Promise resolves *{result: value of found element, success: true or false if stop enumeration}*.
 */
export const prlFind: <T = any>(prl: number, arr: T[], next: (done: (result: boolean) => void, x: T, i: number,
	arr: T[], stop: () => void) => void) => Promise<ArrayResult<T>>;

/**
 * Async-parallel returns the index of the first element in the array where predicate is true, and -1 otherwise.
 * The length of chunk to process calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next The predicate method. Called one time for each element in the array, until it finds one where
 * predicate returns true. If such an element is found, find immediately returns that element index. Otherwise,
 * find returns -1. To stop enumeration call *stop*.
 * @param fromIndex The array index at which to begin the search. By default the search starts at index 0.
 * @returns Promise resolves *{result: index of found element, success: true or false if stop enumeration}*.
 */
export const prlFindIndex: <T = any>(prl: number, arr: T[], next: (done: (result: boolean) => void, x: T, i: number,
	arr: T[], stop: () => void) => void, fromIndex?: number) => Promise<ArrayResult<number>>;

/**
 * Async-parallel performs the specified *next* action for each element in an array.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next Called one time for each element in the array. To stop enumeration call *stop*.
 * @returns Promise resolves *{result: arr, success: true or false if stop enumeration}*.
 */
export const prlForEach: <T = any>(prl: number, arr: T[], next: (done: () => void, x: T, i: number,
	arr: T[], stop: () => void) => void) => Promise<ArrayResult<T[]>>;

/**
 * Async-parallel calls the specified *next* function on each element of an array, and returns an array that
 * contains the results. The length of chunk to process is calculated automatically to avoid slowing down the
 * GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next Called one time for each element in the array. To stop enumeration call *stop*.
 * @returns Promise resolves *{result: new array, success: true or false if stop enumeration}*.
 */
export const prlMap: <T = any, R = any>(prl: number, arr: T[], next: (done: (result: R) => void, x: T, i: number,
	arr: T[], stop: () => void) => void) => Promise<ArrayResult<R[]>>;

/**
 * Async-parallel calls the specified *next* function for all the elements in an array.
 * The return value of the *next* function is the accumulated result, and is provided as an argument in the next
 * call to the *next* function. The length of chunk to process is calculated automatically to avoid slowing down
 * the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *next* function provides this value as an argument instead of an first array value.
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
export const prlReduce: <T = any, R = any>(prl: number, arr: T[], next: (done: (result: R) => void, r: R,
	x: T, i: number, arr: T[], stop: () => void) => void, init: R) => Promise<ArrayResult<R>>;

/**
 * Async-parallel calls the specified *next* function for all the elements in an array, in descending order.
 * The return value of the *next* function is the accumulated result, and is provided as an argument in the next
 * call to the *next* function. The length of chunk to process is calculated automatically to avoid slowing down
 * the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next Called one time for each element in the array. To stop enumeration call *stop*.
 * @param init If value is specified, it is used as the initial value to start the accumulation.
 * The first call to the *next* function provides this value as an argument instead of an first array value.
 * @returns Promise resolves *{result: accumulated result, success: true or false if stop enumeration}*.
 */
export const prlReduceRight: <T = any, R = any>(prl: number, arr: T[], next: (done: (result: R) => void, r: R,
	x: T, i: number, arr: T[], stop: () => void) => void, init: R) => Promise<ArrayResult<R>>;

/**
 * Async-parallel determines whether the specified *next* function returns true for any element of an array.
 * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
 *
 * @param prl Max count of parallel operations.
 * @param arr Array.
 * @param next Called one time for each element in the array until returns a value which is coercible to the
 * Boolean value true, or until the end of the array. To stop enumeration call *stop*.
 * @returns Promise resolves *{result: true or false, success: true or false if stop enumeration}*.
 */
export const prlSome: <T = any>(prl: number, arr: T[], next: (done: (result: boolean) => void, x: T, i: number,
	arr: T[], stop: () => void) => void) => Promise<ArrayResult<boolean>>;

/**
 * Extend array prototype.
 */
export const extendArrayPrototype: () => void;