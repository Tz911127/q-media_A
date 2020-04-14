<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="orderTable"
    >
      <template slot="tableHeader">
        <div style="margin-bottom:15px">
          <v-select
            :placeholder="`订单状态`"
            @optionChange="orderChange"
            :options="status"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <el-button
            style="float:right;margin-right:10px"
            type="warning"
            icon="el-icon-search"
            @click="search"
          >查询</el-button>
          <div class="select-wraper" style="float:right;margin-right:10px;width:160px">
            <el-input
              placeholder="合伙人/广告主账户"
              v-model.trim="searchObj.firstOrSecAccount"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>

          <div class="select-wraper" style="float:right;margin-right:10px;width:160px">
            <el-input
              placeholder="企业代码"
              v-model.trim="searchObj.ck"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper" style="float:right;margin-right:10px;width:160px">
            <el-input
              placeholder="订单编号/名称"
              v-model.trim="searchObj.orderNo"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper" style="float:right;margin-right:10px;width:160px">
            <el-input
              placeholder="合同编号"
              v-model.trim="searchObj.contractNo"
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
import { getorderPage } from "@/api/order";
import basicTable from "./components/basicTable";
export default {
  components: {
    basicTable
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          label: "订单编号",
          prop: "orderNo"
        },
        {
          label: "订单名称",
          prop: "remark"
        },
        {
          label: "企业代码",
          prop: "orderCk"
        },
        {
          label: "合伙人账号",
          prop: "secAccountAndName"
        },
        {
          label: "广告主账号",
          prop: "firstAccountAndName"
        },
        {
          label: "订单状态",
          render(h, row) {
            return (
              <span>
                {row.status == 0
                  ? "待审核"
                  : row.status == 1
                  ? "待播放"
                  : row.status == 2
                  ? "播放中"
                  : row.status == 3
                  ? "已停播"
                  : row.status == 4
                  ? "订单完成"
                  : "审核不通过"}
              </span>
            );
          }
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow:  this.perms("81"),
                title: "详情",
                icon: "el-icon-tickets",
                method: () => this.orderDetail(row)
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
      status: [
        { name: "待审核", val: 0 },
        { name: "待播放", val: 1 },
        { name: "播放中", val: 2 },
        { name: "已停播", val: 3 },
        { name: "订单完成", val: 4 },
        { name: "审核不通过", val: 5 }
      ],
      searchObj: {
        contractNo: "",
        orderNo: "",
        ck: "",
        firstOrSecAccount: ""
      }
    };
  },
  methods: {
    callServer(pagination) {
      return getorderPage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.orderTable.pagination.page = 0;
      this.$refs.orderTable.currentPage = 1;
      this.$refs.orderTable.fecthData();
    },
    orderDetail(row) {
      this.$emit("orderDetail", row);
    },
    orderChange(val) {
      this.tableParams.status = val;
      this.search();
    },
    search() {
      this.tableParams.contractNo = this.searchObj.contractNo;
      this.tableParams.orderNo = this.searchObj.orderNo;
      this.tableParams.ck = this.searchObj.ck;
      this.tableParams.firstOrSecAccount = this.searchObj.firstOrSecAccount;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>