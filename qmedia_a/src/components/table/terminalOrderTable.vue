<template>
  <div>
    <basic-table
      :columns="columns"
      :call-server="callServer"
      :props-data="tableData"
      :muti="false"
      ref="terminalOrderTable"
    >
      <template slot="tableHeader">
        <div style="margin:15px 0">
          <v-select :placeholder="`命令名称`" @optionChange="orderChange" :options="orders"></v-select>
          <v-select :placeholder="`状态`" @optionChange="statusChange" :options="statuses"></v-select>
          <el-button
            style="float:right;margin-right:10px"
            type="warning"
            icon="el-icon-search"
            @click="search"
          >查询</el-button>
          <div class="select-wraper" style="float:right;margin-right:10px;width:160px">
            <el-input
              placeholder="操作账户"
              v-model.trim="account"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
        </div>
      </template>
    </basic-table>
  </div>
</template>

<script>
import { terminalOrder } from "@/api/terminal";
import basicTable from "./components/basicTable";
export default {
  components: { basicTable },
  props: {
    rowData: Object
  },
  data() {
    return {
      tableParams: {
        limit: 10,
        page: 0,
        deviceId: this.rowData.id
      },
      columns: [
        {
          label: "命令名称",
          render: (h, row) => {
            return (
              <span>
                {row.type == 0
                  ? "截屏"
                  : row.type == 1
                  ? "重启"
                  : row.type == 2
                  ? "获取运行日志"
                  : "磁盘清理"}
              </span>
            );
          }
        },
        {
          label: "状态",
          prop: "status",
          render: (h, row) => {
            return (
              <span>
                {row.status == 0 ? "失败" : row.status == 1 ? "成功" : "待执行"}
              </span>
            );
          }
        },
        { label: "操作账户", prop: "creator" },
        {
          label: "操作时间",
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.createTime)}</span>;
          }
        }
      ],
      tableData: [],
      orders: [
        { name: "截屏", val: "0" },
        { name: "重启", val: "1" },
        { name: "获取运行日志", val: "2" },
        { name: "磁盘清理", val: "4" }
      ],
      statuses: [
        { name: "失败", val: "0" },
        { name: "成功", val: "1" },
        { name: "待执行", val: "2" }
      ],
      account: ""
    };
  },
  methods: {
    getData() {
      this.$refs.terminalOrderTable.pagination.page = 0;
      this.$refs.terminalOrderTable.currentPage = 1;
      this.$refs.terminalOrderTable.fecthData();
    },
    callServer(pagination) {
      return terminalOrder(Object.assign(this.tableParams, pagination));
    },
    orderChange(val) {
      this.tableParams.type = val;
      this.search();
    },
    statusChange(val) {
      this.tableParams.status = val;
      this.search();
    },
    search() {
      this.tableParams.account = this.account;
      this.getData();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>