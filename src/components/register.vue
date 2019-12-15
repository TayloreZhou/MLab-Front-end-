<template style="text-align: center">
  <div style="width: 1200px;margin: auto">
    <el-container>
      <el-row>
        <el-col :span="4" :offset="1">
          <div><img src="../assets/185-43-hor.png" alt="MLab"/></div>
        </el-col>
        <el-col :span="2" :offset="17">
          <div style="margin-top: 20px">
            <el-link href="/login" >Log In</el-link>
          </div>
        </el-col>
      </el-row>
      <el-divider content-position="right">Welcome to MLab!</el-divider>
      <el-row>
        <el-col :offset="5" :span="5">
          <Avatar ref="registerAvatar" style="margin-top: 80px"></Avatar>
        </el-col>
        <el-col :span="8" :offset="2" style="margin: 70px 0px">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="Username" prop="checkName">
              <el-input v-model="ruleForm.checkName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="email" prop="checkEmail">
              <el-input v-model="ruleForm.checkEmail" autocomplete="off"></el-input>
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
import Avatar from './Avatar'
export default {
  name: 'register',
  components: {Avatar},
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Username can\'t be empty'))
      } else {
        return callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Email can\'t be empty'))
      }
      setTimeout(() => {
        // eslint-disable-next-line no-useless-escape
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        var isok = reg.test(value)
        if (!isok) {
          return callback(new Error('Email format error!'))
        } else {
          return callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password!'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again!'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('Password don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        checkName: '',
        checkEmail: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        checkEmail: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        checkName: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      if (this.$refs['registerAvatar'].imageUrl === '') {
        this.$message.error('No avatar!')
        return false
      }
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
              this.$message.error('Username existed!')
            } else {
              this.$message.error('Register Error!')
            }
          })
        } else {
          this.$message.error('Reigster Error!')
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
