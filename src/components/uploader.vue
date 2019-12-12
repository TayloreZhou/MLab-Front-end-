<template>
  <div id="global-uploader">
    <el-button type="primary" @click="myUpload"></el-button>
    <!-- 上传 -->
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="false"
      :file-status-text="statusText"
      @file-added="onFileAdded"
      @file-complete="onFileComplete"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      class="uploader-app">
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn id="global-uploader-btn" :single="true" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>

      <uploader-list v-show="panelShow">
        <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
          <div class="file-title">
            <h2>文件列表</h2>
            <div class="operate">
              <el-button :icon="collapse ? 'el-icon-arrow-up': 'el-icon-arrow-down'" @click="fileListShow" type="text" :title="collapse ? '展开':'折叠' ">
              </el-button>
              <el-button @click="close" type="text" title="关闭" icon="el-icon-close">
              </el-button>
            </div>
          </div>

          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
            </li>
          </ul>
        </div>
      </uploader-list>

    </uploader>

  </div>
</template>

<script>
import {ACCEPT_CONFIG} from '../assets/js/config'
import $ from 'jquery'

export default {
  name: 'myUploader',
  data () {
    return {
      options: {
        target: '/server/data-service/chunk',
        chunkSize: '2048000',
        maxChunkRetries: 3,
        simultaneousUploads: 1,
        testChunks: true
      },
      attrs: {
        accept: ACCEPT_CONFIG.getAll()
      },
      statusText: {
        success: 'Success',
        error: 'Error',
        uploading: 'Uploading',
        paused: 'Pause',
        waiting: 'Waiting'
      },
      panelShow: false, // 选择文件后，展示上传panel
      collapse: false,
      datasetId: 0
    }
  },
  methods: {
    myUpload () {
      $('#global-uploader-btn').click()
    },
    onFileAdded (file) {
      console.log(file)
      this.panelShow = true
      this.$axios({
        method: 'post',
        url: '/server/metadata-service/dataset',
        body: {
          'username': localStorage.getItem('username'),
          'datasetName': file.name.split('.')[0],
          'description': '',
          'format': file.name.split('.').pop(),
          'size': file.size,
          'isPublic': 1
        }
      }).then((response) => {
        this.datasetId = response.data.msg
      })
    },
    // 上传完成
    complete () {
      console.log('complete', arguments)
    },
    // 一个根文件（文件夹）成功上传完成。
    onFileComplete () {
      const file = arguments[0].file
      const chunkSize = 10 * 1024 * 1024
      let chunks = Math.ceil(file.size / chunkSize)
      this.$axios({
        url: '/server/data-service/merge',
        method: 'post',
        params: {
          'datasetId': this.datasetId,
          'chunkNum': chunks
        }
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    },
    onFileError (rootFile, file, response, chunk) {
      this.$message({
        message: response,
        type: 'error'
      })
    },
    onFileProgress (rootFile, file, chunk) {
      console.log(`Uploading ${file.name}, chunk: ${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
    },
    fileListShow () {
      let $list = $('#global-uploader .file-list')
      if ($list.is(':visible')) {
        $list.slideUp()
        this.collapse = true
      } else {
        $list.slideDown()
        this.collapse = false
      }
    },
    close () {
      this.uploader.cancel()
      this.panelShow = false
    }
  },
  computed: {
    // Uploader实例
    uploader () {
      return this.$refs.uploader.uploader
    }
  }
}
</script>

<style scoped lang="scss">
  #global-uploader {
    position: fixed;
    z-index: 20;
    right: 15px;
    bottom: 200px;

    .uploader-app {
      width: 1000px;
    }

    .file-panel {
      background-color: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 7px 7px 0 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);

      .file-title {
        display: flex;
        border-bottom: 1px solid #ddd;

        .operate {
          text-align: center;
          vertical-align: middle;
          .center-button {
            margin: 10px auto;
            font-size: 1.5em;
          }
        }
      }

      .file-list {
        position: relative;
        height: 240px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;

        > li {
          background-color: #fff;
        }
      }

      &.collapse {
        .file-title {
          background-color: #E7ECF2;
        }
      }
    }

    .no-file {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
    }

    /deep/.uploader-file-icon {
      &:before {
        content: '' !important;
      }

      &[icon=image] {
        background: url(../assets/images/icon/image-icon.png);
      }
      &[icon=video] {
        background: url(../assets/images/icon/video-icon.png);
      }
      &[icon=document] {
        background: url(../assets/images/icon/text-icon.png);
      }
    }

    /deep/.uploader-file-actions > span {
      margin-right: 6px;
    }
  }

  /* 隐藏上传按钮 */
  #global-uploader-btn {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
</style>
