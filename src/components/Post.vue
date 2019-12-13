<template>
  <el-card shadow="hover"
           class="post">
    <div slot="header"
         class="clearfix">
      <div class="container">
        <div class="post-prview">
          <div>
            <img class="avatar"
                 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                 alt="avatar">
            <a class="author">{{ postData.username }}</a>
          </div>
          <div>
            <a class="post-title"
               @click="handlePostDetail">{{ postData.title }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="description">
      <span>{{ postData.likeNum }} like, {{ postData.commentNum}} comment </span>
      <span style="float: right">{{$moment(postData.createTime).format('YYYY-MM-DD HH:MM')}}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'post',
  props: ['postData'],
  data () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
    handlePostDetail () {
      this.$router.push({
        path: '/society/detail/',
        query: {
          postId: this.postData.postId
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
