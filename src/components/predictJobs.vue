<template>
  <el-table :data="tableData"
            style="width: 100%; ">
    <el-table-column label="日期"
                     width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="作业号"
                     width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover"
                    placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="状态"
                     width="180">
      <template slot-scope="scope">
        <el-button :type="miStatusColor(scope.row.state)">{{scope.row.state}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini"
                   @click="handleEdit(scope.$index, scope.row)">下载</el-button>
        <el-button size="mini"
                   type="danger"
                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'trainedModel',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        state: '执行中',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        state: '已完成',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        state: '已完成',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        state: '执行中',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
      if (status === '已完成') {
        return 'success'
      } else if (status === '执行中') {
        return 'warning'
      } else if (status === '已取消') {
        return 'info'
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
</style>
