<template>
  <div>
    <el-divider content-position="right">My lab, machine lab.</el-divider>
    <el-row>
      <el-col span="5">
        <h5>作业类型</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router>
          <el-menu-item index="/joblist/train">
            <i class="el-icon-menu"></i>
            <span slot="title">训练作业</span>
          </el-menu-item>
          <el-menu-item index="/joblist/predict">
            <i class="el-icon-menu"></i>
            <span slot="title">预测作业</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col span="15">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'joblist'
}
</script>

<style scoped>

</style>
