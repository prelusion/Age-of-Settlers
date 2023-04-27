/**
 *
 * @param msg
 */
export function dd(msg: any) {
    console.log(msg);
    throw new Error(msg);
}
