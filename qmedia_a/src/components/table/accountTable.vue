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
          <div style="margin:15px 0">
            <el-button type="success" @click="createAccount">
              <i class="el-icon-plus"></i> 添加账户
            </el-button>
          </div>
        </div>
      </template>
    </basic-table>
    <!-- 弹窗 -->
    <v-dialog
      ref="accountDialog"
      :title="title == 0?'修改密码':title == 1?'添加账户':'编辑账户'"
      @handleClose="handleClose"
      @beforeClose="beforeClose"
    >
      <div v-if="title==0">
        <el-form
          :model="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
          ref="ruleForm"
          :rules="rules"
        >
          <el-form-item label="新密码" prop="newPassWord">
            <el-input v-model.trim="ruleForm.newPassWord" clearable placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="title == 1||title==2">
        <account-form ref="accountForm" :editData="accountData" :title="title"></account-form>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import accountForm from "../form/accountForm";
import {
  getUserPage,
  patchEnable,
  patchPassWord,
  postUser,
  patchUser
} from "@/api/role";
export default {
  components: {
    basicTable,
    accountForm
  },
  data() {
    let validatorPass = (rule, value, callback) => {
      let rex = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
      if (value == "") {
        callback(new Error("请输入登录密码"));
      } else if (!rex.test(value)) {
        callback(new Error("请输入6-20位数字、字母组合"));
      } else {
        callback();
      }
    };
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
            return <span>{row.role ? row.role.name : ""}</span>;
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
                icon: this.icon(row),
                method: () => this.isEnable(row)
              },
              {
                isShow: true,
                title: "重置密码",
                icon: "el-icon-brush",
                method: () => this.changeWord(row)
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
      ],
      title: 0,
      ruleForm: {
        newPassWord: ""
      },
      rules: {
        newPassWord: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位数字、字母组合",
            trigger: "blur"
          },
          { validator: validatorPass }
        ]
      },
      rowData: {},
      accountData: {}
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
    },
    createAccount() {
      this.title = 1;
      this.$refs.accountDialog.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.accountForm.$refs.ruleForm.resetFields();
        this.$refs.accountForm.noticeType = [];
        this.$refs.accountForm.signContract1 = "1";
        this.$refs.accountForm.warn = false;
        this.$refs.accountForm.signContract = false;
        this.$refs.accountForm.ruleForm = {
          type: 1,
          noticeType: [],
          role: ""
        };
      });
    },
    icon(row) {
      return row.enabled == 1 ? "el-icon-lock" : "el-icon-unlock";
    },
    isEnable(row) {
      let params = {
        id: row.id,
        enable: row.enabled == 0 ? 1 : 0
      };
      let that = this;
      this.confirm("确定切换账号状态？", "", {
        request: () => {
          return patchEnable(params);
        },
        success() {
          that.getData();
          that.toast("操作成功", "success");
        }
      });
    },
    changeWord(row) {
      this.$refs.accountDialog.dialogVisible = true;
      this.title = 0;
      this.rowData = row;
    },
    beforeClose() {
      this.ruleForm.newPassWord = "";
    },
    handleClose() {
      if (this.title == 0) {
        this.$refs.ruleForm.validate(valid => {
          let params = {
            id: this.rowData.id,
            passWord: this.ruleForm.newPassWord
          };
          patchPassWord(params).then(res => {
            this.getData();
            this.toast("操作成功", "success");
            this.$refs.accountDialog.dialogVisible = false;
            this.ruleForm.newPassWord = "";
          });
        });
      } else if (this.title == 1) {
        this.$refs.accountForm.$refs.ruleForm.validate(valid => {
          let params = Object.assign({}, this.$refs.accountForm.ruleForm);
          let warn = this.$refs.accountForm.warn;
          let noticeType = this.$refs.accountForm.noticeType;

          params.roleId = params.role.id;
          params.ck = params.ck;
          noticeType.indexOf("0") > -1
            ? (params.checkNotice = 1)
            : (params.checkNotice = 0);
          noticeType.indexOf("1") > -1
            ? (params.contractCheckNotice = 1)
            : (params.contractCheckNotice = 0);
          noticeType.indexOf("2") > -1
            ? (params.orderCheckNotice = 1)
            : (params.orderCheckNotice = 0);
          if (params.type == 2) {
            if (warn) {
              params.checkNotice = 1;
            } else {
              params.checkNotice = 0;
            }
          } else {
            if (warn) {
              params.smsNotice = 1;
            } else {
              params.smsNotice = 0;
            }
          }
          if (params.type == 3) {
            params.signContract =
              this.$refs.accountForm.signContract1 == "1" ? 1 : 2;
          } else if (params.type == 0) {
            params.signContract = params.signContract == true ? 2 : 0;
          } else if (params.type == 1) {
            params.signContract = params.signContract == true ? 1 : 0;
          }

          postUser(params).then(res => {
            this.getData();
            this.toast("操作成功", "success");
            // this.$refs.accountForm.noticeType = [];
            // this.$refs.accountForm.signContract1 = "1";
            // this.$refs.accountForm.warn = false;
            // this.$refs.accountForm.signContract = false;
            this.$refs.accountDialog.dialogVisible = false;
          });
        });
      } else {
        //编辑
        let params = Object.assign({}, this.$refs.accountForm.ruleForm);
        let noticeType = this.$refs.accountForm.noticeType;

        noticeType.indexOf("0") > -1
          ? (params.checkNotice = 1)
          : (params.checkNotice = 0);
        noticeType.indexOf("1") > -1
          ? (params.contractCheckNotice = 1)
          : (params.contractCheckNotice = 0);
        noticeType.indexOf("2") > -1
          ? (params.orderCheckNotice = 1)
          : (params.orderCheckNotice = 0);
        if (params.type == 3) {
          params.signContract =
            this.$refs.accountForm.signContract1 == "1" ? 1 : 2;
        } else if (params.type == 0) {
          // params.signContract = params.signContract == true ? 2 : 0;
          params.signContract =
            this.$refs.accountForm.signContract == true ? 2 : 0;
        } else if (params.type == 1) {
          params.signContract = params.signContract == true ? 1 : 0;
        } else if (params.type == 2) {
          params.checkNotice = this.$refs.accountForm.warn == true ? 1 : 0;
        }

        patchUser(params).then(res => {
          this.getData();
          this.toast("操作成功", "success");
          // this.$refs.accountForm.noticeType = [];
          // this.$refs.accountForm.signContract1 = "1";
          // this.$refs.accountForm.warn = false;
          // this.$refs.accountForm.signContract = false;
          this.$refs.accountDialog.dialogVisible = false;
        });
      }
    },
    edit(row) {
      console.log(row);
      this.title = 2;
      this.accountData = Object.assign({}, row);
      this.$refs.accountDialog.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.accountForm.$refs.ruleForm.clearValidate();
        this.$refs.accountForm.blurOrz();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>