<template>
  <el-row style="margin-top: 40px">
    <el-col span="1" :height="300">
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col offset="3" span="4">
      <avatar ref="userInfoAvatar"></avatar>
    </el-col>
    <el-col span="8" offset="6" style="margin-top: 40px">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="UserName">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="LikeNum" disabled>
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleSubmit">Submit</el-button>
    </el-col>
  </el-row>
</template>

<script>
import Avatar from './Avatar'
export default {
  name: 'userInfo',
  components: {Avatar},
  mounted () {
  },
  computed: {
    getUsername () {
      return this.$store.getters.getUsername
    }
  },
  data () {
    return {
      username: this.$store.getters.getUsername
    }
  },
  methods: {
    handleSubmit () {
      console.log(this.$store.getters.getUsername)
    }
  }
}
</script>

<style scoped>

</style>
