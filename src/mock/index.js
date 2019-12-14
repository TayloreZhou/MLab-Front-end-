import Mock from 'mockjs'

const vehicle = Mock.mock(
  '/boot/model', 'post', (req, res) => {
    return ['aqw', 'qweqe', 'qeqwdas']
  })

export default {
  vehicle
}
