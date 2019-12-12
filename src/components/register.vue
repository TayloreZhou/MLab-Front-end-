<template style="text-align: center">
  <div style="width: 1200px;margin: auto">
    <el-container>
      <el-row>
        <el-col :span="4" :offset="1">
          <div><img src="../assets/185-43-hor.png" alt="MLab"/></div>
        </el-col>"
        <el-col :span="2" :offset="17">
          <div style="margin-top: 20px">
            <el-link href="/login" >登录</el-link>
          </div>
        </el-col>
      </el-row>
      <el-divider content-position="right">Welcome to MLab!</el-divider>
      <el-row type="flex" justify="center">
        <el-col :span="6" style="margin: 70px 0px">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Username" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-divider content-position="left">Welcome to MLab!</el-divider>
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
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        email: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/server/user-service/register', {
            'username': this.ruleForm.username,
            'password': this.ruleForm.password,
            'email': this.ruleForm.email,
            'avatarUrl': this.ruleForm.avatarUrl
          }
          ).then((response) => {
            if (response.status === 200) {
              this.$router.push('/login')
            } else if (response.status === 409) {
              this.$message('Username existed!')
            } else {
              this.$message('Register Error!')
            }
          })
        } else {
          this.$message('Reigster Error!')
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

</style>
