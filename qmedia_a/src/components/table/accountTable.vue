<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="accountTable"
    >
      <template slot="tableHeader">
        <div style="margin-bottom:15px">
          <v-select
            :placeholder="`账户类型`"
            @optionChange="typeChange"
            :options="types"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <v-select
            :placeholder="`账户状态`"
            @optionChange="enabledChange"
            :options="enableds"
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
              placeholder="邮箱"
              v-model.trim="searchObj.email"
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
              placeholder="登录账户/账户名称/手机号"
              v-model.trim="searchObj.roleName"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper" style="float:right;margin-right:10px;width:160px">
            <el-input
              placeholder="角色名称"
              v-model.trim="searchObj.accountName"
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
import { getUserPage } from "@/api/role";
export default {
  components: {
    basicTable
  },
  data() {
    return {
      loading: true,
      columns: [
        {
          label: "账户类型",
          render(h, row) {
            return (
              <span>
                {row.type == 0
                  ? "B端用户"
                  : row.type == 1
                  ? "A端用户"
                  : "CCTV用户"}
              </span>
            );
          }
        },
        {
          label: "企业代码",
          render(h, row) {
            return <span>{row.ck}</span>;
          }
        },
        {
          label: "登录账号",
          render(h, row) {
            return <span>{row.account}</span>;
          }
        },
        {
          label: "账号名称",
          prop: "name"
        },
        {
          label: "角色名称",
          render(h, row) {
            return <span>{row.role.name}</span>;
          }
        },
        {
          label: "账户状态",
          render(h, row) {
            return <span>{row.enabled == 1 ? "激活" : "禁用"}</span>;
          }
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "编辑",
                icon: "el-icon-edit",
                method: () => this.edit(row)
              },
              {
                isShow: true,
                title: "账户切换状态",
                icon: "el-icon-lock",
                method: () => this.edit(row)
              },
              {
                isShow: true,
                title: "重置密码",
                icon: "el-icon-brush",
                method: () => this.edit(row)
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
        page: 0,
        limit: 10
      },
      searchObj: {
        accountName: "",
        roleName: "",
        ck: "",
        email: ""
      },
      types: [
        { val: 1, name: "A端账户" },
        { val: 0, name: "B端账户" },
        { val: 2, name: "CCTV账户" },
        { val: 3, name: "广告主账户" }
      ],
      enableds: [
        { name: "禁用", val: 0 },
        { name: "激活", val: 1 }
      ]
    };
  },
  methods: {
    callServer(pagination) {
      return getUserPage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.accountTable.pagination.page = 0;
      this.$refs.accountTable.currentPage = 1;
      this.$refs.accountTable.fecthData();
    },
    search() {
      this.tableParams.accountName = this.searchObj.accountName;
      this.tableParams.roleName = this.searchObj.roleName;
      this.tableParams.ck = this.searchObj.ck;
      this.tableParams.email = this.searchObj.email;
      this.getData();
    },
    typeChange(val) {
      this.tableParams.type = val;
      this.search();
    },
    enabledChange(val) {
      this.tableParams.enabled = val;
      this.search();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>