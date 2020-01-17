<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :call-server="callServer"
      :props-data="tableData"
      :muti="false"
      ref="areaTable"
    >
      <template slot="tableHeader">
        <div style="margin: 15px 0;">
          <v-select
            :placeholder="`区域类型`"
            @optionChange="areaChange"
            :options="areas"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <v-select
            :placeholder="`状态`"
            @optionChange="statusChange"
            :options="statuses"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
          <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
            <el-input placeholder="区域名称" v-model.trim="name" @keyup.enter.native="search" clearable></el-input>
          </div>
        </div>
      </template>
    </basic-table>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import { regionPage } from "../../api/system";
export default {
  components: {
    basicTable
  },
  data() {
    return {
      loading: true,
      columns: [
        { label: "省", prop: "province" },
        { label: "市", prop: "city" },
        { label: "区", prop: "district" },
        { label: "编号", prop: "key" },
        {
          label: "状态",
          prop: "status",
          render(h, row) {
            return <span>{row.status == 1 ? "已确认" : "未确认"}</span>;
          }
        }
      ],
      tableData: [],
      tableParams: {
        limit: 10,
        page: 0
      },
      areas: [
        {
          name: "省",
          val: 0
        },
        {
          name: "市",
          val: 1
        },
        {
          name: "区",
          val: 2
        }
      ],
      statuses: [{ name: "未确认", val: 0 }, { name: "已确认", val: 1 }],
      name: ""
    };
  },
  methods: {
    callServer(pagination) {
      return regionPage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.areaTable.pagination.page = 0;
      this.$refs.areaTable.currentPage = 1;
      this.$refs.areaTable.fecthData();
    },
    areaChange(val) {
      this.tableParams.type = val;
      this.search();
    },
    statusChange(val) {
      this.tableParams.status = val;
      this.search();
    },
    search() {
      this.tableParams.name = this.name;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>