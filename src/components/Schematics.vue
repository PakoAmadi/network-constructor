<template>
    <div>
        <v-toolbar dark color='indigo'>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title color=''>Network Topology Constructor</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class='hidden-sm-and-down'>
                <v-btn flat @click='getNodeTemplate'>Link One</v-btn>
                <v-btn flat @click="addAntenna">Link Two</v-btn>
                <v-btn flat>Link Three</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <div id='constructorField'></div>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import go from 'gojs'
  import AntennaIcon from '../assets/images/antenna.png'

  export default {
    data () {
      return {
        diagramData: {},
        diagram: null,
        $: null,
        pictureVisible: false,
        antennaData: {
          category: null,
          device_id: null,
          key: null,
          loc: null,
          name: null,
          title: null,
          bottomArray: [
            {portId: 1},
            {portId: 2}
          ]
        }
      }
    },
    mounted () {
      this.$ = go.GraphObject.make
      let myDiagram = this.$(go.Diagram, 'constructorField',
        {
          initialContentAlignment: go.Spot.Center,
          'undoManager.isEnabled': true,
          'grid.visible': true
        }
      )
      let antennaTmp = this.nodeTemplate('white', new go.Size(100, 150), new go.Size(8, 8), AntennaIcon)
      myDiagram.nodeTemplateMap.add('LiveAntenna', antennaTmp)
      this.diagram = myDiagram
      this.generateDiagramModel()
    },
    methods: {
      generateDiagramModel () {
        let linkDataArray = []
        let nodeDataArray = []
        let emptyDataMoodel = new go.GraphLinksModel(nodeDataArray, linkDataArray)
        emptyDataMoodel.linkFromPortIdProperty = 'fromPort'
        emptyDataMoodel.linkToPortIdProperty = 'toPort'

        this.diagram.model = emptyDataMoodel
      },
      getNodeTemplate () {
        let template = this.$(go.Part, 'Auto', {desiredSize: new go.Size(100, 150)},
          this.$(go.Shape, 'RoundedRectangle', {fill: 'white', strokeWidth: 2}),
          this.$(go.Picture, deviceIcon, {name: 'image', width: 50, height: 50})
         )
        // let template = this.$(go.Part, 'Vertical',
        //  this.$(go.Picture, { desiredSize: new go.Size(50, 50), source: deviceIcon })
        // )

        this.diagram.add(template)
      },
      addAntenna () {
        let antenna = this.generateAntenna()
        this.diagram.startTransaction('add new antenna' + JSON.stringify(antenna))
        this.diagram.model.addNodeData(antenna)
        this.diagram.commitTransaction('add new antenna' + JSON.stringify(antenna))
        console.log(this.antennaData)
      },
      generateAntenna () {
        let antenna = {}
        antenna.title = Math.random()
        antenna.category = 'LiveAntenna'
        antenna.device_id = Math.random()
        antenna.name = Math.random()
        antenna.key = Math.floor(Math.random() * 100)
        antenna.bottomArray = [
          {portId: 'port' + Math.floor(Math.random() * 100)},
          {portId: 'port' + Math.floor(Math.random() * 100)}
        ]
        return antenna
      },
      nodeTemplate (fillColor, templateSize, portSize, deviceIcon) {
        return this.$(go.Node, 'Table',
          {
            locationObjectName: 'BODY',
            locationSpot: go.Spot.Center,
            selectionObjectName: 'BODY'
          },
          new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
          this.$(go.Panel, 'Auto',
            {
              row: 1,
              column: 1,
              name: 'BODY',
              stretch: go.GraphObject.Fill
            },
            this.$(go.Shape, 'RoundedRectangle',
              {
                fill: 'white',
                stroke: 'black',
                strokeWidth: 2,
                minSize: new go.Size(100, 150)
              }),
            this.$(go.Picture, deviceIcon, {name: 'image', width: 50, height: 50})
          ),  // end Auto Panel body
          // the Panel holding the left port elements, which are themselves Panels,
          // created for each item in the itemArray, bound to data.leftArray
          this.$(go.Panel, 'Vertical',
            new go.Binding('itemArray', 'leftArray'),
            {
              row: 1,
              column: 0,
              itemTemplate:
                this.$(go.Panel,
                  {
                    _side: 'left',  // internal property to make it easier to tell which side it's on
                    fromSpot: go.Spot.Left,
                    toSpot: go.Spot.Left,
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: 'pointer'
                  },
                  new go.Binding('portId', 'portId'),
                  this.$(go.Shape, 'Rectangle',
                    {
                      stroke: null,
                      strokeWidth: 0,
                      desiredSize: portSize,
                      margin: new go.Margin(1, 0)
                    },
                    new go.Binding('fill', 'portColor'))
                )  // end itemTemplate
            }
          ),  // end Vertical Panel
          // the Panel holding the top port elements, which are themselves Panels,
          // created for each item in the itemArray, bound to data.topArray
          this.$(go.Panel, 'Horizontal',
            new go.Binding('itemArray', 'topArray'),
            {
              row: 0,
              column: 1,
              itemTemplate:
                this.$(go.Panel,
                  {
                    _side: 'top',
                    fromSpot: go.Spot.Top,
                    toSpot: go.Spot.Top,
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: 'pointer'
                  },
                  new go.Binding('portId', 'portId'),
                  this.$(go.Shape, 'Rectangle',
                    {
                      stroke: null,
                      strokeWidth: 0,
                      desiredSize: portSize,
                      margin: new go.Margin(0, 1)
                    },
                    new go.Binding('fill', 'portColor'))
                )  // end itemTemplate
            }
          ),  // end Horizontal Panel
          // the Panel holding the right port elements, which are themselves Panels,
          // created for each item in the itemArray, bound to data.rightArray
          this.$(go.Panel, 'Vertical',
            new go.Binding('itemArray', 'rightArray'),
            {
              row: 1,
              column: 2,
              itemTemplate:
                this.$(go.Panel,
                  {
                    _side: 'right',
                    fromSpot: go.Spot.Right,
                    toSpot: go.Spot.Right,
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: 'pointer'
                  },
                  new go.Binding('portId', 'portId'),
                  this.$(go.Shape, 'Rectangle',
                    {
                      stroke: null,
                      strokeWidth: 0,
                      desiredSize: portSize,
                      margin: new go.Margin(1, 0)
                    },
                    new go.Binding('fill', 'portColor'))
                )  // end itemTemplate
            }
          ),  // end Vertical Panel
          // the Panel holding the bottom port elements, which are themselves Panels,
          // created for each item in the itemArray, bound to data.bottomArray
          this.$(go.Panel, 'Horizontal',
            new go.Binding('itemArray', 'bottomArray'),
            {
              row: 2,
              column: 1,
              itemTemplate:
                this.$(go.Panel,
                  {
                    _side: 'bottom',
                    fromSpot: go.Spot.Bottom,
                    toSpot: go.Spot.Bottom,
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: 'pointer'
                  },
                  new go.Binding('portId', 'portId'),
                  this.$(go.Shape, 'Rectangle',
                    {
                      stroke: null,
                      strokeWidth: 0,
                      desiredSize: portSize,
                      margin: new go.Margin(0, 1)
                    },
                    new go.Binding('fill', 'portColor'))
                )  // end itemTemplate
            }
          )
        )
      },
      getTableTemplate () {
        let template = this.$(go.Node, 'Table',
          {
            locationObjectName: 'BODY',
            locationSpot: go.Spot.Center,
            selectionObjectName: 'BODY'
          },
          new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
          this.$(go.Panel, 'Auto',
            {
              row: 1,
              column: 1,
              name: 'BODY',
              stretch: go.GraphObject.Fill
            },
            this.$(go.Shape, 'RoundedRectangle',
              {
                fill: 'white',
                stroke: 'black',
                strokeWidth: 2,
                minSize: new go.Size(100, 150)
              }),
            this.$(go.Picture, deviceIcon, {name: 'image', width: 50, height: 50})
          ),
          this.$(go.Panel, 'Vertical',
            new go.Binding('itemArray', 'leftArray'),
            {
              row: 1,
              column: 0,
              itemTemplate:
                this.$(go.Panel,
                  {
                    _side: 'left',  // internal property to make it easier to tell which side it's on
                    fromSpot: go.Spot.Left,
                    toSpot: go.Spot.Left,
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: 'pointer'
                  },
                  new go.Binding('portId', 'portId'),
                  this.$(go.Shape, 'Rectangle',
                    {
                      stroke: null,
                      strokeWidth: 0,
                      desiredSize: new go.Size(8, 8),
                      margin: new go.Margin(1, 0)
                    },
                    new go.Binding('fill', 'portColor'))
                )
            }
          ),
          this.$(go.Panel, 'Horizontal',
            new go.Binding('itemArray', 'topArray'),
            {
              row: 0,
              column: 1,
              itemTemplate:
                this.$(go.Panel,
                  {
                    _side: 'top',
                    fromSpot: go.Spot.Top,
                    toSpot: go.Spot.Top,
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: 'pointer'
                  },
                  new go.Binding('portId', 'portId'),
                  this.$(go.Shape, 'Rectangle',
                    {
                      stroke: null,
                      strokeWidth: 0,
                      desiredSize: new go.Size(8, 8),
                      margin: new go.Margin(0, 1)
                    },
                    new go.Binding('fill', 'portColor'))
                )
            }
          ),
          this.$(go.Panel, 'Vertical',
            new go.Binding('itemArray', 'rightArray'),
            {
              row: 1,
              column: 2,
              itemTemplate:
                this.$(go.Panel,
                  {
                    _side: 'right',
                    fromSpot: go.Spot.Right,
                    toSpot: go.Spot.Right,
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: 'pointer'
                  },
                  new go.Binding('portId', 'portId'),
                  this.$(go.Shape, 'Rectangle',
                    {
                      stroke: null,
                      strokeWidth: 0,
                      desiredSize: new go.Size(8, 8),
                      margin: new go.Margin(1, 0)
                    },
                    new go.Binding('fill', 'portColor'))
                )
            }
          ),
          this.$(go.Panel, 'Horizontal',
            new go.Binding('itemArray', 'bottomArray'),
            {
              row: 2,
              column: 1,
              itemTemplate:
                this.$(go.Panel,
                  {
                    _side: 'bottom',
                    fromSpot: go.Spot.Bottom,
                    toSpot: go.Spot.Bottom,
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: 'pointer'
                  },
                  new go.Binding('portId', 'portId'),
                  this.$(go.Shape, 'Rectangle',
                    {
                      stroke: null,
                      strokeWidth: 0,
                      desiredSize: new go.Size(8, 8),
                      margin: new go.Margin(0, 1)
                    },
                    new go.Binding('fill', 'portColor'))
                )
            }
          )
         )
        this.diagram.add(template)
      }
    }
  }
</script>

<style scoped>

    #constructorField{
        width: 100%;
        height: 600px;
        border: 1px solid black;
    }

</style>
