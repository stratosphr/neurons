export default class Arrays {

    public static nCopies<T>(n: number, callback: () => T): T[] {
        return [...Array(n)].map(callback)
    }

}
