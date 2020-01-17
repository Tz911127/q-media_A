<template>
  <div>
    <div class="report clearfix">
      <el-col :span="16" v-loading="loading">
        <order-echart :dataMonth="dataMonth" :id="id" :title="title" :value="value" v-if="flag"></order-echart>
      </el-col>
      <el-col :span="8">
        <terminal-list></terminal-list>
      </el-col>
    </div>
    <div class="orderReport">
      <order-report-table></order-report-table>
    </div>
  </div>
</template>

<script>
import orderEchart from "./terminalTab/orderEchart";
import terminalList from "./common/terminalList";
import orderReportTable from "../table/orderReportTable";
export default {
  components: {
    orderEchart,
    terminalList,
    orderReportTable
  },
  data() {
    return {
      dataMonth: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      flag: false,
      value: [541, 52, 200, 34, 290, 330, 520, 22, 131, 524, 231, 412],
      title: "",
      id: "orderReport",
      loading: true
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.flag = true;
      this.loading = false;
    }, 600);
  }
};
</script>

<style scoped>
.report {
  display: flex;
}
.report .el-col:nth-child(1) {
  margin-right: 7px;
}
.report .el-col:nth-child(2) {
  margin-left: 7px;
}
.orderReport {
  margin-top: 15px;
  background: #fff;
  border-radius: 4px;
}
</style>