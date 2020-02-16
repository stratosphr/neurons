export default class Arrays {

    public static nCopies<T>(n: number, callback: (index: number) => T): T[] {
        return [...Array(n)].map((el, index) => callback(index))
    }

}
