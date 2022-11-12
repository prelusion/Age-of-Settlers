/**
 * General global functions that do not fit in a category (yet)
 */

/**
 * Log and continue like this function doesn't exist.
 * Useful to add in between, so you don't have to create a temporary variable just to log something.
 *
 * ```
 * return this.something();       // Before
 * return log(this.something());  // After
 * ```
 *
 * @param v
 */
export function log<T>(v: T): T {
    console.log(v);
    return v;
}

