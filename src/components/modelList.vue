<template>
  <el-container>
    <el-header><el-divider></el-divider></el-header>
    <el-container>
      <el-aside style="text-align: left" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router>
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">All Models</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">Untrained Models</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">Training Models</span>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">Trained Models</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    <el-main>
    <el-row v-for="o in Math.ceil(tableData.length/3)" :key="o" :gutter="20" class="grid">
      <el-col v-for="x in 3" :key="x" :span="8" ><div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="line-height: 28px;">{{modelName}}</span>
              <el-button style="float: right; padding: 5px" type="primary" size="mini">training</el-button>
              <el-button style="float: right; padding: 5px" type="success" size="mini">edit</el-button>
            </div>
            <div class="text item">
              create time：
            </div>
            <div class="text item">
              creator：
            </div>
            <div class="text item">
              description：
            </div>
            <div class="text item">
              status：
            </div>
          </el-card>
        </div></el-col>
    </el-row>
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
      modelName: 'abc'
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 12px;
  text-align: left;
}

.item {
  padding: 10px 0;
  float: left;
  width: 60%;
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
