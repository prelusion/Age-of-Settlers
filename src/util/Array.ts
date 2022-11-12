/**
 * Set a value inside a nested array
 *
 * @example
 *
 * let a = [];
 * nestedArraySet(a, [1, 2, 5], 3);
 * // Result: [ _, [ _, _, [ _, _, _, _, _, 3 ] ] ]  (where _ is an '<empty slot>')
 * // This is equivalent to:
 * a[1] = [];
 * a[1][2] = [];
 * a[1][2][7] = 3;
 *
 * @param array The array
 * @param indices A list of index values to use / create for each layer
 * @param value The value to assign
 */
export function nestedArraySet(array: any[], indices: number[], value: any): void {
    for (let i = 0; i < indices.length; i++) {
        let isLast = (i === indices.length - 1)

        if (isLast) {
            array[indices[i]] = value;
        } else {
            array = array[indices[i]] ??= [];
        }
    }
}
