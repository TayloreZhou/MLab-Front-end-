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
                  <el-form-item label="Username" prop="id">
                    <el-input v-model.number="ruleForm.id"></el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-row type="flex" justify="space-around">
                      <el-col>
                        <router-link to="/register">Register</router-link>
                      </el-col>
                      <el-col>
                        <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
                      </el-col>
                      <el-col>
                        <el-button @click="resetForm('ruleForm')">Reset</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item>
                    <el-row type="flex" justify="space-around">
                      <el-col>
                        <a href="">Forget password?</a>
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
        return callback(new Error('Username can\'t be empty!'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Should be a number'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password can\'t be empty!'))
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
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/server/auth-service/oauth/token?grant_type=password&' +
              'username=' + this.ruleForm.id + '&password=' + this.ruleForm.pass,
            headers: {
              'Authorization': 'Basic YnJvd3NlcjpzZWNyZXQ='
            }
          }).then((response) => {
            if (response.status === 200) {
              this.$store.commit('set_token', response.data.access_token)
              this.$store.commit('set_username', this.ruleForm.id)
              if (this.$store.state.token) {
                this.$router.push('/')
              }
            } else {
              this.$notify.error({
                title: 'Error',
                message: 'Password Wrong'
              })
            }
          }).catch((error) => {
            console.log(error)
            this.$notify.error({
              title: 'Error',
              message: 'Login Failure'
            })
          })
        } else {
          console.log('fail')
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
  height: 800px;
}
.login_form{
  background: rgba(255, 255, 255, 0.75);
  text-align: center;
  margin-top: 200px;
}
.text_foot{
  color: #000000;
  margin-top: 30px;
}
</style>
