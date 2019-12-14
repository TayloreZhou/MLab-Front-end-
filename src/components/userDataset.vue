<template>
  <el-row>
    <el-table
      :data="dataset"
      style="width: 100%">
      <el-table-column
        label="createTime"
        width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="datasetName"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>datasetName: {{ scope.row.datasetName }}</p>
            <p>description: {{ scope.row.description }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.datasetName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="public"
        width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.isPublic === 1? 'yes' : 'no' }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="250">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Search keyword"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">delete</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleDownload(scope.$index, scope.row)">download</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :key="pageshow"
                   @current-change="handleCurrentChange"
                   :page-size="pageSize"
                   :page-count="pages"
                   :current-page.sync="currentPage"></el-pagination>
    <el-dialog :title="datasetName" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="DatasetId">
          {{form.datasetId}}
        </el-form-item>
        <el-form-item label="Owner">
          {{form.username}}
        </el-form-item>
        <el-form-item label="CreateTime">
          {{form.createTime}}
        </el-form-item>
        <el-form-item label="Size">
          {{form.size}}
        </el-form-item>
        <el-form-item label="Format">
          {{form.format}}
        </el-form-item>
        <el-form-item label="Public">
          <el-switch v-model="form.isPublic"></el-switch>
        </el-form-item>
        <el-form-item label="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit()">Submit</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: 'userDataset',
  data () {
    return {
      dataset: [
        {
          datasetId: 1,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 2,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 3,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 4,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 5,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 6,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 7,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 8,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 9,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 10,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        }
      ],
      search: '',
      form: {
        datasetId: null,
        username: null,
        datasetName: null,
        description: null,
        format: null,
        size: null,
        createTime: null,
        isPublic: null,
        status: null
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      pageSize: 10,
      pages: 2,
      currentPage: 1,
      pageshow: true,
      datasetName: '',
      dataset2: [
        {
          datasetId: 1,
          username: 'user',
          datasetName: 'B dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 2,
          username: 'user',
          datasetName: 'B dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 3,
          username: 'user',
          datasetName: 'B dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 4,
          username: 'user',
          datasetName: 'B dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 5,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 6,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 7,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 8,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 9,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        },
        {
          datasetId: 10,
          username: 'admin',
          datasetName: 'A dataset',
          description: '这是一个传说中的数据集',
          format: 'txt',
          size: 123.0,
          createTime: '2019-12-13 19:57:15',
          isPublic: 1,
          status: 1
        }
      ]
    }
  },
  methods: {
    handleDownload (index, row) {
      this.form = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    handleEdit (index, row) {
      this.form = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row, row.datasetId)
      this.$confirm('This operation will permanently delete this file. Do you want to continue?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'Deleting...'
            this.$axios
              .post('/boot/model')
              .then((response) => {
                instance.confirmButtonLoading = false
                done()
                this.$message({
                  type: 'success',
                  message: 'Delete successfully!'
                })
              }).catch((error) => {
                console.log(error)
                instance.confirmButtonLoading = false
                done()
                this.$message({
                  type: 'info',
                  message: 'Delete, canceled!'
                })
              })
          } else {
            done()
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete, canceled!'
        })
      })
    },
    handleCurrentChange (val) {
      console.log(val)
      this.dataset = this.dataset2
    },
    handleSubmit () {
      if (this.form.isPublic === true) {
        this.form.isPublic = 1
      } else {
        this.form.isPublic = 0
      }
      console.log(this.form)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
