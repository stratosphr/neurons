export default {
    SIGMOID: (x: number, l?: number) => +(1 / (1 + Math.exp(-x * (l ?? 1)))).toFixed(2),
    RECTIFIER: (x: number) => +Math.max(0, x).toFixed(2),
    SOFTPLUS: (x: number) => +Math.log(x).toFixed(2)
}
