<template>
  <el-row>
    <el-divider></el-divider>
    <el-col span="6" offset="1">
      <el-row>
        <el-card>
          <div slot="header">
            <el-avatar :size="150"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-button type="text" @click="userInfo">Profile</el-button>
      </el-row>
      <el-row>
        <el-button type="text" @click="posts">Post</el-button>
      </el-row>
      <el-row>
        <el-button type="text" @click="dataset">Dataset</el-button>
      </el-row>
    </el-col>
    <el-col span="16" offset="1">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'userDetail',
  methods: {
    userInfo () {
      this.$router.push({ path: '/userDetail/info' })
    },
    posts () {
      this.$router.push({ path: '/userDetail/posts' })
    },
    dataset () {
      this.$router.push({ path: '/userDetail/dataset' })
    }
  }
}
</script>

<style scoped>

</style>
