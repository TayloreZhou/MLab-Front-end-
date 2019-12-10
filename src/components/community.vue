<template>
  <el-container class="wrap">
    <el-divider content-position="right">My lab, machine lab.</el-divider>
    <el-header class="header"
               height="10px">
      <el-row>
        <el-col :span=4
                :offset=2>
          <el-radio-group v-model="radioOrder"
                          @change="getList">
            <el-radio-button label="latest">latest</el-radio-button>
            <el-radio-button label="hot">hot</el-radio-button>
          </el-radio-group>
          <!-- <el-breadcrumb separator="/" class="nav">
              <el-breadcrumb-item><a @click="getHotList">最热</a></el-breadcrumb-item>
          <el-breadcrumb-item><a @click="getLatestList">最新</a></el-breadcrumb-item>-->
          <!-- <el-breadcrumb-item><a href="/nodes">节点</a></el-breadcrumb-item> -->
          <!-- <el-breadcrumb-item><a href="/">关于</a></el-breadcrumb-item> -->
          <!-- </el-breadcrumb> -->
        </el-col>
        <el-col :span=4
                :offset=13>
          <el-button type="primary"
                     @click="gotoLink">我要发贴</el-button>
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
    </el-main>
    <el-divider content-position="left">My lab, machine lab.</el-divider>
  </el-container>
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
      radioOrder: 'latest'
    }
  },
  created: function () {
    // 默认获取最火信息
    this.getHotList()
  },
  methods: {
    getList () {
      if (this.radioOrder === 'hot') {
        this.getHotList()
      } else if (this.radioOrder === 'latest') {
        this.getLatestList()
      }
    },
    getHotList () {
      // 获取热门主题下的信息
      this.$axios
        .get('/boot/post/get-order-by-like?page-num=1&&page-size=10')
        .then(response => {
          console.log('hot list\n')
          console.log(response.data.list)
          this.posts = response.data['list']
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    getLatestList () {
      // 获取最新主题下的信息
      this.$axios
        .get('/boot/post/get-order-by-time?page-num=1&&page-size=10')
        .then(response => {
          console.log(response.data)
          this.posts = response.data.list
          this.loading = false
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
</style>
