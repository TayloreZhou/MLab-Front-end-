<template>
  <div class="container"
       :style="{minHeight: minHeight + 'px'}">
    <el-container>
      <el-header>
        <el-row>
          <el-col :offset=1
                  :span=4>
            <div><img src="../assets/185-43-hor.png"
                   alt="Mlab" /></div>
          </el-col>
          <el-col :span=8
                  :offset=4>
            <div style="margin-top: 10px;">
              <el-input placeholder="请输入内容"
                        v-model="searchInput"
                        class="input-with-select">
                <el-select v-model="select"
                           slot="prepend"
                           style="width: 100px"
                           placeholder="post">
                  <el-option label="post"
                             value="1"></el-option>
                  <el-option label="dataset"
                             value="2"></el-option>
                </el-select>
                <el-button slot="append"
                           @click="search"
                           icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span=1>
            <div style="margin-top: 15px">
              <el-link href="/canvas">主页</el-link>
            </div>
          </el-col>
          <el-col :span=1>
            <div style="margin-top: 15px">
              <el-link href="/society">社区</el-link>
            </div>
          </el-col>
          <el-col :span=2>
            <div style="margin-top: 15px">
              <el-dropdown>
                <span class="el-dropdown-link">
                  我的信息<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus"
                                    @click.native="myInfo">我的信息</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus"
                                    @click.native="myJob">我的作业</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus"
                                    @click.native="myPost">我的作业</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline"
                                    @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <el-col :span=2>
            <div class="block">
              <el-avatar :size="50"
                         :src="circleUrl"></el-avatar>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-row>
        <router-view></router-view>
      </el-row>
      <el-divider content-position="left">My lab, machine lab.</el-divider>
      <el-footer>
        <el-row type="flex"
                justify="center">
          <el-col :span=4
                  style="vertical-align: middle">
            <div style="color: rgba(0,0,0,0.6);">
              Made In China
            </div>
            <div style="color: rgba(0,0,0,0.6);">
              CopyRight© 2019 2 30
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      searchInput: '',
      select: 'post',
      minHeight: 0,
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  mounted () {
    this.minHeight = document.documentElement.clientHeight - 170
    var that = this
    window.onresize = function () {
      that.minHeight = document.documentElement.clientHeight - 170
    }
  },
  methods: {
    myInfo () {
      this.$router.push({ path: '/canvas' })
    },
    logout () {
      this.$router.push({ path: '/login' })
    },
    myJob () {
      this.$router.push({ path: '/joblist' })
    },
    search () {
      if (this.searchInput === '') {
        this.$message({
          showClose: true,
          type: 'warning',
          message: 'The content of search cannot be null!'
        })
      } else {
        console.log(this.searchInput)
        this.$router.push({
          path: '/society',
          query: {
            searchInput: this.searchInput
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 1200px;
  margin: auto;
}
.el-select .el-input {
  width: 50px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
  width: 50px;
}
</style>
