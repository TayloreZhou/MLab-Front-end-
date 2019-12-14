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
                <el-radio-button label="hot">hot</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span=4
                    :offset=15>
              <el-button type="primary"
                         @click="gotoLink">Create Post!</el-button>
              <!-- <el-link href="/society/write">我要发帖</el-link> -->
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
      <el-aside class="usercard">
        <el-card>
          <div slot="header">
            <el-avatar :size="150"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
          <div>
            <a>username</a></div>
          <div>
            <a>email</a></div>
          <div><a>like_num</a></div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
  name: 'home',
  components: {
    post: Post
  },
  data () {
    return {
      msg: '主页',
      posts: {},
      loading: true,
      radioOrder: 'hot',
      pageSize: 5,
      pages: 1,
      currentPage: 1,
      pageshow: true,
      searchInput: '\0'
    }
  },
  created: function () {
    // 默认获取最热信息
    this.searchInput = this.$route.query.searchInput
    console.log(this.$route.query.searchInput)
    this.getList(1)
  },
  watch: {
    $route (to, from) {
      this.$router.go(0)
    }
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
        this.getHotList(pageNum)
      } else if (this.radioOrder === 'latest') {
        this.getLatestList(pageNum)
      }
      console.log('get' + this.curretPage)
    },
    getHotList (pageNum) {
      // 获取热门主题下的信息
      console.log(this.searchInput + ' search')
      this.$axios
        .post('/boot/post/search-order-by-like?page-num=' + pageNum + '&&page-size=' + this.pageSize, {
          searchInput: typeof this.searchInput === 'undefined' ? '' : this.searchInput
        })
        .then(response => {
          console.log('hot list\n')
          console.log(response.data)
          this.posts = response.data.list
          this.loading = false
          this.pages = response.data.pages
          this.currentPage = response.data.pageNum
        })
        .catch(error => {
          console.log(error)
        })
    },
    getLatestList (pageNum) {
      // 获取最新主题下的信息
      this.$axios
        .post('/boot/post/search-order-by-time?page-num=' + pageNum + '&&page-size=' + this.pageSize, {
          searchInput: typeof this.searchInput === 'undefined' ? '' : this.searchInput
        })
        .then(response => {
          console.log('latest list\n')
          console.log(response.data)
          this.posts = response.data.list
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
    gotoLink () {
      this.$router.push('/society/write')
    },
    handleCurrentChange (val) {
      console.log('handle' + this.currentPage)
      this.getList(val)
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
  background: url("../assets/images/v2ex.png") no-repeat;
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
