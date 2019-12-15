<template>
  <div>
    <div v-show="progressFlag" class="radius" style="position: absolute;display: block">
      <el-progress :width="220" :height="220" type="circle" :percentage="progressPercent"></el-progress>
    </div>
    <el-card class="radius">
      <el-upload
        class="avatar-uploader"
        style="position: relative"
        action="/image"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-if="plus" class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Avatar',
  data () {
    return {
      imageUrl: '',
      progressPercent: 0,
      progressFlag: false,
      plus: true
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      this.progressFlag = true
      this.plus = false
      const isJPG = file.type === 'image/jpeg' || file.type === 'png'
      const isLt2M = file.size / 1024 / 1024 < 5
      var formdata = new window.FormData()
      formdata.append('smfile', file)
      axios({
        method: 'post',
        url: '/image',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'xTFGpSlN7c6kTofNWEATB2p2cB96BD18'
        },
        data: formdata,
        onUploadProgress: progressEvent => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
        }
      }).then((response) => {
        if (response.status !== 200) {
          this.$message.error('Upload failure!')
        } else if (response.data['success']) {
          this.imageUrl = response.data['data']['url']
          if (this.progressPercent === 100) {
            this.progressFlag = false
            this.progressPercent = 0
          }
        } else {
          console.log(response)
          this.imageUrl = response.data['images']
          if (this.progressPercent === 100) {
            this.progressFlag = false
            this.progressPercent = 0
          }
        }
      })
      return false
    }
  },
  computed: {
    headers () {
      return {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'xTFGpSlN7c6kTofNWEATB2p2cB96BD18'
      }
    }
  }
}
</script>

<style scoped>
  .radius {
    width: 218px;
    height: 218px;
    border-radius: 109px;
    overflow: hidden;
    padding: 0 0 0 0;
  }
  .avatar-uploader .el-upload {
    width: 178px;
    height: 178px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
  }
</style>
