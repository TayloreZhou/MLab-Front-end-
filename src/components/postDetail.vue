<template>
  <div>
    <el-divider content-position="right">My lab, machine lab.</el-divider>
    <el-container>
      <el-container class="wrap"
                    direction="vertical">
        <el-main>
          <el-card direction="horizontal">
            <div slot="header"
                 style="height:20px">
              <el-avatar class="avatar"
                         fit="fill"
                         :src="authorInfo.avatar"></el-avatar>
              <a class="author">{{authorInfo.username}}</a>
            </div>
            <div class="post-detail">
              <a class="post-title">{{postData.title}}</a>
              <a class="post-description">{{$moment(postData.createTime).format('YYYY-MM-DD HH:mm')}}</a>
              <p class="post-content">{{postData.content}}</p>
            </div>
            <div>
              <a class="comment-num">{{postData.commentNum}} comment</a>
              <el-button :icon="likeIcon"
                         :type="likeType"
                         @click="handlePostLike"
                         class="like-button">{{postData.likeNum}} </el-button>
            </div>
            <div>
            </div>
          </el-card>
        </el-main>
        <el-main>
          <div v-clickoutside="hideReplyBtn"
               @click="inputFocus"
               class="my-reply">
            <el-avatar class="header-img"
                       :size="40"
                       :src="userInfo.avatar"></el-avatar>
            <div class="reply-info">
              <div tabindex="0"
                   contenteditable="true"
                   id="commentInput"
                   spellcheck="false"
                   placeholder="输入评论..."
                   class="reply-input"
                   @focus="showReplyBtn"
                   @input="onDivInput($event)">
              </div>
            </div>
            <div class="reply-btn-box"
                 v-show="btnShow">
              <el-button class="reply-btn"
                         size="medium"
                         @click="sendComment"
                         type="primary">发表评论</el-button>
            </div>
          </div>
          <div v-for="(item,i) in comments"
               :key="i"
               class="author-title reply-father">
            <el-avatar class="header-img"
                       :size="40"
                       :src="item.avatarUrl"></el-avatar>
            <div class="author-info">
              <span class="author-name">{{item.username}}</span>
              <span class="author-time">
                {{item.createTime != '刚刚'?$moment(item.createTime).format('YYYY-MM-DD HH:mm'):'刚刚'}}</span>
            </div>
            <div class="icon-btn">
              <span @click="showReplyInput(i)"><i class="iconfont el-icon-s-comment"></i>{{item.replyNum}}</span>
              <i class="iconfont el-icon-caret-top"></i>{{item.likeNum}}
            </div>
            <div class="talk-box">
              <p>
                <span v-html="item.content"
                      class="reply">{{item.content}}</span>
              </p>
            </div>
            <div class="reply-box">
              <div v-for="(reply,j) in item.replies"
                   :key="j"
                   class="author-title">
                <el-avatar class="header-img"
                           :size="40"
                           :src="reply.avatarUrl"></el-avatar>
                <div class="author-info">
                  <span class="author-name">{{reply.username}}</span>
                  <span class="author-time">{{reply.createTime}}</span>
                </div>
                <div class="icon-btn">
                  <!-- reply不需要点赞与回复 -->
                </div>
                <div class="talk-box">
                  <p>
                    <span>回复 {{item.username}}:</span>
                    <span class="reply">{{reply.content}}</span>
                  </p>
                </div>
                <div class="reply-box">
                </div>
              </div>
            </div>
            <div v-show="_inputShow(i)"
                 class="my-reply my-comment-reply">
              <el-avatar class="header-img"
                         :size="40"
                         :src="userInfo.avatar"></el-avatar>
              <div class="reply-info">
                <div tabindex="0"
                     id="replyInput"
                     contenteditable="true"
                     spellcheck="false"
                     placeholder="输入回复..."
                     @input="onReplyInput($event)"
                     class="reply-input reply-comment-input"></div>
              </div>
              <div class=" reply-btn-box">
                <el-button class="reply-btn"
                           size="medium"
                           @click="sendCommentReply(i)"
                           type="primary">发表回复</el-button>
              </div>
            </div>
          </div>
          <div v-if="postData.commentNum > 2"
               v-on:click="changeCommentFold">
            <el-link type="primary"
                     :disabled="!commentInfo.hasNextPage">{{commentInfo.hasNextPage?'展开更多评论 ↓':'没有更多评论了'}}</el-link>
          </div>
        </el-main>
      </el-container>
      <el-aside class="usercard">
        <el-card>
          <div slot="header">
            <el-avatar :size="150"
                       :src="authorInfo.avatar"></el-avatar>
          </div>
          <div>
            <a>author: {{authorInfo.username}}</a></div>
          <div>
            <a>{{authorInfo.email}}</a></div>
          <div><a>{{authorInfo.likeNum}} like</a></div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
const clickoutside = {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update () { },
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside)
    delete el.vueClickOutside
  }
}
export default {
  name: 'postDetail',
  data () {
    return {
      btnShow: false,
      index: '0',
      commentInput: '',
      replyInput: '',
      myName: 'Lana Del Rey',
      myId: 19870621,
      to: '',
      toId: -1,
      comments: [
        // {
        //   username: 'Lana Del Rey',
        //   commentId: 19870621,
        //   avatarUrl: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        //   content: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
        //   createTime: '2019年9月16日 18:43',
        //   replyNum: 2,
        //   likeNum: 15,
        //   inputShow: false
        //   // reply: [
        //   //   {
        //   //     from: 'Taylor Swift',
        //   //     fromId: 19891221,
        //   //     fromHeadImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
        //   //     to: 'Lana Del Rey',
        //   //     toId: 19870621,
        //   //     comment: '我很喜欢你的新专辑！！',
        //   //     time: '2019年9月16日 18:43',
        //   //     commentNum: 1,
        //   //     like: 15,
        //   //     inputShow: false
        //   //   },
        //   //   {
        //   //     from: 'Ariana Grande',
        //   //     fromId: 1123,
        //   //     fromHeadImg: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
        //   //     to: 'Lana Del Rey',
        //   //     toId: 19870621,
        //   //     comment: '别忘记宣传我们的合作单曲啊',
        //   //     time: '2019年9月16日 18:43',
        //   //     commentNum: 0,
        //   //     like: 5,
        //   //     inputShow: false

        //   //   }
        //   // ]
        // }
      ],
      postId: '',
      postData: {},
      likeIcon: 'el-icon-star-off',
      likeType: 'primary',
      author: '',
      commentInfo: {
        currentPage: 1,
        hasNextPage: true,
        pageNum: '',
        pageSize: 2
      },
      authorInfo: {
        username: 'hpy',
        email: 'EMAIL',
        likeNum: 10000000,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576236443788&di=95bd4d1f71ad1d8604bd3b190b15b3c5&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F19%2F20190219130018_wwfpe.jpg'
      },
      userInfo: {
        username: 'jj',
        email: 'EMAIL',
        likeNum: 100,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576236443792&di=a59189a577729463ee4c42ccada26eb0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F27%2F20180227201208_ujwhc.jpeg'

      },
      commentFold: true
    }
  },
  directives: { clickoutside },
  created: function () {
    this.postId = this.$route.query.postId
    console.log(this.postId)
    this.$axios
      .get('/boot/post/' + this.postId)
      .then(response => {
        console.log('post data\n')
        console.log(response.data)
        this.postData = response.data
        this.postLikeNum = response.data.likeNum
        this.author = response.data.username
        this.authorInfo.username = this.author
        this.checkPostLike()
        this.getComments(1, this.commentInfo.pageSize)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    inputFocus () {
      var commentInput = document.getElementById('commentInput')
      commentInput.style.padding = '8px 8px'
      commentInput.style.border = '2px solid blue'
      commentInput.focus()
    },
    showReplyBtn () {
      this.btnShow = true
    },
    hideReplyBtn () {
      this.btnShow = false
      document.getElementById('commentInput').style.padding = '10px'
      document.getElementById('commentInput').style.border = 'none'
    },
    showReplyInput (i) {
      this.comments[this.index].inputShow = false
      this.index = i
      // this.comments[i].inputShow = true
      this.$set(this.comments[i], 'inputShow', true)
      this.$forceUpdate()
      // this.to = name
      // this.toId = id
    },
    _inputShow (i) {
      return this.comments[i].inputShow
    },
    sendComment () {
      if (!this.commentInput) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        let newComment = {}
        newComment.username = this.userInfo.username
        newComment.avatarUrl = this.userInfo.avatar
        newComment.createTime = '刚刚'
        newComment.replyNum = 1
        newComment.likeNum = 1
        newComment.content = this.commentInput
        newComment.inputShow = false
        this.$axios.post('/boot/comment/publish', {
          postId: this.postData.postId,
          username: this.userInfo.username,
          content: this.commentInput
        }).then(response => {
          console.log(response.data)
          if (response.data) {
            this.comments.unshift(newComment)
          }
        })
        let input = document.getElementById('commentInput')
        this.commentInput = ''
        input.innerHTML = ''
      }
    },
    sendCommentReply (i) {
      if (!this.replyInput) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '回复不能为空'
        })
      } else {
        // this.comments[i].reply.push(a)
        let newReply = {}
        newReply.username = this.userInfo.username
        newReply.avatarUrl = this.userInfo.avatar
        newReply.createTime = '刚刚'
        newReply.content = this.replyInput
        this.$axios.post('/boot/reply/publish', {
          username: this.userInfo.username,
          commentId: this.comments[i].commentId,
          content: this.replyInput
        }).then(response => {
          if (response.data) {
            this.comments[i].replies.unshift(newReply)
          }
        })
        let input = document.getElementById('replyInput')
        this.replyInput = ''
        input.innerHTML = ''
        // document.getElementsByClassName('reply-comment-input')[i].innerHTML = ''
      }
    },
    onDivInput: function (e) {
      this.commentInput = e.target.innerHTML
      console.log('comment input:' + this.commentInput)
    },
    onReplyInput: function (e) {
      this.replyInput = e.target.innerHTML
      console.log('reply input:' + this.replyInput)
    },
    dateStr (date) {
      // 获取js 时间戳
      var time = new Date().getTime()
      //  去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000)
      //  存储转换值
      var s
      if (time < 60 * 10) { // 十分钟内
        return '刚刚'
      } else if ((time < 60 * 60) && (time >= 60 * 10)) {
        // 超过十分钟少于1小时
        s = Math.floor(time / 60)
        return s + '分钟前'
      } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        // 超过1小时少于24小时
        s = Math.floor(time / 60 / 60)
        return s + '小时前'
      } else if ((time < 60 * 60 * 24 * 30) && (time >= 60 * 60 * 24)) {
        // 超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24)
        return s + '天前'
      } else {
        // 超过30天ddd
        date = new Date(parseInt(date))
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      }
    },
    checkPostLike () {
      this.$axios
        .get('/boot/like/check?user=' + this.author + '&&type=0&&type-id=' + this.postId)
        .then(response => {
          console.log(response.data)
          if (response.data === true) {
            this.likeType = 'primary'
          } else {
            this.likeType = ''
          }
        })
    },
    handlePostLike () {
      if (this.likeType === '') {
        this.$axios.post('/boot/like/post', {
          username: this.author,
          type: 0,
          typeId: this.postId,
          likedUsername: this.author
        }).then(response => {
          console.response()
        }).catch(error => {
          console.log(error)
        })
      } else if (this.likeType === 'primary') {
        this.$axios.post('/boot/unlike/post', {
          username: this.author,
          type: 0,
          typeId: this.postId,
          likedUsername: this.author
        }).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      }
      this.$axios
        .get('/boot/post/' + this.postId)
        .then(response => {
          console.log('post data\n')
          console.log(response.data)
          this.$set(this.postData, 'likeNum', response.data.likeNum)
          this.checkPostLike()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getComments (pageNum, pageSize) {
      this.$axios
        .get('/boot/comment/get-comments-of-post/' + this.postData.postId + '?page-num=' + pageNum + '&&page-size=' + pageSize)
        .then(response => {
          console.log(response.data)
          for (var item of response.data.list) {
            item.replies = []
            this.comments.push(item)
          }
          this.commentInfo.currentPage = response.data.pageNum
          this.commentInfo.hasNextPage = response.data.hasNextPage
          this.commentInfo.pageNum = response.data.size
          console.log(this.comments)
        })
    },
    changeCommentFold () {
      if (this.commentInfo.hasNextPage) {
        this.getComments(this.commentInfo.currentPage + 1, this.commentInfo.pageSize)
      }
    }

  }
}
</script>
<style lang="stylus" scoped>
.my-reply {
  padding: 10px;
  background-color: #fafbfc;
  text-align: left;

  .header-img {
    display: inline-block;
    vertical-align: top;
  }

  .reply-info {
    display: inline-block;
    margin-left: 5px;
    width: 90%;

    @media screen and (max-width: 1200px) {
      width: 80%;
    }

    .reply-input {
      min-height: 20px;
      line-height: 22px;
      padding: 10px 10px;
      color: #ccc;
      background-color: #fff;
      border-radius: 5px;
      text-align: left;

      &:empty:before {
        content: attr(placeholder);
      }

      &:focus:before {
        content: none;
      }

      &:focus {
        padding: 8px 8px;
        border: 2px solid blue;
        box-shadow: none;
        outline: none;
      }
    }
  }

  .reply-btn-box {
    height: 25px;
    margin: 10px 0;

    .reply-btn {
      position: relative;
      float: right;
      margin-right: 15px;
    }
  }
}

.my-comment-reply {
  margin-left: 50px;
  text-align: left;

  .reply-input {
    width: flex;
  }
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}

.author-title {
  padding: 10px;
  width: 100%;

  .header-img {
    display: inline-block;
    vertical-align: top;
    float: left;
  }

  .author-info {
    display: inline-block;
    margin-left: 0px;
    width: 60%;
    height: 40px;
    line-height: 20px;
    text-align: left;

    > span {
      display: block;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .author-name {
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }

    .author-time {
      font-size: 14px;
    }
  }

  .icon-btn {
    width: 30%;
    padding: 0 !important;
    float: right;

    @media screen and (max-width: 1200px) {
      width: 20%;
      padding: 7px;
    }

    > span {
      cursor: pointer;
    }

    .iconfont {
      margin: 0 5px;
    }
  }

  .talk-box {
    margin: 0 50px;
    text-align: left;
    padding-left: 2%;

    > p {
      margin: 0;
    }

    .reply {
      font-size: 16px;
      color: #000;
    }
  }

  .reply-box {
    margin: 10px 0 0 50px;
    background-color: #efefef;
  }
}

.wrap {
  width: 1000px;
  margin: 0 auto;
  height: auto;
}

.avatar {
  width: 24px;
  height: 24px;
  float: left;
}

.author {
  padding-left: 10px;
  color: #3293ee;
  float: left;
}

.post-detail {
  text-align: left;
}

.post-content {
  width: 100%;
  padding: auto;
  text-align: left;
}

.post-description {
  font-size: 16px;
  padding: auto;
  text-align: right;
  color: gray;
}

.post-title {
  width: 100%;
  padding-top: 0px;
  color: #1a1a1a;
  text-align: left;
  font-size: 24px;
  line-height: 1.6;
  font-weight: 600;
  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
}

.usercard {
  margin: 0 auto;
  margin-top: 20px;
}

.like-button {
  float: right;
  padding: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}

.comment-num {
  float: right;
  padding: auto;
  padding-right: 10px;
  padding-top: 8px;
}
</style>
