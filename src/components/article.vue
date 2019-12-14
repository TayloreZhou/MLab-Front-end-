<template>
  <div>
    <el-row>
      <el-col>
        <el-divider content-position="right">My lab, machine lab.</el-divider>
      </el-col>
    </el-row>
    <h3>Create new post</h3>
    <mavon-editor ref=mde v-model="value" language="en" @imgAdd="$imgAdd"/>
    <el-row type="flex" style="margin-top: 20px">
      <el-col :span="10" :offset="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      form: {
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>
