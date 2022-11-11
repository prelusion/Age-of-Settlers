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
     * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * @param array
     */
    public static shuffle(array: any) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}
