import ActivationFunctions from '@/core/ActivationFunctions'
import Letters             from '@/data/Letters'

export default class NeuralNet {
    private readonly inputs: number
    private readonly layers: number[]
    private readonly outputs: number
    private readonly activation: (x: number, l?: number) => number
    private readonly bias: number

    public static main(): void {
        const inputs = 5 * 8
        const outputs = 26
        const layers = [16, 16]
        const net = new NeuralNet(inputs, layers, outputs)
        net.input(Letters.a)
    }

    constructor(inputs: number, layers: number[], outputs: number, activation = ActivationFunctions.SIGMOID, bias = 0) {
        this.activation = activation
        this.bias = bias
        this.inputs = inputs
        this.layers = layers
        this.outputs = outputs
    }

    public input(a: number[]): void {
        console.log(this.activation(10, 5))
        console.log(a)
    }

}
