<template>
  <div class="container">
    <el-container>
      <el-header>
        <el-row>
          <el-col offset="1" span="4">
            <div><img src="../assets/185-43-hor.png" alt="Mlab"/></div>
          </el-col>
          <el-col span="2" offset="11">
            <div style="margin-top: 15px"><el-link href="/society">社区</el-link></div>
          </el-col>
          <el-col span="2">
            <div style="margin-top: 15px"><el-link href="/canvas">主页</el-link></div>
          </el-col>
          <el-col span="2">
            <div style="margin-top: 15px">
              <el-dropdown>
                <span class="el-dropdown-link">
                  我的信息<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-user" @click.native="myInfo">我的信息</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-box" @click.native="modeList">我的模型</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-s-order" @click.native="myJob">训练列表</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-s-order" @click.native="myPost">预测列表</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-close" @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <el-col span="2">
            <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
          </el-col>
        </el-row>
      </el-header>
      <el-row>
        <router-view></router-view>
      </el-row>
      <el-divider content-position="left">My lab, machine lab.</el-divider>
      <el-footer>
        <el-row type="flex" justify="center">
          <el-col span="4" style="vertical-align: middle">
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
  methods: {
    myInfo () {
      this.$router.push({path: '/canvas'})
    },
    logout () {
      this.$router.push({path: '/login'})
    },
    myJob () {
      this.$router.push({path: '/joblist'})
    },
    modeList () {
      this.$router.push({path: '/modellist'})
    }
  }
}
</script>

<style scoped>
.container{
  width: 1200px;
  margin: auto;
}
</style>
