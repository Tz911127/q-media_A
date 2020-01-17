<template>
  <div>
    <el-form size="mini" :model="termForm" label-width="80px">
      <el-form-item label="报表名称">{{termForm.name}}</el-form-item>
      <el-form-item label="业务">{{termForm.bizType ==0?'终端': termForm.bizType == 1 ? "广告" : "合同"}}</el-form-item>
      <el-form-item
        label="报表类型"
        v-if="termForm.countType"
      >{{termForm.countType==0?'按天汇总(最多31天)':termForm.countType==1?'按月汇总':termForm.countType==2?'全部汇总':'明细'}}</el-form-item>
      <el-form-item label="企业代码" v-if="termForm.ck">{{termForm.ck}}</el-form-item>
      <el-form-item
        label="日期"
      >{{this.$filters.formateDate(termForm.start)}}至{{this.$filters.formateDate(termForm.end)}}</el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    termForm: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
</style>