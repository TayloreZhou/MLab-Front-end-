<template>
  <el-card shadow="hover"
           class="post">
    <div slot="header"
         class="clearfix">
      <div class="container">
        <div class="post-prview">
          <div>
            <img class="avatar"
                 :src="imagePath"
                 alt="avatar">
            <a class="author">{{ datasetData.username }}</a>
          </div>
          <div>
            <a class="post-title"
               @click="handlePostDetail">{{ datasetData.datasetName }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="description">
      <span>size: {{ datasetData.size }} B, format: {{ datasetData.format}} </span>
      <span style="float: right">{{$moment(datasetData.createTime).format('YYYY-MM-DD HH:MM')}}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'dataset',
  props: ['datasetData'],
  data () {
    return {
      imagePath: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  mounted () {
    if (this.datasetData.avatarUrl === '') {
      this.imagePath = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    } else {
      this.imagePath = this.datasetData.avatarUrl
    }
  },
  methods: {
    handlePostDetail () {
      this.$router.push({
        path: '/dCommunity/detail',
        query: {
          datasetId: this.datasetData.datasetId
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    text-decoration: none;
  }
  .post {
    width: 800px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 8px;
  }
  .post-prview {
    height: 100px;
    position: relative;
  }
  .avatar {
    width: 24px;
    height: 24px;
    float: left;
  }
  .post-title {
    width: 85%;
    padding-top: 5%;
    color: #1a1a1a;
    text-align: left;
    font-size: 24px;
    line-height: 1.6;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    float: left;
  }
  .author {
    padding-left: 10px;
    color: #3293ee;
    float: left;
  }
  .replies-num {
    width: 50px;
    height: 30px;
    margin-right: 18px;
    margin-top: 0px;
    float: right;
  }
  .post-detail {
    text-align: left;
    float: left;
  }
  .node-name {
    margin-top: 4px;
    margin-left: 10px;
  }
  .description {
    text-align: left;
    color: gray;
    padding: 5px;
  }
</style>

<style>
  .post .el-card__body {
    padding: 0;
  }
</style>
