<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
    ></basic-table>
    <v-dialog ref="orderReport" :showFooter="false" :title="`详情`" :width="`70%`">
      <div style="margin-top:-15px">
        <v-select :placeholder="`合同状态`" @optionChange="orderChange" :options="status"></v-select>
        <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
        <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
          <el-input
            placeholder="企业代码/名称"
            v-model.trim="keyOrName"
            @keyup.enter.native="search"
            clearable
          ></el-input>
        </div>
      </div>
      <dialog-table
        :loading="dialogLoading"
        :columns="dialogColumns"
        :props-data="dialogTableData"
        :muti="false"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        ref="businessTable"
      ></dialog-table>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import dialogTable from "./components/dialogTable";
import { getOrderReportPage, getOrderReportDetail } from "@/api/report";
export default {
  components: {
    basicTable,
    dialogTable
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          label: "时间",
          render: (h, row) => {
            return <span>{this.$filters.formateDate(String(row.month))}</span>;
          }
        },
        {
          label: "待签",
          render: (h, row) => {
            return (
              <span>{this.$filters.filterMoney(row.waitToSignTotal)}</span>
            );
          }
        },
        {
          label: "待付款",
          render: (h, row) => {
            return <span>{this.$filters.filterMoney(row.waitToPayTotal)}</span>;
          }
        },
        {
          label: "已付款",
          render: (h, row) => {
            return <span>{this.$filters.filterMoney(row.paidTotal)}</span>;
          }
        },
        {
          label: "已关闭",
          render: (h, row) => {
            return <span>{this.$filters.filterMoney(row.closedTotal)}</span>;
          }
        },
        {
          label: "合计",
          prop: "allTotal",
          render: (h, row) => {
            return <span>{this.$filters.filterMoney(row.allTotal)}</span>;
          }
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "查看",
                icon: "el-icon-view",
                method: () => this.review(row)
              }
            ];
            return h("table-operate", {
              attrs: {
                operateList: operateList,
                rowData: row,
                width: "100px"
              }
            });
          }
        }
      ],
      tableData: [],
      tableParams: {
        limit: 10,
        page: 0
      },
      dialogLoading: false,
      dialogColumns: [
        { label: "合同编号", overflow: true, prop: "contractNo" },
        { label: "合伙人", overflow: true, prop: "secAccountAndName" },
        { label: "广告主", overflow: true, prop: "firstAccountAndName" },
        {
          label: "合同金额",
          overflow: false,
          render: (h, row) => {
            return <span>{this.$filters.filterMoney(row.money_small)}</span>;
          }
        },
        {
          label: "合同状态",
          render(h, row) {
            return (
              <span>
                {row.state == 0
                  ? "待签署"
                  : row.state == 1
                  ? "待付款"
                  : row.state == 2
                  ? "已付款"
                  : "已关闭"}
              </span>
            );
          }
        },
        { label: "合伙人企业代码", overflow: true, prop: "ck_sec" },
        { label: "企业名称", overflow: true, prop: "secName" },
        {
          label: "创建时间",
          overflow: true,
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.createTime)}</span>;
          }
        }
      ],
      dialogTableData: [],
      dialogTableParams: {
        limit: 10,
        page: 0
      },
      total: 0,
      status: [
        { name: "待签署", val: 0 },
        { name: "待付款", val: 1 },
        { name: "已付款", val: 2 },
        { name: "已关闭", val: 3 }
      ],
      keyOrName: ""
    };
  },
  methods: {
    review(row) {
      this.$refs.orderReport.dialogVisible = true;
      this.dialogTableParams = {
        limit: 10,
        page: 0,
        month: row.month
      };
      this.dialogLoading = true;
      this.getOrderReportPage();
    },
    getOrderReportPage() {
      getOrderReportDetail(this.dialogTableParams).then(res => {
        this.dialogLoading = false;
        this.dialogTableData = res.data;
        this.total = res.total;
      });
    },
    callServer(pagination) {
      return getOrderReportPage(Object.assign(this.tableParams, pagination));
    },
    orderChange(val) {
      this.dialogTableParams.state = val;
      this.search();
    },
    handleSizeChange(val) {
      this.dialogLoading = true;
      this.dialogTableParams.limit = val;
      this.getOrderReportPage();
    },
    handleCurrentChange(val) {
      this.dialogLoading = true;
      this.dialogTableParams.page = val - 1;
      this.getOrderReportPage();
    },
    search() {
      this.dialogLoading = true;
      this.dialogTableParams.keyOrName = this.keyOrName;
      this.dialogTableParams.page = 0;
      this.getOrderReportPage();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>