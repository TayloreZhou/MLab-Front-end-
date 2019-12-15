import Mock from 'mockjs'

const vehicle = Mock.mock(
  '/boot/model', 'post', (req, res) => {
    return ['aqw', 'qweqe', 'qeqwdas']
  })
const dataset = Mock.mock(
  '/boot/post/1', 'get', (req, res) => {
    return {
      datasetId: 1,
      username: 'admin',
      datasetName: 'A dataset',
      description: '这是一个传说中的数据集',
      format: 'txt',
      size: 123.0,
      createTime: '2019-12-13 19:57:15',
      commentNum: 4,
      isPublic: 1,
      status: 1
    }
  }
)
const dComment1 = Mock.mock(
  '/boot/comment/get-comments-of-post/1?page-num=1&&page-size=2', 'get', (req, res) => {
    return {
      list: [
        {
          dCommentId: 1,
          datasetId: 1,
          username: 'damin',
          content: 'Aoligay1',
          createTime: '2019-10-10 19:20:00',
          replyNum: 3,
          likeNum: 3
        },
        {
          dCommentId: 2,
          datasetId: 1,
          username: 'damin',
          content: 'Aoligay2',
          createTime: '2019-10-10 19:20:00',
          replyNum: 3,
          likeNum: 3
        }
      ],
      pageNum: 1,
      hasNextPage: true,
      size: 2
    }
  }
)
const dComment2 = Mock.mock(
  '/boot/comment/get-comments-of-post/1?page-num=2&&page-size=2', 'get', (req, res) => {
    return {
      list: [
        {
          dCommentId: 3,
          datasetId: 1,
          username: 'damin',
          content: 'Aoligay1',
          createTime: '2019-10-10 19:20:00',
          replyNum: 3,
          likeNum: 3
        },
        {
          dCommentId: 4,
          datasetId: 1,
          username: 'damin',
          content: 'Aoligay2',
          createTime: '2019-10-10 19:20:00',
          replyNum: 3,
          likeNum: 3
        }
      ],
      pageNum: 1,
      hasNextPage: false,
      size: 2
    }
  }
)
const dReply1 = Mock.mock(
  '/boot/reply/get-replies-of-comment/1?page-num=1&&page-size=2', 'get', (req, res) => {
    return {
      list: [
        {
          dReplyId: 1,
          dCommentId: 1,
          username: 'damin',
          content: 'Aoligay1',
          createTime: '2019-10-10 19:20:00'
        },
        {
          dReplyId: 2,
          dCommentId: 1,
          username: 'damin',
          content: 'Aoligay1',
          createTime: '2019-10-10 19:20:00'
        }
      ],
      pageNum: 1,
      hasNextPage: true,
      size: 2
    }
  }
)
const dReply2 = Mock.mock(
  '/boot/reply/get-replies-of-comment/1?page-num=2&&page-size=2', 'get', (req, res) => {
    return {
      list: [
        {
          dCommentId: 3,
          datasetId: 1,
          username: 'damin',
          content: 'Aoligay1',
          createTime: '2019-10-10 19:20:00',
          replyNum: 3,
          likeNum: 3
        },
        {
          dCommentId: 4,
          datasetId: 1,
          username: 'damin',
          content: 'Aoligay2',
          createTime: '2019-10-10 19:20:00',
          replyNum: 3,
          likeNum: 3
        }
      ],
      pageNum: 1,
      hasNextPage: false,
      size: 2
    }
  }
)
export default {
  vehicle,
  dataset,
  dComment1,
  dComment2,
  dReply1,
  dReply2
}
