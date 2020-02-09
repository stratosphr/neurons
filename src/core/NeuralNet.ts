import ActivationFunctions  from '@/core/ActivationFunctions'
import Letters              from '@/data/Letters'
import Arrays               from '@/utilities/Arrays'
import 'mathjs'
import { matrix, multiply } from 'mathjs'

export default class NeuralNet {
    private readonly inputs: number
    private readonly layers: number[]
    private outputs: number
    private readonly activation: (x: number, l?: number) => number
    private weights: number[][][]
    private layersOutputs: number[][]

    public static main(): void {
        const inputs = 5 * 8
        const outputs = 26
        const layers = [16, 10]
        const net = new NeuralNet(inputs, layers, outputs)
        const output = net.input(Letters.a)
        console.log(output)
    }

    constructor(inputs: number, layers: number[], outputs: number, activation = ActivationFunctions.RECTIFIER) {
        this.activation = activation
        this.inputs = inputs
        this.layers = layers
        this.outputs = outputs
        // [16 [40]] [10 [16]] [26 [10]]
        this.weights = [...layers, outputs].map((count, index) => Arrays.nCopies(count, () => Arrays.nCopies([inputs, ...layers, outputs][index], () => +Math.random().toFixed(2))))
        this.layersOutputs = [...layers, outputs].map(layer => Array(layer))
        console.log(this.layersOutputs)
    }

    public input(inputs: number[]): number[] {
        this.weights.forEach((weight, index) => {
            this.layersOutputs[index] = multiply(matrix(weight), [inputs, ...this.layersOutputs][index]).map(this.activation).toArray() as number[]
        })
        return this.layersOutputs[this.layersOutputs.length - 1]
    }

}
