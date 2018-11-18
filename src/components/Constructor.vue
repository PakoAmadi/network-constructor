<template>
    <div id='myDiagram' style='width: 400px; height: 400px; border: 1px solid black'></div>
</template>

<script>
  import go from 'gojs'

  export default {
    data () {
      return {
        diagram: null,
        diagramData: {
          nodeDataArray: [
            { key: 1, text: 'Alpha', color: 'lightblue' },
            { key: 2, text: 'Beta', color: 'orange' },
            { key: 3, text: 'Gamma', color: 'lightgreen' },
            { key: 4, text: 'Delta', color: 'pink' }
          ],
          linkDataArray: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 3, to: 4 }
          ]
        }
      }
    },
    mounted () {
      let $ = go.GraphObject.make
      let myDiagram = $(go.Diagram, 'myDiagram',
        {
          initialContentAlignment: go.Spot.Center,
          layout: $(go.TreeLayout, { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal }),
          'undoManager.isEnabled': true
        }
      )

      myDiagram.nodeTemplate =
        $(go.Node, 'Auto',
          $(go.Shape,
            {
              fill: 'white',
              strokeWidth: 0,
              portId: '',
              fromLinkable: true,
              toLinkable: true,
              cursor: 'pointer'
            },
            new go.Binding('fill', 'color')),
          $(go.TextBlock,
            { margin: 8, editable: true },
            new go.Binding('text').makeTwoWay())
        )

      myDiagram.linkTemplate =
        $(go.Link,
          { relinkableFrom: true, relinkableTo: true },
          $(go.Shape),
          $(go.Shape, { toArrow: 'OpenTriangle' })
        )

      let model = new go.GraphLinksModel(this.diagramData['nodeDataArray'], this.diagramData['linkDataArray'])
      myDiagram.model = model
      this.diagram = myDiagram
    }
  }
</script>

<style scoped>

</style>
