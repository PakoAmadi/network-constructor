export function nodeTemplate (go, goJs, fillColor, templateSize, portSize, deviceIcon) {
  return goJs(go.Node, 'Table',
    {
      locationObjectName: 'BODY',
      locationSpot: go.Spot.Center,
      selectionObjectName: 'BODY'
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    goJs(go.Panel, 'Auto',
      {
        row: 1,
        column: 1,
        name: 'BODY',
        stretch: go.GraphObject.Fill
      },
      goJs(go.Shape, 'RoundedRectangle',
        {
          fill: 'white',
          stroke: 'black',
          strokeWidth: 2,
          minSize: new go.Size(100, 150)
        }),
      goJs(go.Picture, deviceIcon, {name: 'image', width: 50, height: 50})
    ),  // end Auto Panel body
    // the Panel holding the left port elements, which are themselves Panels,
    // created for each item in the itemArray, bound to data.leftArray
    goJs(go.Panel, 'Vertical',
      new go.Binding('itemArray', 'leftArray'),
      {
        row: 1,
        column: 0,
        itemTemplate:
          goJs(go.Panel,
            {
              _side: 'left',  // internal property to make it easier to tell which side it's on
              fromSpot: go.Spot.Left,
              toSpot: go.Spot.Left,
              fromLinkable: true,
              toLinkable: true,
              cursor: 'pointer'
            },
            new go.Binding('portId', 'portId'),
            goJs(go.Shape, 'Rectangle',
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
    goJs(go.Panel, 'Horizontal',
      new go.Binding('itemArray', 'topArray'),
      {
        row: 0,
        column: 1,
        itemTemplate:
          goJs(go.Panel,
            {
              _side: 'top',
              fromSpot: go.Spot.Top,
              toSpot: go.Spot.Top,
              fromLinkable: true,
              toLinkable: true,
              cursor: 'pointer'
            },
            new go.Binding('portId', 'portId'),
            goJs(go.Shape, 'Rectangle',
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
    goJs(go.Panel, 'Vertical',
      new go.Binding('itemArray', 'rightArray'),
      {
        row: 1,
        column: 2,
        itemTemplate:
          goJs(go.Panel,
            {
              _side: 'right',
              fromSpot: go.Spot.Right,
              toSpot: go.Spot.Right,
              fromLinkable: true,
              toLinkable: true,
              cursor: 'pointer'
            },
            new go.Binding('portId', 'portId'),
            goJs(go.Shape, 'Rectangle',
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
    goJs(go.Panel, 'Horizontal',
      new go.Binding('itemArray', 'bottomArray'),
      {
        row: 2,
        column: 1,
        itemTemplate:
          goJs(go.Panel,
            {
              _side: 'bottom',
              fromSpot: go.Spot.Bottom,
              toSpot: go.Spot.Bottom,
              fromLinkable: true,
              toLinkable: true,
              cursor: 'pointer'
            },
            new go.Binding('portId', 'portId'),
            goJs(go.Shape, 'Rectangle',
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
}
