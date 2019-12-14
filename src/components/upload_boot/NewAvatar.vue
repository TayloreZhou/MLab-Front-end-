<template>
  <section>
    <img v-if="!progressFlag" class="head-img" :src="imageUrl" />
    <div v-show="progressFlag" class="head-img">
      <el-progress type="circle" :percentage="progressPercent"></el-progress>
    </div>
    <el-upload class="img-btn" action="#"
               :show-file-list="false"  :before-upload="beforeAvatarUpload"
               :http-request="uploadImg">
      <el-button type="success" plain round size="mini">更改头像</el-button></el-upload>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NewAvatar',
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    uploadImg (f) {
      console.log(f)
      this.progressFlag = true
      let formdata = new FormData()
      formdata.append('image', f.file)
      axios({
        url: '/image',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'xTFGpSlN7c6kTofNWEATB2p2cB96BD18'
        },
        onUploadProgress: progressEvent => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
        }
      }).then(res => {
        this.imageUrl = res.data.data
        if (this.progressPercent === 100) {
          this.progressFlag = false
          this.progressPercent = 0
        }
      }).then(error => {
        console.log(error)
      })
    },
    // 上传图片前的过滤
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = (file.size / 1024 / 1024) < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>

</style>
