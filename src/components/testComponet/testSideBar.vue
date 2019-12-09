<template>
  <div>
    <!-- Styling for this portion is in BPMN.css -->
    <div id="PaletteAndDiagram">
      <div id="sideBar">
        <div id="accordion">
          <h4 @click="showPaletteLevel1">Level 1 items</h4>
          <div>
            <div id="myPaletteLevel1" style="display:none" class="myPaletteDiv" ></div>
          </div>
          <h4 @click="showPaletteLevel2">Level 2 items</h4>
          <div>
            <div id="myPaletteLevel2" style="display:none" class="myPaletteDiv"></div>
          </div>
          <h4 @click="showPaletteLevel3">Other items</h4>
          <div>
            <div id="myPaletteLevel3" style="display:none" class="myPaletteDiv"></div>
          </div>
        </div>
      </div>
      <div id="myDiagramDiv"></div>
      <div id="infoBar" class="inspector"></div>
    </div>
  </div>
</template>

<script>
import go from 'gojs'
import $ from 'jquery'
import Inspector from '../../assets/js/DataInspector'
import '../../assets/css/DataInspector.css'
const MAKE = go.GraphObject.make
export default {
  name: 'testSideBar',
  data () {
    return {
      stateP1: 0,
      stateP2: 0,
      stateP3: 0,
      myDiagram: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      var mySelf = this
      // initialize the first Palette
      var graygrad = MAKE(go.Brush, 'Linear',
        { 0: 'white', 0.1: 'whitesmoke', 0.9: 'whitesmoke', 1: 'lightgray' })

      var layerNodeTemplateForPalette = MAKE(go.Node, 'Spot',
        { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        // the main body consists of a Rectangle surrounding the text
        MAKE(go.Panel, 'Auto',
          { name: 'BODY' },
          MAKE(go.Shape, 'Rectangle',
            { fill: graygrad, stroke: 'gray', minSize: new go.Size(120, 21) },
            new go.Binding('fill', 'isSelected', function (s) { return s ? 'dodgerblue' : graygrad }).ofObject()),
          MAKE(go.TextBlock,
            {
              stroke: 'black',
              font: '12px sans-serif',
              editable: true,
              margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
              alignment: go.Spot.Left
            },
            new go.Binding('text').makeTwoWay())
        ),
        // output port
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer', click: this.addNodeAndLink },
          MAKE(go.Shape, 'Circle',
            { width: 22, height: 22, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3 }),
          MAKE(go.Shape, 'PlusLine',
            { width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3 })
        ),
        // input port
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
          MAKE(go.Shape, 'Circle',
            { width: 8, height: 8, fill: 'white', stroke: 'gray' }),
          MAKE(go.Shape, 'Circle',
            { width: 4, height: 4, fill: 'dodgerblue', stroke: null })
        )
      )
      var palNodeTemplateMap = new go.Map()
      palNodeTemplateMap.add('layerNode', layerNodeTemplateForPalette)
      mySelf.myDiagram = MAKE(go.Diagram, 'myDiagramDiv', {
        'undoManager.isEnabled': true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
        'toolManager.hoverDelay': 100, // tooltip提示显示延时
        'toolManager.toolTipDuration': 10000, // tooltip持续显示时间
        // isReadOnly:true,//只读
        'grid.visible': true, // 显示网格
        allowMove: true, // 允许拖动
        // allowDragOut:true,
        allowDelete: true,
        allowCopy: true,
        allowClipboard: true,
        'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
        layout: MAKE(go.TreeLayout, {
          angle: 0,
          layerSpacing: 35
        })
      }) // 构建gojs对象
      console.log(mySelf.myDiagram)
      mySelf.myDiagram.addDiagramListener('ObjectSingleClicked', function (e) {
        debugger
        console.log(e.subject.part)
      })

      mySelf.myDiagram.addDiagramListener('BackgroundSingleClicked', function (e) {
        debugger
        console.log('Double-clicked at' + e.diagram.lastInput.documentPoint)
      })

      mySelf.myDiagram.addDiagramListener('ClipboardPasted', function (e) {
        debugger
        console.log('Pasted' + e.diagram.selection.count + 'parts')
      })

      mySelf.myDiagram.nodeTemplateMap = palNodeTemplateMap
      mySelf.myDiagram.linkTemplate = MAKE(go.Link,
        { selectionAdorned: false, fromPortId: 'from', toPortId: 'to', relinkableTo: true },
        MAKE(go.Shape,
          { stroke: 'gray', strokeWidth: 2 },
          {
            mouseEnter: function (e, obj) { obj.strokeWidth = 5; obj.stroke = 'dodgerblue' },
            mouseLeave: function (e, obj) { obj.strokeWidth = 2; obj.stroke = 'gray' }
          })
      )

      let myModel = MAKE(go.GraphLinksModel) // 也可以创建link model;需要配置myModel.linkDataArray 如下
      myModel.nodeDataArray = []
      myModel.linkDataArray = []
      mySelf.myDiagram.model = myModel
      // eslint-disable-next-line no-unused-vars,no-undef
      var inspector = new Inspector('infoBar', this.myDiagram,
        {
          properties: {
            // key would be automatically added for nodes, but we want to declare it read-only also:
            // eslint-disable-next-line no-undef
            'key': { readOnly: true, show: Inspector.showIfPresent },
            'Comments': { show: Inspector.showIfNode }
          }
        })
      this.init()
    })
  },
  methods: {
    init () {
      var myPaletteLevel1 = MAKE(go.Palette, 'myPaletteLevel1', {
        nodeTemplateMap: this.myDiagram.nodeTemplateMap,
        layout: MAKE(go.GridLayout, {
          cellSize: new go.Size(1, 1),
          spacing: new go.Size(5, 5),
          comparer: this.keyCompare
        })
      })
      // initialize the second Palette, BPMN Spec Level 2
      var myPaletteLevel2 = MAKE(go.Palette, 'myPaletteLevel2', {
        nodeTemplateMap: this.myDiagram.nodeTemplateMap,
        layout: MAKE(go.GridLayout, {
          cellSize: new go.Size(1, 1),
          spacing: new go.Size(5, 5),
          comparer: this.keyCompare
        })
      })
      // initialize the third Palette, random other stuff
      var myPaletteLevel3 = MAKE(go.Palette, 'myPaletteLevel3', {
        nodeTemplateMap: this.myDiagram.nodeTemplateMap,
        layout: MAKE(go.GridLayout, {
          cellSize: new go.Size(1, 1),
          spacing: new go.Size(5, 5),
          comparer: this.keyCompare
        })
      })
      myPaletteLevel1.model = MAKE(go.GraphLinksModel, {
        copiesArrays: true,
        copiesArrayObjects: true,
        nodeDataArray: [
          {key: 101, category: 'layerNode', text: 'layerNode11'},
          {key: 102, category: 'layerNode', text: 'layerNode12'},
          {key: 103, category: 'layerNode', text: 'layerNode13'},
          {key: 104, category: 'layerNode', text: 'layerNode14'},
          {key: 105, category: 'layerNode', text: 'layerNode15'}
        ]
      })
      myPaletteLevel2.model = MAKE(go.GraphLinksModel, {
        copiesArrays: true,
        copiesArrayObjects: true,
        nodeDataArray: [
          {key: 201, category: 'layerNode', text: 'layerNode21'},
          {key: 202, category: 'layerNode', text: 'layerNode22'},
          {key: 203, category: 'layerNode', text: 'layerNode23'}
        ]
      })
      myPaletteLevel3.model = MAKE(go.GraphLinksModel, {
        copiesArrays: true,
        copiesArrayObjects: true,
        nodeDataArray: [
          {key: 301, category: 'layerNode', text: 'layerNode31'},
          {key: 302, category: 'layerNode', text: 'layerNode32'},
          {key: 303, category: 'layerNode', text: 'layerNode33'}
        ]
      })
    },
    addNodeAndLink (e, obj) {
      var fromNode = obj.part
      var diagram = fromNode.diagram
      diagram.startTransaction('Add State')
      this.shiftNodesToEmptySpaces()
      diagram.commitTransaction('Add State')
    },
    shiftNodesToEmptySpaces () {
      this.myDiagram.selection.each(function (node) {
        if (!(node instanceof go.Node)) return
        // look for Parts overlapping the node
        while (true) {
          var exist = this.myDiagram.findObjectsIn(node.actualBounds,
            // only consider Parts
            function (obj) { return obj.part },
            // ignore Links and the dropped node itself
            function (part) { return part instanceof go.Node && part !== node },
            // check for any overlap, not complete containment
            true).first()
          if (exist === null) break
          // try shifting down beyond the existing node to see if there's empty space
          node.position = new go.Point(node.actualBounds.x, exist.actualBounds.bottom + 10)
        }
      })
    },

    keyCompare (a, b) {
      var at = a.data.key
      var bt = b.data.key
      if (at < bt) { return -1 }
      if (at > bt) { return 1 }
      return 0
    },
    onSubmit () {
    },
    showPaletteLevel1 () {
      if (this.stateP1 === 0) {
        $('#myPaletteLevel1').slideDown()
        this.stateP1 = 1
      } else {
        $('#myPaletteLevel1').slideUp()
        this.stateP1 = 0
      }
    },
    showPaletteLevel2 () {
      if (this.stateP2 === 0) {
        $('#myPaletteLevel2').slideDown()
        this.stateP2 = 1
      } else {
        $('#myPaletteLevel2').slideUp()
        this.stateP2 = 0
      }
    },
    showPaletteLevel3 () {
      if (this.stateP3 === 0) {
        $('#myPaletteLevel3').slideDown()
        this.stateP3 = 1
      } else {
        $('#myPaletteLevel3').slideUp()
        this.stateP3 = 0
      }
    }
  }
}
</script>

<style type="text/css" scoped>
  /* for BPMN.html */

  /* Diagram and palette area */

  #myDiagramDiv {
    float: left;
    width: 60%;
    height: 650px;
    background-color: white;
  }

  #PaletteAndDiagram {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  #sideBar {
    float: left;
    width: 20%;
    height: 650px;
    text-align: center;
    overflow-y:auto;
    overflow-x:hidden;
  }

  #infoBar {
    float: left;
    width: 20%;
    height: 650px;
  }

  .myPaletteDiv {
    width: 100%;
    min-height: 400px;
  }

  #accordion {
    margin: 0px;
    width: 97%;
    min-height: 625px;
  }

  .ui-accordion .ui-accordion-content {
    padding: 1px;
  }
  .ui-menu {
    width: 120px;
  }
  #menuui {
    height: 30px;
    width: 100%;
  }
  #menuui > li {
    float: left;
  }

  input {
    text-align: center;
    font-size: large;
    float: left;
  }

  #myOverviewDiv {
    background-color: lightgray;
  }

  #currentFile {
    background: #1874CD;
    width: 100%;
    text-align: center;
    font-family: Arial;
    font-weight: bold;
    font-size: 14px;
    padding: 3px 0px;
    color: white;
  }

  .draggable {
    display: inline-block;
    vertical-align: top;
    border: 1px solid gray;
    background-color: #e2e2e2;
    position: absolute;
    top: 40%;
    left: 50%;
    width: 300px;
    height: 200px;
    z-index: 500;
  }

  .handle {
    background-color: #9CCB19;
    text-align: center;
    font: bold 12px sans-serif;
  }

  .elementText {
    font-family: Arial;
    font-size: medium;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .mySavedFiles {
    font-family: Arial;
    font-size: medium;
    width: 250px;
    margin-left: 25px;
  }

  .elementBtn {
    margin-top: 20px;
    font-family: Arial;
    font-size: medium;
    margin-left: 20px;
  }

  /* sample thumbnails bottom area */

  figure {
    display: inline-block;
    margin: 10px;
  }

  .inspector{
    background: white;
    color: black;
  }
</style>
