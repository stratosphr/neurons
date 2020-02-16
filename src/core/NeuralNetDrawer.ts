import NeuralNet from '@/core/NeuralNet'
import Arrays    from '@/utilities/Arrays'
import cytoscape from 'cytoscape'

export enum Direction {
    HORIZONTAL,
    VERTICAL
}

export default class NeuralNetDrawer {

    public static draw(container: HTMLElement, net: NeuralNet, inputs: number[], layersOutputs: number[][], weights: number[][][], direction: Direction = Direction.HORIZONTAL): void {
        const max = Math.max(...[net.inputs, ...net.layers, net.outputs])
        const nodes = [net.inputs, ...net.layers, net.outputs].map((n, row) => {
            return Arrays.nCopies(n, col => {
                const gridCol = Math.ceil(max / n / 2 + col * max / n)
                const output = [inputs, ...layersOutputs, net.input(inputs)][row][col]
                return {data: {id: `${col}-${row}`, output: output, col: direction === Direction.VERTICAL ? gridCol : row, row: direction === Direction.VERTICAL ? row : gridCol}}
            })
        }).flat()
        const edges = weights.map((weights, row) =>
            weights.map((weights, targetCol) =>
                weights.map((weight, sourceCol) => {
                    return {data: {weight: weight, source: `${sourceCol}-${row}`, target: `${targetCol}-${row + 1}`}}
                }).flat()
            ).flat()
        ).flat()
        console.log(weights.length)
        console.log(max)
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        cytoscape({
            container,
            layout: {
                name: 'grid',
                ...(direction === Direction.VERTICAL ? {
                    cols: max
                } : {
                    rows: max
                }),
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
                        'font-weight': 'bold',
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
                        'curve-style': 'straight',
                        'target-arrow-shape': 'triangle',
                        'arrow-scale': 1,
                        'line-color': '#9CF',
                        'target-arrow-color': '#9CF',
                        'text-background-opacity': 1,
                        'color': '#000',
                        'text-background-color': '#9CF',
                        'font-weight': 'bold',
                        'text-background-shape': 'roundrectangle',
                        'text-border-color': '#000',
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

}
