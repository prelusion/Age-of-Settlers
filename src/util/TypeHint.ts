export type valueOf<T> = T[keyof T];

/**
 * Obj is a wrapper for Object functions with proper type hinting
 */
export class Obj {
    /**
     * Wrapper for Object.keys() that does keep track of record key type
     *
     * @param r The record to get the keys from
     * @private
     */
    public static keys<T extends Record<any, any>>(r: T): Array<keyof T> {
        return Object.keys(r);
    }

    /**
     * Wrapper for Object.values() that does keep track of record value type
     *
     * @param r The record to get the value from
     * @private
     */
    public static values<T extends Record<any, any>>(r: T): Array<valueOf<T>> {
        return Object.values(r);
    }
}

/**
 * Ensure that the parameter exists. Mostly useful in combination with 'Array.find()' which can return undefined.
 *
 * @param argument The argument which is ensured to not be undefined or null
 * @param message The message to use in the error throw when the argument is undefined or null
 *
 * @author Karol Majewski @ https://stackoverflow.com/a/54738437/7230293
 */
export function ensure<T>(argument: T | undefined | null, message = "This value was promised to be there."): T {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }

    return argument;
}

/**
 * Assert the parameter given to not be undefined or null. Works in the same way `ensure` does except no
 * value is returned. This is useful for already existing values that might also be 'null' or 'undefined'.
 *
 * @param value The value which is asserted to not be undefined or null
 *
 * @author Aleksey L. @ https://stackoverflow.com/a/59017341/7230293
 */
export function assert(value: unknown): asserts value {
    if (value === undefined || value === null) {
        throw new TypeError("value must be defined");
    }
}
