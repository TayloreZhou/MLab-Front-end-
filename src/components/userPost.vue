<template>
  <el-container class="wrap">
    <el-header class="header"
               height="10px">
      <el-row>
        <el-col :span=5
                :offset=1>
          <el-radio-group v-model="radioOrder"
                          @change="handleRadioChange">
            <el-radio-button label="latest">latest</el-radio-button>
            <el-radio-button label="hot">hot</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main"
             v-loading="loading">
      <ul>
        <post v-for=" postData in posts"
              :key="postData.post_id"
              :postData="postData"></post>
      </ul>
      <el-pagination :key="pageshow"
                     @current-change="handleCurrentChange"
                     :page-size="pageSize"
                     :page-count="pages"
                     :current-page.sync="currentPage"></el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'userPost',
  data () {
    return {
      posts: {},
      pageSize: 10,
      pages: 1,
      currentPage: 1,
      pageshow: true
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log('handle' + this.currentPage)
      this.getList(val)
    }
  }
}
</script>

<style scoped>

</style>
