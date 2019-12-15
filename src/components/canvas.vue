<template>
  <el-row>
    <el-divider></el-divider>
    <my-uploader ref="myUploaderAlpha"></my-uploader>
    <el-row>
      <el-col :span="6">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="ModelName" prop="modelName">
            <el-input v-model="ruleForm.modelName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="14" :span="2">
        <el-button type="primary" @click="myUpload">File<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="uploadModel('ruleForm')" type="primary">Model<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    <el-row>
      <div id="PaletteAndDiagram">
        <div id="sideBar">
          <div id="accordion">
            <h4 @click="showPaletteLevel1">Input Layer</h4>
            <div>
              <div id="myPaletteLevel1" class="myPaletteDiv" ></div>
            </div>
            <h4 @click="showPaletteLevel2">Node layer</h4>
            <div>
              <div id="myPaletteLevel2" class="myPaletteDiv"></div>
            </div>
            <h4 @click="showPaletteLevel3">Output Layer</h4>
            <div>
              <div id="myPaletteLevel3" class="myPaletteDiv"></div>
            </div>
          </div>
        </div>
        <div id="myDiagramDiv"></div>
        <div id="infoBar" class="inspector"></div>
      </div>
    </el-row>
  </el-row>
</template>

<script>
import go from 'gojs'
import $ from 'jquery'
import Inspector from '../assets/js/DataInspector'
import '../assets/css/DataInspector.css'
import {ACCEPT_CONFIG} from '../assets/js/config'
import MyUploader from './uploader'
const MAKE = go.GraphObject.make
export default {
  name: 'canvas',
  components: {MyUploader},
  data () {
    var checkName = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error('Username can\'t be empty'))
      } else {
        return callback()
      }
    }
    return {
      stateP1: 1,
      stateP2: 1,
      stateP3: 1,
      myDiagram: null,
      loading: false,
      files: ['22'],
      datasetName: ['sdad', 'ads', 'sadwwww'],
      ruleForm: {
        modelName: ''
      },
      rules: {
        modelName: [
          { validator: checkName, trigger: 'blur' }
        ]
      },
      datasetId: 0,
      options: {
        target: '/server/data-service/chunk',
        chunkSize: '20480',
        maxChunkRetries: 1,
        testChunks: true
      },
      attrs: {
        accept: ACCEPT_CONFIG.getAll()
      },
      statusText: {
        success: 'Success',
        error: 'Error',
        uploading: 'Uploading',
        paused: 'Pause',
        waiting: 'Waiting'
      },
      panelShow: false, // 选择文件后，展示上传panel
      collapse: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      var mySelf = this
      // initialize the first Palette
      var graygrad = MAKE(go.Brush, 'Linear', {
        0: 'white',
        0.1: 'whitesmoke',
        0.9: 'whitesmoke',
        1: 'lightgray'
      })
      var outputNodeTemplateForPalette = MAKE(
        go.Node,
        'Spot',
        {
          selectionAdorned: false,
          textEditable: true,
          locationObjectName: 'BODY'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        // the main body consists of a Rectangle surrounding the text
        MAKE(
          go.Panel,
          'Auto',
          { name: 'BODY' },
          MAKE(
            go.Shape,
            'Rectangle',
            { fill: graygrad, stroke: 'gray', minSize: new go.Size(120, 21) },
            new go.Binding('fill', 'isSelected', function (s) {
              return s ? 'dodgerblue' : graygrad
            }).ofObject()
          ),
          MAKE(
            go.TextBlock,
            {
              stroke: 'black',
              font: '12px sans-serif',
              editable: true,
              margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
              alignment: go.Spot.Left
            },
            new go.Binding('text', 'name')
          )
        ),
        // input port
        MAKE(
          go.Panel,
          'Auto',
          { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
          MAKE(go.Shape, 'Circle', {
            width: 8,
            height: 8,
            fill: 'white',
            stroke: 'gray'
          }),
          MAKE(go.Shape, 'Circle', {
            width: 4,
            height: 4,
            fill: 'dodgerblue',
            stroke: null
          })
        )
      )
      var inputNodeTemplateForPalette = MAKE(
        go.Node,
        'Spot',
        {
          selectionAdorned: false,
          textEditable: true,
          locationObjectName: 'BODY'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        // the main body consists of a Rectangle surrounding the text
        MAKE(
          go.Panel,
          'Auto',
          { name: 'BODY' },
          MAKE(
            go.Shape,
            'Rectangle',
            { fill: graygrad, stroke: 'gray', minSize: new go.Size(120, 21) },
            new go.Binding('fill', 'isSelected', function (s) {
              return s ? 'dodgerblue' : graygrad
            }).ofObject()
          ),
          MAKE(
            go.TextBlock,
            {
              stroke: 'black',
              font: '12px sans-serif',
              editable: true,
              margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
              alignment: go.Spot.Left
            },
            new go.Binding('text', 'name')
          )
        ),
        // output port
        MAKE(
          go.Panel,
          'Auto',
          {
            alignment: go.Spot.Right,
            portId: 'from',
            fromLinkable: true,
            click: this.addNodeAndLink
          },
          MAKE(go.Shape, 'Circle', {
            width: 22,
            height: 22,
            fill: 'white',
            stroke: 'dodgerblue',
            strokeWidth: 3
          }),
          MAKE(go.Shape, 'PlusLine', {
            width: 11,
            height: 11,
            fill: null,
            stroke: 'dodgerblue',
            strokeWidth: 3
          })
        )
      )

      var layerNodeTemplateForPalette = MAKE(
        go.Node,
        'Spot',
        {
          selectionAdorned: false,
          textEditable: true,
          locationObjectName: 'BODY'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        // the main body consists of a Rectangle surrounding the text
        MAKE(
          go.Panel,
          'Auto',
          { name: 'BODY' },
          MAKE(
            go.Shape,
            'Rectangle',
            { fill: graygrad, stroke: 'gray', minSize: new go.Size(120, 21) },
            new go.Binding('fill', 'isSelected', function (s) {
              return s ? 'dodgerblue' : graygrad
            }).ofObject()
          ),
          MAKE(
            go.TextBlock,
            {
              stroke: 'black',
              font: '12px sans-serif',
              editable: true,
              margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
              alignment: go.Spot.Left
            },
            new go.Binding('text', 'name')
          )
        ),
        // output port
        MAKE(
          go.Panel,
          'Auto',
          {
            alignment: go.Spot.Right,
            portId: 'from',
            fromLinkable: true,
            cursor: 'pointer',
            click: this.addNodeAndLink
          },
          MAKE(go.Shape, 'Circle', {
            width: 22,
            height: 22,
            fill: 'white',
            stroke: 'dodgerblue',
            strokeWidth: 3
          }),
          MAKE(go.Shape, 'PlusLine', {
            width: 11,
            height: 11,
            fill: null,
            stroke: 'dodgerblue',
            strokeWidth: 3
          })
        ),
        // input port
        MAKE(
          go.Panel,
          'Auto',
          { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
          MAKE(go.Shape, 'Circle', {
            width: 8,
            height: 8,
            fill: 'white',
            stroke: 'gray'
          }),
          MAKE(go.Shape, 'Circle', {
            width: 4,
            height: 4,
            fill: 'dodgerblue',
            stroke: null
          })
        )
      )
      var palNodeTemplateMap = new go.Map()
      palNodeTemplateMap.add('Input', inputNodeTemplateForPalette)
      palNodeTemplateMap.add('HashingTF', layerNodeTemplateForPalette)
      palNodeTemplateMap.add('LogisticRegression', layerNodeTemplateForPalette)
      palNodeTemplateMap.add('Tokenizer', layerNodeTemplateForPalette)
      palNodeTemplateMap.add('Output', outputNodeTemplateForPalette)
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
        console.log(e.subject.part)
      })

      mySelf.myDiagram.addDiagramListener('BackgroundSingleClicked', function (e) {
        console.log('Double-clicked at' + e.diagram.lastInput.documentPoint)
      })

      mySelf.myDiagram.addDiagramListener('ClipboardPasted', function (e) {
        console.log('Pasted' + e.diagram.selection.count + 'parts')
      })

      mySelf.myDiagram.nodeTemplateMap = palNodeTemplateMap
      mySelf.myDiagram.linkTemplate = MAKE(
        go.Link,
        {
          selectionAdorned: false,
          fromPortId: 'from',
          toPortId: 'to',
          relinkableTo: true
        },
        MAKE(
          go.Shape,
          { stroke: 'gray', strokeWidth: 2 },
          {
            mouseEnter: function (e, obj) {
              obj.strokeWidth = 5
              obj.stroke = 'dodgerblue'
            },
            mouseLeave: function (e, obj) {
              obj.strokeWidth = 2
              obj.stroke = 'gray'
            }
          }
        )
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
            'category': { readOnly: true, show: Inspector.showIfPresent },
            'name': { show: Inspector.showIfPresent },
            'InputCol': { show: Inspector.showIfPresent },
            'OutputCol': { show: Inspector.showIfPresent },
            'choices': {show: false},
            'fileName': {
              show: Inspector.showIfPresent,
              type: 'select',
              choices: function (node, propName) {
                console.log('3222', node.data)
                if (Array.isArray(node.data.choices)) return node.data.choices
                return ['one', 'two', 'three']
              }
            }
          }
        })
      console.log('hello')
      this.$axios.post('/boot/model')
        .then((response) => {
          console.log('1', this.files)
          console.log('1', response.data)
          this.files = []
          for (var i = 0; i < response.data.length; i++) {
            this.files.push(response.data[i])
          }
          this.init()
          console.log('2', this.files)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  methods: {
    uploadModel (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          const h = this.$createElement
          this.$msgbox({
            title: '消息',
            message: h('p', null, [
              h('span', null, '内容可以是 '),
              h('i', { style: 'color: teal' }, 'VNode')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            this.$message({
              type: 'info',
              message: 'action: ' + action
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getFiles () {
      this.$axios.post('/boot/model')
        .then((response) => {
          console.log('1', response.data)
          this.files = Object.assign([], response.data)
          console.log('2', this.files)
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
          {key: 101, category: 'Input', name: 'InputNode', fileName: '', choices: this.files}
        ]
      })
      myPaletteLevel2.model = MAKE(go.GraphLinksModel, {
        copiesArrays: true,
        copiesArrayObjects: true,
        nodeDataArray: [
          {
            key: 201,
            category: 'HashingTF',
            name: 'HashingTFNode',
            InputCol: 3,
            OutputCol: 3
          },
          {
            key: 202,
            category: 'LogisticRegression',
            name: 'LogisticRegressionNode'
          },
          {
            key: 203,
            category: 'Tokenizer',
            name: 'TokenizerNode',
            InputCol: 3,
            OutputCol: 3
          }
        ]
      })
      myPaletteLevel3.model = MAKE(go.GraphLinksModel, {
        copiesArrays: true,
        copiesArrayObjects: true,
        nodeDataArray: [{ key: 301, category: 'Output', name: 'OutputNode' }]
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
          var exist = this.myDiagram
            .findObjectsIn(
              node.actualBounds,
              // only consider Parts
              function (obj) {
                return obj.part
              },
              // ignore Links and the dropped node itself
              function (part) {
                return part instanceof go.Node && part !== node
              },
              // check for any overlap, not complete containment
              true
            )
            .first()
          if (exist === null) break
          // try shifting down beyond the existing node to see if there's empty space
          node.position = new go.Point(
            node.actualBounds.x,
            exist.actualBounds.bottom + 10
          )
        }
      })
    },

    keyCompare (a, b) {
      var at = a.data.key
      var bt = b.data.key
      if (at < bt) {
        return -1
      }
      if (at > bt) {
        return 1
      }
      return 0
    },
    onSubmit () {},
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
    },
    myUpload () {
      this.$refs.myUploaderAlpha.myUpload()
    },
    myModel () {
      console.log(this.myDiagram.model.toJSON())
      if (typeof WebSocket === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        console.log('您的浏览器支持WebSocket')
        var socketUrl = 'http://localhost:8087/api/websocket/1001'
        socketUrl = socketUrl.replace('https', 'ws').replace('http', 'ws')
        console.log(socketUrl)
        var socket = new WebSocket(socketUrl)

        socket.onopen = function () {
          console.log('websocket已打开')
        }
        socket.onmessage = function (msg) {
          console.log(msg.data)
        }
        socket.onclose = function () {
          console.log('websocket已关闭')
        }
        socket.onerror = function () {
          console.log('websocket发生了错误')
        }
      }
    },
    commit () {
      console.log('OK')
      this.loading = true
      this.$axios({
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        url: '/boot/api/model/generate/123/912?description=221',
        data: this.myDiagram.model.toJSON()
      }).then(response => {
        this.loading = false
        this.$message({
          message: '模型成功生成',
          type: 'success'
        })
        this.$router.push({
          path: '/modellist'
        })
      })
    },
    goBack () {
      this.$router.go(-1)
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
  overflow-y: auto;
  overflow-x: hidden;
}

#infoBar {
  float: left;
  width: 20%;
  height: 650px;
}

#subbmitButton {
  position: relative;
  bottom: 40px;
  right: -500px;
}

.myPaletteDiv {
  width: 100%;
  min-height: 150px;
}

#accordion {
  margin: 0px;
  width: 97%;
  min-height: 625px;
}

.ui-accordion .ui-accordion-content {
  padding: 1px;
}

#menuui > li {
  float: left;
}

input {
  text-align: center;
  font-size: large;
  float: left;
}

figure {
  display: inline-block;
  margin: 10px;
}

.inspector {
  background: white;
  color: black;
}
.tabber {
  font-size: 24px;
  text-align: left;
}
</style>
