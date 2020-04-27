<template>
  <div>
    <el-form>
      <el-form-item label="合同编号">{{data.contractNo}}</el-form-item>
      <el-form-item label="合同金额">￥{{(data.money_small/100).toFixed(2)}}</el-form-item>
      <el-form-item label="抽成比例">{{(data.percent)}}%</el-form-item>
      <el-form-item label="应收金额">￥{{(((data.money_small)*(data.percent)/100)/100).toFixed(2)}}</el-form-item>
      <el-form-item label="合同类型">{{data.state==0?'政府宣传':data.state==1?'商业广告':'公益广告'}}</el-form-item>
      <el-form-item label="投放时间">{{data.time_begin|formateDate}}至{{data.time_end|formateDate}}</el-form-item>
      <el-form-item label="投放终端数">{{data.term_num}}台</el-form-item>
      <el-form-item label="广告时长">{{data.ad_time|formatSeconds}}</el-form-item>
      <el-form-item label="播放次数">{{data.ad_count}}次/天/台</el-form-item>
      <el-form-item label="广告主/签署时间">{{data.firstAccountAndDate}}</el-form-item>
      <el-form-item label="合伙人/签署时间">{{data.secAccountAndDate}}</el-form-item>
      <el-form-item label="平台方/签署时间">{{data.thirdAccountAndDate}}</el-form-item>
      <template v-if="!footer">
        <div>
          <el-form-item label="抄送人"></el-form-item>
          <el-form-item label="合同状态">
            {{data.state==0 ? "待签署"
            : data.state == 1
            ? "待付款"
            : data.state == 2
            ? "已付款"
            : "已关闭"}}{{data.checkReason?'（原因:'+data.checkReason+')':''}}
          </el-form-item>
          <el-form-item label="操作账户" v-if="data.checkAccount">{{data.checkAccount}}</el-form-item>
          <el-form-item label="操作时间" v-if="data.checkTime">{{data.checkTime|filterTime}}</el-form-item>
        </div>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center" v-if="footer">
      <el-button type="primary" @click="checkPass">确定已收款</el-button>
      <el-button @click="notPass">取消此合同</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    footer: Boolean
  },
  data() {
    return {};
  },
  methods: {
    checkPass() {
      this.$emit("checkPass");
    },
    notPass() {
      this.$emit("notPass");
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>