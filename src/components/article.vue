<template>
  <div>
    <el-row>
      <el-col>
        <el-divider content-position="right">My lab, machine lab.</el-divider>
      </el-col>
    </el-row>
    <h3>Create new post</h3>
    <mavon-editor ref=mde v-model="value" language="en" @imgAdd="$imgAdd"></mavon-editor>
    <el-row type="flex" style="margin-top: 20px">
      <el-col :span="10" :offset="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Submit</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      value: '',
      form: {
      }
    }
  },
  methods: {
    $imgAdd (pos, $file) {
      var formdata = new FormData()
      formdata.append('smfile', $file)
      axios({
        method: 'post',
        url: '/image',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'ZNtF4YN9va6lBsSKpg31PKlkOCZIcEsC'
        },
        data: formdata
      }).then((response) => {
        console.log(response)
        if (response.data['success']) {
          this.$refs.mde.$img2Url(pos, response.data['data']['url'])
        } else {
          // repeat upload
          this.$refs.mde.$img2Url(pos, response.data['images'])
        }
      })
    },
    onSubmit () {
      axios({
        method: 'post',
        url: '/server/community-service/post/publish',
        data: {
          username: localStorage.getItem('username'),
          title: this.value.split('\n')[0],
          content: this.value,
        }
      }).then((response) => {
        this.$router.push('/society')
      })
    }
  }
}
</script>
<style>
</style>
