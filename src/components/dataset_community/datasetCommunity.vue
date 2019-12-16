<template>
  <div>
    <el-divider content-position="right">My lab, machine lab.</el-divider>
    <el-container>
      <el-container class="wrap">
        <el-header class="header"
                   height="10px">
          <el-row>
            <el-col :span=4
                    :offset=1>
              <el-radio-group v-model="radioOrder"
                              @change="handleRadioChange">
                <el-radio-button label="latest">latest</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="main"
                 v-loading="loading">
          <ul>
            <dataset v-for=" dataset in datasets"
                  :key="dataset.datasetId"
                  :datasetData="dataset"></dataset>
          </ul>
          <el-pagination :key="pageshow"
                         @current-change="handleCurrentChange"
                         :page-size="pageSize"
                         :page-count="pages"
                         :current-page.sync="currentPage"></el-pagination>
        </el-main>
      </el-container>
      <el-aside class="usercard">
        <el-card>
          <div slot="header">
            <el-avatar :size="150"
                       :src="userInfo.avatar"></el-avatar>
          </div>
          <div>
            <a>{{userInfo.username}}</a></div>
          <div>
            <a>{{userInfo.email}}</a></div>
          <div><a>{{userInfo.likeNum}} like</a></div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import Dataset from './dataset'

export default {
  name: 'datasetCommunity',
  components: {
    Dataset,
    post: Post
  },
  data () {
    return {
      msg: '主页',
      datasets: null,
      loading: true,
      radioOrder: 'latest',
      pageSize: 10,
      pages: 0,
      currentPage: 1,
      pageshow: true,
      userInfo: {
        username: '',
        avatar: '',
        email: '',
        likeNum: 0
      }
    }
  },
  created: function () {
    // 默认获取最热信息

    this.searchInput = this.$route.query.searchInput
    this.userInfo.username = localStorage.getItem('username')
    this.$axios({
      method: 'get',
      url: '/server/community-service/user/'+localStorage.getItem('username'),
    }).then((response) => {
      console.log(response.data)
      this.userInfo.email = response.data.email
      this.userInfo.likeNum = response.data.likeNum
      this.userInfo.avatar = response.data.avatarUrl
    })
    this.getList(1)
    this.getLatestList(this.currentPage)
  },
  methods: {
    handleRadioChange () {
      this.currentPage = 1
      this.getList(1)
      this.pageshow = false
      this.$nextTick(() => {
        this.pageshow = true
      })
    },
    getList (pageNum) {
      if (this.radioOrder === 'hot') {
        this.loading = false
      } else if (this.radioOrder === 'latest') {
        this.loading = false
      }
      console.log('get' + this.curretPage)
    },
    getLatestList (pageNum) {
      // 获取最新主题下的信息
      this.$axios
        .get('/server/metadata-service/dataset_search/' + pageNum + '/' + this.pageSize)
        .then(response => {
          console.log('latest list\n')
          console.log(response.data)
          this.datasets = response.data.list
          this.loading = false
          this.pages = response.data.pages
          this.currentPage = response.data.pageNum
        })
        .catch(error => {
          console.log(error)
        })
    },
    handlePostDetail () {
      // window.location.href = item.url
    },
    handleNode () {
      // window.location.href = this.item.node.url
    },
    changeLargeAvatar (url) {
      console.log('传入的url' + url)
      let newURL = url.replace('/mini/g', 'large')
      console.log('新的url' + newURL)
    },
    handleCurrentChange (val) {
      this.getLatestList(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .wrap {
    width: 1000px;
    margin: 0 auto;
    height: auto;
  }
  .main {
    width: auto;
    margin-top: 30px;
    min-height: 500px;
  }
  .header {
    position: relative;
  }
  .logo {
    width: 94px;
    height: 30px;
    /* margin-top: 25px;
    margin-left: 80px; */
    position: absolute;
    top: 25px;
    left: 100px;
    background: url("../../assets/images/v2ex.png") no-repeat;
    background-size: 94px 30px;
  }
  .nav {
    width: auto;
    position: absolute;
    bottom: 0;
    left: 100px;
  }
  .footer {
    position: relative;
  }
  .copyright {
    position: absolute;
    left: 100px;
  }
  .slogan {
    position: absolute;
    left: 100px;
    top: 30px;
    color: gray;
  }
  .usercard {
    margin-top: 50px;
  }
</style>
