<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="roleTable"
    >
      <template slot="tableHeader">
        <div style="margin-bottom:15px">
          <v-select
            :placeholder="`账户类型`"
            @optionChange="typeChange"
            :options="types"
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
              placeholder="角色名称"
              v-model.trim="searchObj.name"
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
        </div>
      </template>
    </basic-table>
    <!-- 弹窗 -->
    <v-dialog ref="roleDialog" :title="title==0?'查看权限':''" :showFooter="false">
      <el-tree :data="rolePermData" default-expand-all :props="defaultProps"></el-tree>
    </v-dialog>
  </div>
</template>

<script>
import { getRolePage, getPermTree } from "@/api/role";
import basicTable from "./components/basicTable";
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
          prop: "ck"
        },
        {
          label: "角色名称",
          prop: "name"
        },
        {
          label: "角色说明",
          prop: "remark"
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "查看权限",
                icon: "el-icon-document-checked",
                method: () => this.permTree(row)
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
        ck: "",
        name: ""
      },
      types: [
        { val: 1, name: "A端账户" },
        { val: 0, name: "B端账户" },
        { val: 2, name: "CCTV账户" }
      ],
      title: 0,
      rolePermData: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    callServer(pagination) {
      return getRolePage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.roleTable.pagination.page = 0;
      this.$refs.roleTable.currentPage = 1;
      this.$refs.roleTable.fecthData();
    },
    permTree(row) {
      getPermTree(row.id).then(res => {
        this.$refs.roleDialog.dialogVisible = true;
        this.rolePermData = res;
      });
    },
    search() {
      this.tableParams.ck = this.searchObj.ck;
      this.tableParams.name = this.searchObj.name;
      this.getData();
    },
    typeChange(val) {
      this.tableParams.type = val;
      this.search();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>