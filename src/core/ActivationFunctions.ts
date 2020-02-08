export default {
    SIGMOID: (x: number, l?: number) => 1 / (1 + Math.exp(-x * (l ?? 1)))
}
