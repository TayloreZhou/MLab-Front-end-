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
                <span style="line-height: 28px; max-width: 30px">{{ x.modelname |ellipsis}}</span>
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary"
                           size="small"
                           style="float:right;"
                           round
                           @click="trainModel(x)">Train</el-button>
              </div>
              <div class="text item">
                create time：{{x.date}}
              </div>
              <div class="text item">
                creator：{{x.name}}
              </div>
              <div class="text item">
                description：{{x.description}}
              </div>
              <div>
                <el-divider></el-divider>
                <el-button @click="trainModel"
                           style="padding: 5px"
                           type="primary"
                           size="mini">download</el-button>
                <el-button @click="editModel"
                           style="padding: 5px"
                           type="success"
                           size="mini">edit</el-button>
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
                <span style="line-height: 28px; ">{{ x.modelname |ellipsis}}</span>
                <el-divider direction="vertical"></el-divider>
                <el-button type="primary"
                           size="small"
                           style="float:right;"
                           round
                           @click="trainModel(x)">Train</el-button>
              </div>
              <div class="text item">
                create time：{{x.date}}
              </div>
              <div class="text item">
                creator：{{x.name}}
              </div>
              <div class="text item">
                description：{{x.description}}
              </div>
              <div>
                <el-divider></el-divider>
                <el-button @click="trainModel"
                           style="padding: 5px"
                           type="primary"
                           size="mini">download</el-button>
                <el-button @click="editModel"
                           style="padding: 5px"
                           type="success"
                           size="mini">edit</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'allModel',
  data () {
    return {
      tableData: [{
        modelname: 'Pipelineeeeeeeeeeee',
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄',
        status: 0
      },
      {
        modelname: 'abc',
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        modelname: 'abc',
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        modelname: 'abc',
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        modelname: 'abc',
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        modelname: 'abc',
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        modelname: 'abc',
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      }],
      currentPage: 1,
      totalSize: 0,
      modelList: [],
      searchItem: '',
      searchList: []
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
    that.$forceUpdate()
    for (var i = 0; i < 6 && i < that.tableData.length; ++i) {
      that.modelList.push(that.tableData[i])
    }
    that.totalSize = that.tableData.length
  },
  methods: {
    trainModel (val) {
      this.$message({
        message: 'begin training ' + val.modelname,
        type: 'success'
      })
    },
    editModel () {
      this.$router.push({
        path: '/canvas'
      })
    },
    deleteModel (val) {
      console.log(val)
      var index = this.tableData.indexOf(val)
      this.$forceUpdate()
      this.tableData.splice(index, 1)
      this.totalSize = this.tableData.length
      this.modelList = this.tableData.slice(6 * this.currentPage - 6, 6 * this.currentPage)
      this.$message({
        message: 'delete ' + val.modelname + ' successfully',
        type: 'success'
      })
    },
    createModel () {
      this.$router.push({
        path: '/canvas'
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.$forceUpdate()
      this.currentPage = val
      this.modelList = this.tableData.slice(6 * this.currentPage - 6, 6 * this.currentPage)
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
          if (this.tableData[item].modelname.indexOf(this.searchItem) !== -1) {
            this.searchList.push(this.tableData[item])
          }
        }
        this.$forceUpdate()
        this.currentPage = 1
        this.totalSize = this.searchList.length
        this.modelList = this.searchList.slice(this.currentPage * 6 - 6, this.currentPage * 6)
      }
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
