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
          <span style="margin-left: 10px">{{$moment(scope.row.createTime).format('YYYY-MM-DD HH:mm')}}</span>
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
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="DatasetId">
          {{form.datasetId}}
        </el-form-item>
        <el-form-item label="Owner">
          {{form.username}}
        </el-form-item>
        <el-form-item label="CreateTime">
          {{$moment(form.createTime).format('YYYY-MM-DD HH:mm')}}
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
      dataset: [],
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
      pages: 0,
      currentPage: 1,
      hasNextPage: false,
      pageshow: true,
      datasetName: ''
    }
  },
  mounted () {
    this.$axios.get('/server/metadata-service/dataset/' + 'admin' + '/' + this.currentPage + '/' + this.pageSize)
      .then((response) => {
        console.log(response)
        this.pages = response.data.pages
        this.hasNextPage = response.data.hasNextPage
        this.dataset = response.data.list
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    getPages () {
    },
    handleDownload (index, row) {
      this.form = Object.assign({}, row)
      console.log(this.form)
      this.dialogFormVisible = true
    },
    handleEdit (index, row) {
      this.form = Object.assign({}, row)
      if (this.form.isPublic === 1) {
        this.form.isPublic = true
      } else {
        this.form.isPublic = false
      }
      console.log(this.form)
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      var deleteId = row.datasetId
      this.$confirm('This operation will permanently delete this file. Do you want to continue?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'Deleting...'
            this.$axios
              .post('/server/metadata-service/dataset_delete', { deleteId })
              .then((response) => {
                if (response.status === 200) {
                  this.$message({
                    type: 'success',
                    message: 'Delete successfully!'
                  })
                  this.getCurrentPage(1, this.pageSize)
                } else {
                  this.$message.error({
                    message: 'Delete failure!'
                  })
                }
                instance.confirmButtonLoading = false
                done()
              }).catch((error) => {
                console.log(error)
                instance.confirmButtonLoading = false
                done()
              })
          } else {
            done()
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      this.getCurrentPage(val, this.pageSize)
    },
    handleSubmit () {
      if (this.form.isPublic === true) {
        this.form.isPublic = 1
      } else {
        this.form.isPublic = 0
      }
      console.log(this.form)
      this.$axios.post('/server/metadata-service/edit_dataset', {
        datasetId: this.form.datasetId,
        description: this.form.description,
        isPublic: this.form.isPublic
      })
        .then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      this.dialogFormVisible = false
      setTimeout(() => { this.getCurrentPage(this.currentPage, this.pageSize) }, 1000)
    },
    getCurrentPage (currentPage, pageSize) {
      this.$axios.get('/server/metadata-service/dataset/' + 'admin' + '/' + currentPage + '/' + pageSize)
        .then((response) => {
          console.log(response)
          this.pages = response.data.pages
          this.hasNextPage = response.data.hasNextPage
          this.currentPage = response.data.pageNum
          this.dataset = response.data.list
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
