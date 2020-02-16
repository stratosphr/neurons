import ActivationFunctions            from '@/core/ActivationFunctions'
import NeuralNetDrawer, { Direction } from '@/core/NeuralNetDrawer'
import Letters                        from '@/data/Letters'
import Arrays                         from '@/utilities/Arrays'
import { matrix, multiply }           from 'mathjs'
import 'mathjs'

export default class NeuralNet {
    readonly inputs: number
    readonly layers: number[]
    readonly outputs: number
    private readonly activation: (x: number, l?: number) => number
    private weights: number[][][]
    private layersOutputs: number[][]

    public static main(): void {
        const inputs = 5 * 5
        const outputs = 26
        const layers: number[] = [3, 9, 9, 7, 1, 10]
        const net = new NeuralNet(inputs, layers, outputs)
        net.learn(Letters.a.input, Letters.a.output)
        NeuralNetDrawer.draw(document.getElementById('net') as HTMLElement, net, Letters.a.input, net.layersOutputs, net.weights, Direction.HORIZONTAL)
    }

    constructor(inputs: number, layers: number[], outputs: number, activation = (x: number) => ActivationFunctions.SIGMOID(x, 0.5)) {
        this.activation = activation
        this.inputs = inputs
        this.layers = layers
        this.outputs = outputs
        this.weights = [...layers, outputs].map((count, index) => Arrays.nCopies(count, () => Arrays.nCopies([inputs, ...layers, outputs][index], () => +Math.random().toFixed(2))))
        this.layersOutputs = [...layers, outputs].map(layer => Array(layer))
    }

    public learn(inputs: number[], expected: number[]): number[] {
        const outputs = this.input(inputs)
        return outputs
    }

    public input(inputs: number[]): number[] {
        this.weights.forEach((weight, index) => {
            this.layersOutputs[index] = multiply(matrix(weight), [inputs, ...this.layersOutputs][index]).map(this.activation).toArray() as number[]
        })
        return this.layersOutputs[this.layersOutputs.length - 1]
    }

    public L(): number {
        return this.layers.length + 2
    }

    public wLij(L: number, i: number, j: number): number {
        return this.weights[L - 1][i][j]
    }

}
