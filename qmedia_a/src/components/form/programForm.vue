<template>
  <div>
    <div style="display:inline-block;width:60%;height:350px ;text-align:center"></div>
    <div style="display:inline-block;width:30%;margin-left:5%;vertical-align:top">
      <el-form :model="data">
        <el-form-item label="名称">{{this.$filters.filterPrograms(data.name,data.del)}}</el-form-item>
        <el-form-item label="分辨率">{{data.width}}*{{data.height}}</el-form-item>
        <el-form-item label="大小">{{this.$filters.programMb(data.size)}}</el-form-item>
        <el-form-item label="组织机构">{{data.organizationId}}</el-form-item>
        <el-form-item label="当前状态">{{this.$filters.filterStatus(data.status)}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>