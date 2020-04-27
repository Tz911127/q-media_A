<template>
  <div>
    <div class="report clearfix">
      <el-col :span="16" v-loading="loading">
        <div style="text-align:right">
          <el-date-picker
            size="mini"
            v-model="dateValue"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyyMM"
            @change="orderChange"
            :pickerOptions="pickerOptions"
          ></el-date-picker>
        </div>
        <order-echart
          :dataMonth="month"
          :id="id"
          :title="title"
          :value="addValue"
          :paidValue="paidValue"
          :addCount="addCount"
          v-if="flag"
        ></order-echart>
      </el-col>
      <el-col :span="8">
        <terminal-list :isSelect="false" @btnClick="btnClick" :lis="lis" :loading="topLoading"></terminal-list>
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
import { getContractReport, getContractTop10 } from "@/api/report";
export default {
  components: {
    orderEchart,
    terminalList,
    orderReportTable
  },
  data() {
    let that = this;
    return {
      month: [],
      flag: false,
      addValue: [],
      paidValue: [],
      title: "",
      id: "orderReport",
      loading: true,
      addCount: [],
      searchMonth: {},
      dateValue: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      timeType: 0,
      lis: [],
      topLoading: false
    };
  },
  methods: {
    getData() {
      this.flag = false;
      this.loading = true;
      getContractReport(this.searchMonth)
        .then(res => {
          this.flag = true;
          this.loading = false;
          for (let i in res) {
            this.addValue.push((res[i].addMoneyTotal / 100).toFixed(2));
            this.paidValue.push((res[i].paidMoneyTotal / 100).toFixed(2));
            this.addCount.push(
              (res[i].paidMoneyTotal / 1000 / res[i].addCount).toFixed(2)
            );
            this.month.push(this.$filters.formateDate(String(res[i].month)));
          }
        })
        .catch(res => {
          if (res) {
            this.searchMonth = {};
            this.dateValue = "";
            this.getData();
          }
        });
    },
    getContractTop10Data() {
      let params = {
        timeType: this.timeType
      };
      this.topLoading = true;
      getContractTop10(params).then(res => {
        this.topLoading = false;
        this.lis = res;
      });
    },
    orderChange(val) {
      this.flag = false;
      this.loading = true;
      this.paidValue = [];
      this.addValue = [];
      this.addCount = [];
      this.month = [];
      if (val) {
        this.searchMonth.startMonth = val[0];
        this.searchMonth.endMonth = val[1];
        this.getData();
      } else {
        this.searchMonth = {};
        this.getData();
      }
    },
    btnClick(e) {
      this.timeType = e.value;
      this.getContractTop10Data(this.timeType);
    }
    //列表数据
  },
  mounted() {
    this.loading = true;
    // setTimeout(() => {
    //   this.flag = true;
    //   this.loading = false;
    // }, 600);
    this.getData();
    this.getContractTop10Data();
  },
  computed: {
    opened() {
      return this.$store.state.user.isCollapse;
    }
  },
  watch: {
    opened(val) {
      this.flag = false;
      this.loading = true;
      this.paidValue = [];
      this.addValue = [];
      this.addCount = [];
      this.month = [];
      setTimeout(() => {
        this.getData();
      }, 200);
    }
  }
};
</script>

<style scoped>
.report {
  display: flex;
  height: 400px;
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