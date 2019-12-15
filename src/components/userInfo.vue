<template>

  <el-row style="margin-top: 40px">
    <el-col :span="1"
            :height="300">
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
    <el-col :offset="3"
            :span="4">
      <avatar ref="userInfoAvatar"></avatar>
    </el-col>
    <el-col :span="8"
            :offset="6"
            style="margin-top: 40px">
      <el-form label-position="left"
               label-width="80px">
        <el-form-item label="UserName">
            {{username}}
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="email"></el-input>
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
  components: { Avatar },
  mounted () {
    this.$axios.get('/server/user-service/user/info/' + localStorage.getItem('username'))
      .then((response) => {
        console.log(response)
        this.email = response.data.email
      }).catch((error) => {
        console.log(error)
      })
  },
  computed: {
    getUsername () {
      return this.$store.getters.getUsername
    }
  },
  data () {
    return {
      username: localStorage.getItem('username'),
      email: ''
    }
  },
  methods: {
    handleSubmit () {
      this.$axios.post('/server/user-service/user/update', {
        username: this.username,
        oPassword: '',
        password: '',
        email: '',
        avatarUrl: this.$refs.userInfoAvatar.imageUrl
      }).then((response) => {
        console.log(response)
        this.$message(response.data.msg)
        this.$axios.get('/server/user-service/user/info/' + localStorage.getItem('username'))
          .then((response) => {
            console.log(response)
            this.email = response.data.email
          }).catch((error) => {
            console.log(error)
          })
      })
    }
  }
}
</script>

<style scoped>
</style>
