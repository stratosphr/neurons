import ActivationFunctions  from '@/core/ActivationFunctions'
import Letters              from '@/data/Letters'
import Arrays               from '@/utilities/Arrays'
import cytoscape            from 'cytoscape'
import { matrix, multiply } from 'mathjs'
import 'mathjs'

export default class NeuralNet {
    private readonly inputs: number
    private readonly layers: number[]
    private readonly outputs: number
    private readonly activation: (x: number, l?: number) => number
    private weights: number[][][]
    private layersOutputs: number[][]

    public static main(): void {
        const inputs = 5 * 5
        const outputs = 26
        const layers = [2, 3]
        const net = new NeuralNet(inputs, layers, outputs)
        net.learn(Letters.a.input, Letters.a.output)
        net.draw(document.getElementById('net') as HTMLElement, Letters.a.input)
    }

    constructor(inputs: number, layers: number[], outputs: number, activation = (x: number) => ActivationFunctions.SIGMOID(x, 0.5)) {
        this.activation = activation
        this.inputs = inputs
        this.layers = layers
        this.outputs = outputs
        this.weights = [...layers, outputs].map((count, index) => Arrays.nCopies(count, () => Arrays.nCopies([inputs, ...layers, outputs][index], () => +Math.random().toFixed(2))))
        this.layersOutputs = [...layers, outputs].map(layer => Array(layer))
    }

    public draw(container: HTMLElement, inputs: number[]): void {
        const max = Math.max(...[this.inputs, ...this.layers, this.outputs])
        const nodes = [this.inputs, ...this.layers, this.outputs].map((n, row) => {
            return Arrays.nCopies(n, col => {
                const gridCol = Math.ceil(max / n / 2 + col * max / n)
                const output = [inputs, ...this.layersOutputs, this.input(inputs)][row][col]
                return {data: {id: `${col}-${row}`, output: output, col: gridCol, row}}
            })
        }).flat()
        const edges = this.weights.map((weights, row) =>
            weights.map((weights, targetCol) =>
                weights.map((weight, sourceCol) => {
                    return {data: {weight: weight, source: `${sourceCol}-${row}`, target: `${targetCol}-${row + 1}`}}
                }).flat()
            ).flat()
        ).flat()
        // @ts-ignore
        cytoscape({
            container,
            layout: {
                name: 'grid',
                cols: max,
                rows: this.layers.length,
                position(node: cytoscape.NodeSingular): { row: number; col: number } {
                    return {col: node.data('col'), row: node.data('row')}
                }
            },
            style: [
                {
                    'selector': 'node',
                    'style': {
                        'text-valign': 'center',
                        'text-halign': 'center',
                        backgroundColor: '#9CF',
                        width: '45px',
                        height: '45px',
                        label: 'data(output)'
                    }
                },
                {
                    'selector': 'edge',
                    'style': {
                        width: 1,
                        'curve-style': 'unbundled-bezier',
                        'target-arrow-shape': 'triangle',
                        'arrow-scale': 1.5,
                        'line-color': '#9CF',
                        'target-arrow-color': '#9CF',
                        'text-background-opacity': 1,
                        'color': '#000',
                        'text-background-color': '#9CF',
                        'font-weight': 'bold',
                        'text-background-shape': 'roundrectangle',
                        'text-border-color': '#000',
                        'text-background-padding': '2px',
                        'text-rotation': 'autorotate',
                        label: 'data(weight)'
                    }
                }
            ],
            elements: {
                nodes,
                edges
            }
        }).fit()
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
