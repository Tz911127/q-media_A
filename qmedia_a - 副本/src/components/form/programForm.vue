<template>
  <div>
    <div style="display:inline-block;width:60%;height:350px ;text-align:center">
      <programMonitor></programMonitor>
    </div>
    <div style="display:inline-block;width:30%;margin-left:5%;vertical-align:top">
      <el-form :model="data" size="mini">
        <el-form-item label="名称">{{this.$filters.filterPrograms(data.name,data.del)}}</el-form-item>
        <el-form-item label="分辨率">{{data.width}}*{{data.height}}</el-form-item>
        <el-form-item label="大小">{{this.$filters.programMb(data.size)}}</el-form-item>
        <el-form-item label="时长" v-if="data.duration">{{data.duration|formatSeconds}}</el-form-item>
        <el-form-item label="创建账户">{{data.creator}}</el-form-item>
        <el-form-item label="创建时间">{{data.createTime|filterTime}}</el-form-item>
        <el-form-item label="组织机构">{{data.organizationId}}</el-form-item>
        <el-form-item label="分组">{{data.groupId}}</el-form-item>
        <el-form-item label="当前状态">{{this.$filters.filterStatus(data.status)}}</el-form-item>
        <el-form-item label="原因" v-if="data.checkReason">{{data.checkReason}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import programMonitor from "../programMonitor/index";
export default {
  props: {
    data: Object
  },
  data() {
    return {};
  },
  components: {
    programMonitor
  }
};
</script>

<style lang="scss" scoped>
</style>