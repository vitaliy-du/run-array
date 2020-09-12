declare namespace DaddyArray {
    /**
     * Asynchronously performs the specified action for each element in an array.
     * The length of chunk to process is calculated automatically to avoid slowing down the GUI.
     *
     * @param arr Array;
     * @param more
     *   A callback function that called one time for each element in the array.
     *   If return *true* enumeration will continue, overwise cancelled.
     *
     * @returns Promise resolves *true* after successful enumeration, overwise *false*.
     */
    function asyncForEach<T = any>(arr: T[], more: (x: T, i: number, arr: T[]) => boolean): Promise<boolean>;
}

export = DaddyArray;
export as namespace DaddyArray;