<template>
  <div>
    <el-form :model="versionForm">
      <el-form-item label="终端文件版本号">{{versionForm.versionName}}</el-form-item>
      <el-form-item label="功能说明">{{versionForm.remark}}</el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    versionForm: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>