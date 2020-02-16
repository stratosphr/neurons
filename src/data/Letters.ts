import Arrays from '@/utilities/Arrays'

export default {
    a: {
        input: [
            0, 0, 1, 1, 0,
            0, 1, 0, 0, 1,
            0, 1, 1, 1, 1,
            0, 1, 0, 0, 1,
            0, 1, 0, 0, 1
        ],
        output: [1, ...Arrays.nCopies(25, () => 0)]
    },
    b: {
        input: [
            0, 1, 1, 1, 0,
            0, 1, 0, 0, 1,
            0, 1, 1, 1, 0,
            0, 1, 0, 0, 1,
            0, 1, 1, 1, 0
        ],
        output: [0, 1, ...Arrays.nCopies(24, () => 0)]
    },
    c: {
        input: [
            0, 0, 1, 1, 1,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 1, 1
        ],
        output: [0, 0, 1, ...Arrays.nCopies(23, () => 0)]
    },
    m: {
        input: [
            1, 0, 0, 0, 1,
            1, 1, 0, 1, 1,
            1, 0, 1, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ],
        output: [...Arrays.nCopies(12, () => 0), 1, ...Arrays.nCopies(13, () => 0)]
    }
}
