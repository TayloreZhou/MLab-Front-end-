<template>
  <div id="global-uploader">

    <!--
            上传
            -->
    <uploader ref="uploader"
              :options="options"
              :autoStart="false"
              :file-status-text="statusText"
              @file-added="onFileAdded"
              @file-complete="onFileComplete"
              @file-progress="onFileProgress"
              @file-error="onFileError"
              class="uploader-app">
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn id="global-uploader-btn"
                    :single="true"
                    :attrs="attrs"
                    ref="uploadBtn">选择文件</uploader-btn>

      <uploader-list v-show="panelShow">
        <div class="file-panel"
             slot-scope="props"
             :class="{'collapse': collapse}">
          <div class="file-title">
            <el-row style="width: 100%">
              <el-col :span="5">
                <p><strong>File List</strong></p>
              </el-col>

              <el-col class="operate"
                      :offset="14"
                      :span="5">
                <el-button style="margin-top: 10px"
                           :icon="collapse ? 'el-icon-arrow-up': 'el-icon-arrow-down'"
                           @click="fileListShow"
                           type="text"
                           :title="collapse ? '展开':'折叠' ">
                </el-button>
                <el-button style="margin-top: 10px"
                           @click="close"
                           type="text"
                           title="关闭"
                           icon="el-icon-close">
                </el-button>
              </el-col>
            </el-row>
          </div>

          <ul class="file-list">
            <li v-for="file in props.fileList"
                :key="file.id">
              <uploader-file :class="'file_' + file.id"
                             ref="files"
                             :file="file"
                             :list="true"
                             :value="0"></uploader-file>
            </li>
          </ul>
        </div>
      </uploader-list>

    </uploader>

  </div>
</template>

<script>
import { ACCEPT_CONFIG } from '../assets/js/config'
import $ from 'jquery'
export default {
  name: 'myUploader',
  data () {
    return {
      datasetId: 0,
      options: {
        target: '/server/data-service/chunk',
        chunkSize: '20480',
        maxChunkRetries: 1,
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
      collapse: false
    }
  },
  methods: {
    myUpload () {
      $('#global-uploader-btn').click()
    },
    onFileAdded (file) {
      this.$msgbox({
        title: 'Please input description',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        data: this.dataInfo,
        message: <div>
          <span>Description </span><input ref="description"></input>
          <label>Is Public <input class="mui-switch mui-switch-anim" type="checkbox" ref="isPublic" /></label>
        </div>
      }).then(() => {
        var isP = false
        if (this.$refs.isPublic.value === 'on') {
          isP = 1
        }
        this.$axios({
          method: 'post',
          url: '/server/metadata-service/dataset',
          data: {
            'username': localStorage.getItem('username'),
            'datasetName': file.name.split('.')[0],
            'description': this.$refs.description.value,
            'format': file.name.split('.').pop(),
            'size': file.size,
            'isPublic': isP
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          file.uniqueIdentifier = response.data.msg
          this.panelShow = true
        })
      }).catch(() => {
        this.$message({
          type: 'Error',
          message: 'Open File Failed'
        })
      })
    },
    complete () {
      this.$message({
        type: 'Info',
        message: 'Upload success'
      })
    },
    onFileComplete (rootFile) {
      this.$axios({
        url: '/server/data-service/merge',
        method: 'post',
        params: {
          'identifier': rootFile.uniqueIdentifier,
          'totalChunkNum': rootFile.chunks.length
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
  right: 0px;
  bottom: 0px;
  .uploader-app {
    width: 500px;
  }
  .file-panel {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 7px 7px 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
        background-color: #e7ecf2;
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
  .uploader-file-icon {
    &:before {
      content: "" !important;
    }
    &[icon="image"] {
      background: url(../assets/images/icon/image-icon.png);
    }
    &[icon="video"] {
      background: url(../assets/images/icon/video-icon.png);
    }
    &[icon="document"] {
      background: url(../assets/images/icon/text-icon.png);
    }
  }
  .uploader-file-actions > span {
    margin-right: 6px;
  }
}
/* 隐藏上传按钮 */
#global-uploader-btn {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
label {
  display: block;
  vertical-align: middle;
  margin-top: 1ch;
}
label,
input,
select {
  vertical-align: middle;
}
.mui-switch {
  width: 52px;
  height: 31px;
  position: relative;
  border: 1px solid #dfdfdf;
  background-color: #fdfdfd;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
}
.mui-switch:before {
  content: "";
  width: 29px;
  height: 29px;
  position: absolute;
  top: 0px;
  left: 0;
  border-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.mui-switch:checked {
  border-color: #64bd63;
  box-shadow: #64bd63 0 0 0 16px inset;
  background-color: #64bd63;
}
.mui-switch:checked:before {
  left: 21px;
}
.mui-switch.mui-switch-animbg {
  transition: background-color ease 0.4s;
}
.mui-switch.mui-switch-animbg:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-animbg:checked {
  box-shadow: #dfdfdf 0 0 0 0 inset;
  background-color: #64bd63;
  transition: border-color 0.4s, background-color ease 0.4s;
}
.mui-switch.mui-switch-animbg:checked:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-anim {
  transition: border cubic-bezier(0, 0, 0, 1) 0.4s,
    box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
}
.mui-switch.mui-switch-anim:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-anim:checked {
  box-shadow: #64bd63 0 0 0 16px inset;
  background-color: #64bd63;
  transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
}
.mui-switch.mui-switch-anim:checked:before {
  transition: left 0.3s;
}
input {
  border: 1px solid #ccc;
  padding: 7px 0px;
  border-radius: 3px;
  padding-left: 5px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}
</style>
