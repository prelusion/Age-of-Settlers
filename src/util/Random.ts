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
}
