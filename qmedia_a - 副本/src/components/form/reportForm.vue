<template>
  <div>
    <el-form size="mini" :model="termForm" label-width="80px">
      <el-form-item label="报表名称">{{termForm.name}}</el-form-item>
      <el-form-item label="业务">{{termForm.bizType ==0?'终端': termForm.bizType == 1 ? "广告" : "合同"}}</el-form-item>
      <el-form-item
        v-if="termForm.bizType!=2"
        :label="termForm.bizType ==0?'终端业务': termForm.bizType == 1 ? '广告业务' : '合同'"
      >
        <span
          v-if="termForm.bizType ==0"
        >{{termForm.bizDetail==0?'终端数量':termForm.bizDetail==1?"在线时长":termForm.bizDetail==2?"播放时长(全部企业)":"播放时长(单个企业)"}}</span>
        <span v-if="termForm.bizType ==1">{{termForm.bizDetail==0?"广告数量":"广告播放时长(单个企业)"}}</span>
      </el-form-item>
      <el-form-item v-if="termForm.deviceSn" label="终端编号">{{termForm.deviceSn}}</el-form-item>
      <el-form-item v-if="termForm.programName" label="节目名称">{{termForm.programName}}</el-form-item>
      <el-form-item
        label="报表类型"
        v-if="termForm.countType"
      >{{termForm.countType==0?'全部汇总':termForm.countType==1?'按月汇总':termForm.countType==2?'按天汇总(最多31天)':'明细'}}</el-form-item>
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