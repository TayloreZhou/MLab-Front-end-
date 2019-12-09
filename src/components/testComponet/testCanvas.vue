<template>
  <div id="container">
    <div style="width: 100%; display: flex; justify-content: space-between">
      <div id="myPaletteDiv" style="width: 150px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>
      <div id="myDiagramDiv" style="flex-grow: 1; height: 600px; border: solid 1px black"></div>
      <div id="nodeDetail" style="width:200px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black;padding:10px">
        <p style="text-align: left">节点名称：<input type="text" v-model="selectNode.name"/></p>
        <p style="text-align: left">节点描述：</p>
        <textarea v-model="selectNode.description" style="width:98%;height:200px"></textarea>
        <button @click="saveNode">保存</button>
      </div>
      <div id="linkDetail" style="width:200px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black;padding:10px;display:none;">
        <p style="text-align: left">连线名称：<input type="text" v-model="selectLink.name"/></p>
        <p style="text-align: left">连线描述：</p>
        <textarea v-model="selectLink.description" style="width:98%;height:200px"></textarea>
      <button @click="saveLink">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import go from 'gojs'
export default {
  name: 'testCanvas',
  data () {
    return {
      selectNode: {
        name: '',
        description: ''
      },
      selectLink: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    saveNode () {
      this.myDiagram.model.updateTargetBindings(this.selectNode)
    },
    saveLink () {
      this.myDiagram.model.updateTargetBindings(this.selectLink)
    }
  },
  mounted () {
    var mySelf = this
    const MAKE = go.GraphObject.make
    mySelf.myDiagram = MAKE(go.Diagram, 'myDiagramDiv', {
      'draggingTool.dragsLink': true,
      'undoManager.isEnabled': true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
      'toolManager.hoverDelay': 100, // tooltip提示显示延时
      'toolManager.toolTipDuration': 10000, // tooltip持续显示时间
      // isReadOnly:true,//只读
      // "grid.visible":true,//显示网格
      allowMove: true, // 允许拖动
      // allowDragOut:true,
      allowDelete: false,
      allowCopy: false,
      allowClipboard: false,
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom// 有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
    })

    var that = this
    mySelf.myDiagram.addDiagramListener('ObjectSingleClicked', function (e) {
      if (e.subject.part.data.key === undefined) {
        that.selectLink = e.subject.part.data
        document.getElementById('nodeDetail').style.display = 'none'
        document.getElementById('linkDetail').style.display = 'block'
      } else {
        that.selectNode = e.subject.part.data
        document.getElementById('nodeDetail').style.display = 'block'
        document.getElementById('linkDetail').style.display = 'none'
      }
    })
    mySelf.myDiagram.addModelChangedListener(function (evt) {
      if (!evt.isTransactionFinished) return
      var txn = evt.object
      if (txn === null) return
      txn.changes.each(function (e) {
        if (e.modelChange !== 'nodeDataArray') return
        if (e.change === go.ChangedEvent.Insert) {
          that.selectNode = e.newValue
        }
      })
    })

    // 定义个简单的 Node 模板
    mySelf.myDiagram.nodeTemplate =
      MAKE(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse),
        MAKE(go.Shape, 'RoundedRectangle',
          {
            fill: '#fff', stroke: '#289de9', strokeWidth: 1
          }),
        MAKE(go.TextBlock, 'new node',
          {
            margin: 8,
            font: 'bold 14px Helvetica Neue'
          },
          new go.Binding('text', 'name')))

    function makePort (name, align, spot, output, input) {
      var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom)
      return MAKE(go.Shape,
        {
          fill: 'transparent', // changed to a color in the mouseEnter event handler
          strokeWidth: 0, // no stroke
          width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
          height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
          alignment: align, // align the port on the main Shape
          stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
          portId: name, // declare this object to be a "port"
          fromSpot: spot, // declare where links may connect at this port
          fromLinkable: output, // declare whether the user may draw links from here
          toSpot: spot, // declare where links may connect at this port
          toLinkable: input, // declare whether the user may draw links to here
          cursor: 'pointer', // show a different cursor to indicate potential link point
          mouseEnter: function (e, port) { // the PORT argument will be this Shape
            if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)'
          },
          mouseLeave: function (e, port) {
            port.fill = 'transparent'
          }
        })
    }
    mySelf.myDiagram.nodeTemplateMap.add('', // the default category
      MAKE(go.Node, 'Auto',
        {
          contextMenu: // define a context menu for each node
            MAKE('ContextMenu', // that has one button
              MAKE('ContextMenuButton',
                MAKE(go.TextBlock, 'Undo'),
                {
                  click: function (e, obj) {
                    console.log(1)
                  }
                }
              ))
        },
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, 'RoundedRectangle',
            {
              fill: '#fff', stroke: '#289de9', strokeWidth: 1
            }),
          MAKE(go.TextBlock, 'new node',
            {
              margin: 8,
              font: 'bold 14px Helvetica Neue'
            },
            new go.Binding('text', 'name').makeTwoWay())
        ),
        // four named ports, one on each side:
        makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
        makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
        makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, false)
      ))

    // 定义连线
    mySelf.myDiagram.linkTemplate =
      MAKE('Link',
        MAKE('Shape',
          {strokeWidth: 2, stroke: '#289de9'}),
        MAKE('Shape',
          {toArrow: 'Standard', fill: '#289de9', stroke: null}),
        MAKE(go.TextBlock, 'new link',
          {
            margin: 8,
            font: 'bold 14px Helvetica Neue',
            segmentOffset: new go.Point(0, -10)
          },
          new go.Binding('text', 'name').makeTwoWay())
      )

    var palette =
      MAKE(go.Palette, 'myPaletteDiv', // create a new Palette in the HTML DIV element
        {
          // share the template map with the Palette
          nodeTemplateMap: mySelf.myDiagram.nodeTemplateMap,
          autoScale: go.Diagram.Uniform// everything always fits in viewport
        })
    palette.model.nodeDataArray = [
      {} // default node
    ]

    let myModel = MAKE(go.GraphLinksModel)
    myModel.nodeDataArray =
      [
        // {key:"1", name: "a",age:12,description:'我是a节点'},
        // {key:"2", parent:"1", name: "b",age:13 ,description:'我是b节点'},
        // {key:"3", parent:"1", name: "c",age:13 ,description:'我是b节点'},
      ]
    myModel.linkDataArray = [
      // {from:"1",to:"2"},
      // {from:"1",to:"3"},
      // {from:"1",to:"4"},
      // {from:"1",to:"5"},
    ]
    mySelf.myDiagram.model = myModel
  }
}
</script>

<style scoped>

</style>
