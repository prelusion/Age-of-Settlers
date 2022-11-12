export class Random {
    /**
     * Get a random number with a max of n
     *
     * @param n
     */
    public static number(n: number = 999_999_999): number {
        return Math.round(Math.random() * n);
    }

    /**
     * Get a random number between min and max
     *
     * @param min
     * @param max
     */
    public static numberLH(min: number, max: number): number {
        return Random.number(max - min) + min;
    }

    /**
     *
     * @param chance
     */
    public static chance(chance: number): boolean {
        return Math.random() < chance;
    }

    /**
     *
     * @param arr
     */
    public static arrayValueAsString(arr: any): string {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * Shuffle the given array in-place
     *
     * @author Laurens Holst @ https://stackoverflow.com/a/12646864/7230293
     *
     * @param array
     */
    public static shuffle<T>(array: T[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /**
     * Copy an array and shuffle it
     *
     * @author Ben Carp @ https://stackoverflow.com/a/46161940/7230293
     *
     * @param array
     */
    public static shuffledCopy<T>(array: T[]): T[] {
        const newArr = array.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    }
}
