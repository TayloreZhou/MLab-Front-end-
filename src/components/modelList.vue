<template>
  <el-container>
    <el-header>
      <el-divider></el-divider>
    </el-header>
    <el-container>
      <el-aside style="text-align: left"
                width="200px">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 router>
          <el-menu-item index="/modellist/pipeline">
            <i class="el-icon-menu"></i>
            <span slot="title">PipeLine List</span>
          </el-menu-item>
          <el-menu-item index="/modellist/train">
            <i class="el-icon-menu"></i>
            <span slot="title">Training Jobs</span>
          </el-menu-item>
          <el-menu-item index="/modellist/model">
            <i class="el-icon-menu"></i>
            <span slot="title">Model List</span>
          </el-menu-item>
          <el-menu-item index="/modellist/predict">
            <i class="el-icon-menu"></i>
            <span slot="title">Predict Jobs</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="min-height:250px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'modelList',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄'
      }],
      modelName: 'abc',
      currentPage: 1
    }
  },
  methods: {
    editModel () {
      this.$router.push({
        path: '/canvas'
      })
    },
    trainModel () {
    },
    deleteModel () {
    },
    handleCurrentChange (val) {
      console.log(val)
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
  padding: 30px 0;
}
</style>
