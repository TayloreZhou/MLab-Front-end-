<template>
    <div>
      <el-row>
        <el-col :span="4" :offset="1">
          <div><img src="../assets/185-43-hor.png" alt="MLab"/></div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <div class="bg_log_in">
          <el-row type="flex" justify="center">
            <el-col :span="7" class="login_form">
              <div style="width: 60%;margin: auto">
                <el-form :model="ruleForm" status-icon :rules="rules"
                         ref="ruleForm" class="demo-ruleForm" style="margin-top: 20px">
                  <el-form-item label="账号" prop="id">
                    <el-input v-model.number="ruleForm.id"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-row type="flex" justify="space-around">
                      <el-col>
                        <router-link to="/register">注册</router-link>
                      </el-col>
                      <el-col>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                      </el-col>
                      <el-col>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item>
                    <el-row type="flex" justify="space-around">
                      <el-col>
                        <a href="">忘记密码</a>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-footer>
        <el-row type="flex" justify="center">
          <el-col :span="4" style="vertical-align: middle">
            <div style="color: rgba(0,0,0,0.6);">
              Made In China
            </div>
            <div style="color: rgba(0,0,0,0.6);">
              CopyRight© 2019 2 30
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        id: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        id: [
          { validator: checkId, trigger: 'blur' }
        ]
      },
      posts: {}
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8080/web_test_mav_war/HelloWorld?id=1234&pass=1234')
            .then((response) => {
              console.log('su')
              this.posts = response.data
              if (this.posts.state === 1) {
                this.$router.push({path: './canvas'})
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '密码错误'
                })
              }
            })
            .catch((error) => {
              console.log(error)
              this.$notify.error({
                title: '错误',
                message: '登录失败'
              })
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.bg_log_in{
  background: url("../assets/bg_login.jpg") no-repeat;
  background-size: cover;
  height: 500px;
}
.login_form{
  background: rgba(255, 255, 255, 0.75);
  text-align: center;
  margin-top: 90px;
}
.text_foot{
  color: #000000;
  margin-top: 30px;
}
</style>
