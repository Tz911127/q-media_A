<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="commandTable"
    >
      <template slot="tableHeader">
        <div style="margin-bottom: 15px;">
          <v-select
            :placeholder="`终端命令`"
            @optionChange="typeChange"
            :options="types"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <v-select
            :placeholder="`命令状态`"
            @optionChange="statusChange"
            :options="statuses"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
          <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
            <el-input
              placeholder="终端编号"
              v-model.trim="searchItem.sn"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
            <el-input
              placeholder="操作账户"
              v-model.trim="searchItem.account"
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
import basicTable from "./components/basicTable";
import { getCommandPage } from "@/api/command";
export default {
  components: {
    basicTable
  },
  data() {
    return {
      loading: true,
      columns: [
        { label: "终端编号", prop: "sn" },
        {
          label: "终端名称",
          render: (h, row) => {
            return (
              <span>{this.$filters.filterPrograms(row.name, row.del)}</span>
            );
          }
        },
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
                  : row.type == 3
                  ? "录屏"
                  : "磁盘清理"}
              </span>
            );
          }
        },
        {
          label: "命令状态",
          render: (h, row) => {
            return (
              <span
                class={
                  row.status == 0
                    ? "txt-red"
                    : row.status == 1
                    ? "btn-detail"
                    : ""
                }
              >
                {row.status == 0 ? "失败" : row.status == 1 ? "成功" : "待执行"}
                {row.status == 0 ? "(" + row.msg + ")" : ""}
              </span>
            );
          }
        },
        {
          label: "操作账户",
          prop: "creator"
        },
        {
          label: "操作时间",
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.createTime)}</span>;
          }
        }
      ],
      tableData: [],
      tableParams: {
        page: 0,
        limit: 10
      },
      searchItem: {
        account: "",
        sn: ""
      },
      types: [
        { name: "截屏", val: 0 },
        { name: "重启", val: 1 },
        { name: "获取运行日志", val: 2 },
        { name: "磁盘清理", val: 4 }
      ],
      statuses: [
        { name: "失败", val: 0 },
        { name: "成功", val: 1 },
        { name: "待执行", val: 2 }
      ]
    };
  },
  methods: {
    callServer(pagination) {
      return getCommandPage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.commandTable.pagination.page = 0;
      this.$refs.commandTable.currentPage = 1;
      this.$refs.commandTable.fecthData();
    },
    search() {
      this.tableParams.account = this.searchItem.account;
      this.tableParams.sn = this.searchItem.sn;
      this.getData();
    },
    typeChange(val) {
      this.tableParams.type = val;
      this.search();
    },
    statusChange(val) {
      this.tableParams.status = val;
      this.search();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>