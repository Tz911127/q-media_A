<template>
  <div>
    <el-form :model="authRow">
      <el-form-item label="认证类型">{{authRow.auth==1?'企业认证':''}}</el-form-item>
      <el-form-item label="企业名称">{{authRow.companyName}}</el-form-item>
      <el-form-item label="统一社会信用代码">{{authRow.unifiedSocialCreditCode}}</el-form-item>
      <el-form-item label="法人姓名">{{authRow.legalRepName}}</el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    authRow: Object
  }
};
</script>

<style lang="scss" scoped>
</style>