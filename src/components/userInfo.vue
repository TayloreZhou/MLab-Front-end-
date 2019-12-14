<template>
  <el-row>
    <el-col span="8" offset="7" style="margin-top: 40px">
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
export default {
  name: 'userInfo',
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
