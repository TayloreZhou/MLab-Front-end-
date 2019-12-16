<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-table :data="viewTable"
                  style="width: 100%; ">
          <el-table-column label="日期"
                           width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="作业号"
                           width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover"
                          placement="top">
                <p>model name: {{ scope.row.name }}</p>
                <p>description: {{ scope.row.address }}</p>
                <div slot="reference"
                     class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.historyId }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="状态"
                           width="180">
            <template slot-scope="scope">
              <el-button :type="miStatusColor(scope.row.status)">{{miStatusName(scope.row.status)}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status===3||scope.row.status===4"
                         size="mini"
                         type="success"
                         round
                         @click="confirm(scope.row)">confirm</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <div class="text">
          Filter
        </div>
        <el-divider></el-divider>
        <div class="checkbox">
          <el-checkbox v-model="checked1"
                       label="排队中"
                       @change="checkChange"
                       border></el-checkbox>
        </div>
        <div class="checkbox">
          <el-checkbox v-model="checked2"
                       label="执行中"
                       @change="checkChange"
                       border></el-checkbox>
        </div>
        <div class="checkbox">
          <el-checkbox v-model="checked3"
                       label="已完成"
                       @change="checkChange"
                       border></el-checkbox>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'trainingJobs',
  data () {
    return {
      tableData: [],
      viewTable: [],
      checked1: true,
      checked2: true,
      checked3: true,
      username: localStorage.getItem('username'),
      socket: null
    }
  },
  destroyed () {
    this.socket.close()
  },
  mounted () {
    var that = this
    that.$axios.get('/meta/train/' + that.username).then(response => {
      that.$forceUpdate()
      var receiveTable = response.data
      for (var i = 0; i < receiveTable.length; ++i) {
        if (receiveTable[i].status !== 1) {
          that.tableData.push(receiveTable[i])
        }
      }
      if (that.checked3) {
        for (i = 0; i < that.tableData.length; ++i) {
          if (this.tableData[i].status === 3 || this.tableData[i].status === 4) {
            this.viewTable.push(this.tableData[i])
          }
        }
      }
      if (this.checked2) {
        for (var x = 0; x < this.tableData.length; ++x) {
          if (this.tableData[x].status === 2) {
            this.viewTable.push(this.tableData[x])
          }
        }
      }
      if (this.checked1) {
        for (var y = 0; y < this.tableData.length; ++y) {
          if (this.tableData[y].status === 0) {
            this.viewTable.push(this.tableData[y])
          }
        }
      }
    })

    if (typeof (WebSocket) === 'undefined') {
      console.log('您的浏览器不支持WebSocket')
    } else {
      console.log('您的浏览器支持WebSocket')
      var socketUrl = 'ws://localhost:8087/websocket/' + that.username
      console.log(socketUrl)
      that.socket = new WebSocket(socketUrl, [])

      that.socket.onopen = function () {
        console.log('websocket已打开')
      }
      // 获得消息事件
      that.socket.onmessage = function (msg) {
        console.log(msg.data)
        that.$forceUpdate()
        var historyId = msg.data.split(':')[0]
        var status = msg.data.split(':')[1]
        for (var item = 0; item < that.tableData.length; ++item) {
          if (that.tableData[item].historyId.toString() === historyId) {
            if (status === 'running') {
              that.tableData[item].status = 2
              that.$set(that.tableData[item].status, 2)
            }
            if (status === 'complete') {
              that.tableData[item].status = 3
              that.$set(that.tableData[item].status, 3)
            }
          }
        }
        for (var i = 0; i < that.viewTable.length; ++i) {
          console.log(that.viewTable[i])
          if (that.viewTable[i].historyId.toString() === historyId) {
            if (status === 'running') {
              console.log('running')
              that.viewTable[i].status = 2
              that.$set(that.viewTable[i].status, 2)
            }
            if (status === 'complete') {
              console.log('complete')
              that.viewTable[i].status = 3
              that.$set(that.viewTable[i].status, 3)
            }
          }
        }
      }

      // 关闭事件
      that.socket.onclose = function () {
        console.log('websocket已关闭')
      }
      // 发生了错误事件
      that.socket.onerror = function () {
        console.log('websocket发生了错误')
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    miStatusColor (status) {
      if (status === 3) {
        return 'success'
      } else if (status === 2) {
        return 'warning'
      } else if (status === 4) {
        return 'danger'
      } else if (status === 0) {
        return 'primary'
      }
    },
    miStatusName (status) {
      if (status === 3) {
        return 'completed'
      } else if (status === 2) {
        return 'running'
      } else if (status === 4) {
        return 'fail'
      } else if (status === 0) {
        return 'pending'
      }
    },
    checkChange (val) {
      console.log('ok')
      this.$forceUpdate()
      this.viewTable = []
      if (this.checked3) {
        for (var i = 0; i < this.tableData.length; ++i) {
          if (this.tableData[i].status === 3 || this.tableData[i].status === 4) {
            this.viewTable.push(this.tableData[i])
          }
        }
      }
      if (this.checked2) {
        for (var x = 0; x < this.tableData.length; ++x) {
          if (this.tableData[x].status === 2) {
            this.viewTable.push(this.tableData[x])
          }
        }
      }
      if (this.checked1) {
        for (var y = 0; y < this.tableData.length; ++y) {
          if (this.tableData[y].status === 0) {
            this.viewTable.push(this.tableData[y])
          }
        }
      }
    },
    confirm (val) {
      var that = this
      that.$axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: '/meta/history_delete/',
        data: val.historyId
      }).then(response => {
        that.$forceUpdate()
        that.tableData.splice(that.tableData.indexOf(val), 1)
        that.viewTable.splice(that.viewTable.indexOf(val), 1)
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 16px;
  color: #606266;
}

.item {
  padding: 10px 0;
  width: 100%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 240px;
}
.grid {
  padding: 5px 0 30px;
}
.checkbox {
  padding: 10px;
}
</style>
