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
        <div style="margin:15px 0">
          <el-button type="success" @click="createRole">
            <i class="el-icon-plus"></i> 添加角色
          </el-button>
        </div>
      </template>
    </basic-table>
    <!-- 弹窗 -->
    <v-dialog
      ref="roleDialog"
      :title="title==0?'查看权限':title==1?'添加角色':'编辑角色'"
      :showFooter="title==0?false:title==1?true:''"
      @handleClose="handleClose"
    >
      <el-tree v-if="title==0" :data="rolePermData" default-expand-all :props="defaultProps"></el-tree>
      <role-form
        v-if="title==1||title ==2"
        ref="roleForm"
        :propTree="treeData"
        :editData="editData"
        :title="title"
      ></role-form>
    </v-dialog>
  </div>
</template>

<script>
import {
  getRolePage,
  getPermTree,
  getRolePerm,
  postRole,
  delRole,
  getRolePermLeaf,
  patchRole
} from "@/api/role";
import basicTable from "./components/basicTable";
import roleForm from "../form/roleForm";
export default {
  components: {
    basicTable,
    roleForm
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
              },
              {
                isShow: row.category == 2 ? true : false,
                title: "编辑",
                icon: "el-icon-edit",
                method: () => this.editRoleRow(row)
              },
              {
                isShow: row.category == 2 ? true : false,
                title: "删除",
                icon: "el-icon-delete",
                method: () => this.delRoleRow(row)
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
      },
      treeData: [],
      editData: {}
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
      this.title = 0;
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
    },
    createRole() {
      this.title = 1;
      getRolePerm({ type: 1 }).then(res => {
        this.$refs.roleDialog.dialogVisible = true;
        this.treeData = res;
        this.$nextTick(() => {
          this.$refs.roleForm.ruleForm = {
            type: 1
          };
        });
      });
    },
    handleClose() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          let arr1 = this.$refs.roleForm.$refs.tree.getCheckedKeys();
          let arr2 = this.$refs.roleForm.$refs.tree.getHalfCheckedKeys();
          this.$refs.roleForm.ruleForm.functionIds = arr1.concat(arr2);
          if (this.$refs.roleForm.ruleForm.functionIds.length == 0) {
            this.toast("请选择权限", "error");
            return;
          }
          if (this.title == 1) {
            postRole(this.$refs.roleForm.ruleForm).then(res => {
              this.toast("创建成功", "success");
              this.getData();
            });
          } else {
            patchRole(this.$refs.roleForm.ruleForm).then(res => {
              this.toast("编辑成功", "success");
              this.getData();
            });
          }
          this.$refs.roleDialog.dialogVisible = false;
        }
      });
    },
    editRoleRow(row) {
      this.title = 2;
      let params = {
        type: row.type,
        ck: row.ck
      };

      this.$nextTick(() => {
        this.editData = Object.assign({}, row);
        getRolePerm(params).then(res => {
          this.treeData = res;
          getRolePermLeaf(row).then(res => {
            this.$nextTick(() => {
              this.$refs.roleForm.$refs.tree.setCheckedKeys(res);
            });
          });
          this.$refs.roleDialog.dialogVisible = true;
        });
      });
    },
    delRoleRow(row) {
      let that = this;
      this.confirm("是否删除此角色？", "删除", {
        request: () => {
          return delRole(row);
        },
        success() {
          that.getData();
          that.toast("操作成功", "success");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>