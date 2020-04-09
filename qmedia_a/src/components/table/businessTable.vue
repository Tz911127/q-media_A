<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="businessTable"
    >
      <template slot="tableHeader">
        <div style="margin:15px 0 ">
          <v-select
            :placeholder="`账户状态`"
            @optionChange="enabledChange"
            :options="enableds"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <v-select
            :placeholder="`企业类型`"
            @optionChange="typeChange"
            :options="types"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <v-select
            :placeholder="`认证状态`"
            @optionChange="authChange"
            :options="auths"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
          <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
            <el-input
              placeholder="企业代码/企业简称"
              v-model.trim="keyOrName"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
        </div>
        <div style="margin:15px 0">
          <el-button type="success">
            <i class="el-icon-plus" @click="addBusiness"></i>添加企业
          </el-button>
        </div>
      </template>
    </basic-table>
    <v-dialog
      ref="businessDialog"
      :title="title==0?'认证信息':'设置垫播广告'"
      :showFooter="false"
      :width="title==0?'30%':'50%'"
    >
      <auth-form v-if="title == 0" :authRow="authRow"></auth-form>
      <fill-table
        v-else
        :fillData="fillData"
        @handleClick="handleClick"
        @setProgram="setProgram"
        :loading="fillLoading"
        :adData="adData"
        ref="fillDialog"
      ></fill-table>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import authForm from "../form/authForm";
import fillTable from "./fillTable";
import {
  getCompanyPage,
  patchEnable,
  getCompanyFill,
  delCompanyFill,
  getCompanyFillList,
  setCompanyFill
} from "@/api/business";
export default {
  components: {
    basicTable,
    authForm,
    fillTable
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          label: "企业类型",
          render(h, row) {
            return <span>{row.type == 0 ? "合伙人" : "广告主"}</span>;
          }
        },
        { label: "企业代码", prop: "key" },
        { label: "企业简称", prop: "name", overflow: true },
        {
          label: "账户状态",
          render(h, row) {
            return <span>{row.enabled == 0 ? "冻结" : "可用"}</span>;
          }
        },
        {
          label: "认证状态",
          render: (h, row) => {
            return (
              <span
                class={row.auth == 1 ? "btn-detail" : ""}
                onClick={() => this.authDialog(row)}
              >
                {row.auth == 0 ? "未认证" : "已认证"}
              </span>
            );
          }
        },
        { label: "操作账户", prop: "creator" },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "编辑",
                icon: "el-icon-edit",
                method: () => this.editBusiness(row)
              },
              {
                isShow: true,
                title: row.enabled == 0 ? "启用" : "冻结",
                icon: row.enabled == 0 ? "el-icon-unlock" : "el-icon-lock",
                method: () => this.enableBusiness(row)
              },
              {
                isShow: row.type == 0 ? true : false,
                title: "设置组织机构",
                icon: "el-icon-tickets",
                method: () => {
                  this.$router.push({
                    path: "/org",
                    query: { row: JSON.stringify(row) }
                  });
                }
              },
              {
                isShow: row.type == 0 ? true : false,
                title: "设置垫播",
                icon: "el-icon-files",
                method: () => this.setFill(row)
              }
            ];
            return h("table-operate", {
              attrs: {
                operateList: operateList,
                rowData: row,
                width: "150px"
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
      title: 0,
      authRow: {},
      enableds: [
        { name: "可用", val: 1 },
        { name: "冻结", val: 0 }
      ],
      keyOrName: "",
      types: [
        { name: "合伙人", val: 0 },
        { name: "广告主", val: 1 }
      ],
      auths: [
        { name: "未认证", val: 0 },
        { name: "已认证", val: 1 }
      ],
      fillData: [],
      row: {},
      adData: [],
      fillLoading: true
    };
  },
  methods: {
    getData() {
      this.$refs.businessTable.pagination.page = 0;
      this.$refs.businessTable.currentPage = 1;
      this.$refs.businessTable.fecthData();
    },
    callServer(pagination) {
      return getCompanyPage(Object.assign(this.tableParams, pagination));
    },
    authDialog(row) {
      if (row.auth == 1) {
        this.title = 0;
        this.$refs.businessDialog.dialogVisible = true;
        this.authRow = row;
      }
    },
    editBusiness(row) {},
    enableBusiness(row) {
      let that = this;
      this.confirm(`确认切换账号状态？`, "", {
        request: () => {
          let params = {
            id: row.id,
            enable: row.enabled == 0 ? 1 : 0
          };
          return patchEnable(params);
        },
        success() {
          that.getData();
          that.toast("操作成功", "success");
        }
      });
    },

    setFill(row) {
      this.title = 1;
      this.$refs.businessDialog.dialogVisible = true;
      this.fillLoading = true;
      getCompanyFill(row).then(res => {
        this.fillLoading = false;
        this.fillData = [
          { id: "", resolutionType: 0, name: "" },
          { id: "", resolutionType: 1, name: "" }
        ];
        this.row = row;
        if (res.length != 0) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].resolutionType == 0) {
              this.fillData[0] = res[i];
            } else {
              this.fillData[1] = res[i];
            }
          }
        }
      });
    },
    handleClick(index, row) {
      if (index == 1) {
        let that = this;
        if (row.id == "") {
          return;
        }
        this.confirm(`确定删除此广告`, "", {
          request: () => {
            let params = {
              id: this.row.id,
              resolutionType: row.resolutionType
            };
            return delCompanyFill(params);
          },
          success() {
            that.toast("操作成功", "success");
            that.$refs.businessDialog.dialogVisible = false;
          }
        });
      } else {
        let params = {
          ck: this.row.key,
          resolutionType: row.resolutionType
        };
        getCompanyFillList(params).then(res => {
          this.adData = res.data;
        });
      }
    },
    setProgram(row) {
      let params = {
        id: this.row.id,
        type: row.id
      };
      setCompanyFill(params).then(res => {
        this.$refs.fillDialog.innerVisible = false;
        this.$refs.businessDialog.dialogVisible = false;
        this.getData();
      });
    },
    enabledChange(val) {
      this.tableParams.enabled = val;
      this.search();
    },
    typeChange(val) {
      this.tableParams.type = val;
      this.search();
    },
    authChange(val) {
      this.tableParams.auth = val;
      this.search();
    },
    search() {
      this.tableParams.keyOrName = this.keyOrName;
      this.getData();
    },
    addBusiness(){}
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>