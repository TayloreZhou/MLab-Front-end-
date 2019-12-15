<template>
  <div>
    <div>
      <el-input placeholder="搜索模型名"
                suffix-icon="el-icon-search"
                v-model="searchItem"
                @input="handleInput"
                style="width: 50% ">
      </el-input>
      <el-button type="success"
                 style="margin-left:10px"
                 @click="createModel">create</el-button>
      <el-button type="text"
                 @click="refresh"
                 style="font-size:20px;"><i class="el-icon-refresh-right"></i></el-button>
    </div>
    <el-row :gutter="20"
            class="grid"
            style="margin-top:15px">
      <el-col v-for="x in modelList.slice(0,3)"
              :key="x"
              :span="8">
        <div class="grid-content bg-purple">
          <transition name="el-fade-in-linear">
            <el-card class="box-card"
                     shadow="hover">
              <div slot="header"
                   class="clearfix">
                <span style="line-height: 28px; max-width: 30px">{{ x.modelName |ellipsis}}</span>
                <el-divider direction="vertical"></el-divider>
                <el-button type="success"
                           size="small"
                           style="float:right;"
                           round
                           @click="predictModel(x)">Predict</el-button>
              </div>
              <div class="text item">
                create time：{{x.createTime}}
              </div>
              <div class="text item">
                creator：{{x.username}}
              </div>
              <div class="text item">
                description：{{x.description}}
              </div>
              <div>
                <el-divider></el-divider>
                <el-link :href="'http://localhost:8085/model/download/'+username+'/model/'+x.modelName+'.zip'"
                         target="_blank"
                         :underline="false"
                         style="padding: 5px">
                  <el-button @click="downloadModel(x)"
                             style="padding: 5px"
                             type="primary"
                             size="mini">download</el-button>
                </el-link>
                <el-button @click="deleteModel(x)"
                           style="padding: 5px"
                           type="danger"
                           size="mini">delete</el-button>
              </div>
            </el-card>
          </transition>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            class="grid">
      <el-col v-for="x in  modelList.slice(3,6)"
              :key="x"
              :span="8">
        <div class="grid-content bg-purple">
          <transition name="el-fade-in-linear">
            <el-card class="box-card"
                     shadow="hover">
              <div slot="header"
                   class="clearfix">
                <span style="line-height: 28px; ">{{ x.modelName |ellipsis}}</span>
                <el-divider direction="vertical"></el-divider>
                <el-button type="success"
                           size="small"
                           style="float:right;"
                           round
                           @click="predictModel(x)">Predict</el-button>
              </div>
              <div class="text item">
                create time：{{x.createTimr}}
              </div>
              <div class="text item">
                creator：{{x.username}}
              </div>
              <div class="text item">
                description：{{x.description}}
              </div>
              <div>
                <el-divider></el-divider>
                <el-link :href="'http://localhost:8085/model/download/'+username+'/model/'+x.modelName+'.zip'"
                         target="_blank"
                         :underline="false"
                         style="padding: 5px">
                  <el-button @click="downloadModel(x)"
                             style="padding: 5px"
                             type="primary"
                             size="mini">download</el-button>
                </el-link>
                <el-button @click="deleteModel(x)"
                           style="padding: 5px"
                           type="danger"
                           size="mini">delete</el-button>
              </div>
            </el-card>
          </transition>
        </div>
      </el-col>
    </el-row>
    <el-pagination @current-change="handleCurrentChange"
                   :hide-on-single-page="false"
                   :current-page.sync="currentPage"
                   :page-size="6"
                   layout="prev, pager, next, jumper"
                   :total="totalSize">
    </el-pagination>
    <el-dialog title="Update File"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <div class="item"
           style="font-size: 16px; color: #606266;">Select a file to update</div>
      <div>
        <el-select v-model="selectVal"
                   placeholder="请选择">
          <el-option v-for="item in fileList"
                     :key="item"
                     :label="iteml"
                     :value="item">
          </el-option>
        </el-select>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'trainingModel',
  data () {
    return {
      tableData: [],
      fileList: ['ac.txt', 'uc.csv', 'enc.txt'],
      currentPage: 1,
      dialogVisible: false,
      totalSize: 0,
      modelList: [],
      searchItem: '',
      searchList: [],
      selectVal: '',
      username: 'cyy',
      loading: false
    }
  },
  filters: {
    ellipsis (val) {
      if (!val) return ''
      if (val.length > 8) {
        return val.slice(0, 8) + '...'
      }
      return val
    }
  },
  mounted () {
    var that = this
    that.loading = true
    that.$axios.get('/meta/model/cyy').then(response => {
      that.$forceUpdate()
      console.log(response.data)
      var receiveTable = response.data
      for (var i = 0; i < receiveTable.length; ++i) {
        if (receiveTable[i].status !== 1) {
          that.tableData.push(receiveTable[i])
        }
      }
      console.log(that.tableData.length)
      for (i = 0; i < 6 && i < that.tableData.length; ++i) {
        that.modelList.push(that.tableData[i])
      }
      that.totalSize = that.tableData.length
      that.loading = false
    })
  },
  methods: {
    predictModel () {
      this.dialogVisible = true
    },
    deleteModel (val) {
      var that = this
      this.loading = true
      this.$axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: '/meta/model_delete',
        data: val.modelId
      }).then(response => {
        this.$message({
          message: 'delete successfully',
          type: 'success'
        })
        that.tableData.splice(that.modelList.indexOf(val), 1)
        that.modelList = []
        for (var i = 0; i < 6 && i < that.tableData.length; ++i) {
          that.modelList.push(that.tableData[i])
        }
        that.totalSize = that.tableData.length
        that.currentPage = 1
        this.loading = false
      })
    },
    downloadModel (val) {
      this.$axios.get('/boot/model/download/' + this.username + '/model/' + val.pipelineName + '.zip')
    },
    handleCurrentChange (val) {
      console.log(val)
      this.$forceUpdate()
      this.currentPage = val
      if (this.searchList.length === 0) {
        this.modelList = this.tableData.slice(6 * this.currentPage - 6, 6 * this.currentPage)
      } else {
        this.modelList = this.searchList.slice(6 * this.currentPage - 6, 6 * this.currentPage)
      }
    },
    handleInput () {
      if (this.searchItem === '') {
        this.$forceUpdate()
        this.totalSize = this.tableData.length
        this.currentPage = 1
        this.modelList = this.tableData.slice(6 * this.currentPage - 6, 6 * this.currentPage)
      } else {
        this.$forceUpdate()
        this.searchList = []
        for (var item in this.tableData) {
          if (this.tableData[item].modelName.indexOf(this.searchItem) !== -1) {
            this.searchList.push(this.tableData[item])
          }
        }
        this.$forceUpdate()
        this.currentPage = 1
        this.totalSize = this.searchList.length
        this.modelList = this.searchList.slice(this.currentPage * 6 - 6, this.currentPage * 6)
      }
    },
    refresh () {
      var that = this
      that.loading = true
      that.$axios.get('/meta/model/cyy').then(response => {
        that.$forceUpdate()
        that.modelList = []
        console.log(response.data)
        that.tableData = []
        var receiveTable = response.data
        for (var i = 0; i < receiveTable.length; ++i) {
          if (receiveTable[i].status !== 1) {
            that.tableData.push(receiveTable[i])
          }
        }
        console.log(that.tableData.length)
        for (i = 0; i < 6 && i < that.tableData.length; ++i) {
          that.modelList.push(that.tableData[i])
        }
        that.totalSize = that.tableData.length
        that.loading = false
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 12px;
  text-align: left;
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
</style>
