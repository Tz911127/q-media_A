<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="contractTable"
    >
      <template slot="tableHeader">
        <div style="margin:15px 0">
          <v-select :placeholder="`合同状态`" @optionChange="contractChange" :options="contracts"></v-select>
          <el-button
            style="float:right;margin-right:10px"
            type="warning"
            icon="el-icon-search"
            @click="search"
          >查询</el-button>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="合同编号"
              v-model.trim="searchObj.contractNo"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="企业代码"
              v-model.trim="searchObj.ck"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="广告主/合伙人账户"
              v-model.trim="searchObj.firstOrSecAccount"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
        </div>
      </template>
    </basic-table>
    <!-- 弹窗 -->
    <v-dialog
      ref="contractDialog"
      :width="`50%`"
      :title="title==0?'合同预览':title==1?'订单预览':'合同审核'"
      :showFooter="false"
    >
      <contract-form
        v-if="title==0||title==2"
        :data="contractObj"
        :footer="footer"
        @checkPass="checkPass"
        @notPass="notPass"
      ></contract-form>
      <v-dialog ref="innerVisible" :title="`取消此合同原因`" @handleClose="handleClose">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      </v-dialog>
      <dialog-table
        v-if="title==1"
        :loading="dialogLoading"
        :columns="dialogColumns"
        :props-data="dialogData"
        :muti="false"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></dialog-table>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import dialogTable from "./components/dialogTable";
import contractForm from "../form/contractForm";
import {
  getContractPage,
  getContractDetail,
  patchContract,
  getListOrder
} from "@/api/contract";
export default {
  components: {
    basicTable,
    contractForm,
    dialogTable
  },
  data() {
    return {
      loading: true,
      columns: [
        {
          label: "合同编号",
          width: "200",
          render: (h, row) => {
            return (
              <div onClick={() => this.contractDetail(row)}>
                {" "}
                <span class="btn-detail">{row.contractNo}</span>
              </div>
            );
          }
        },
        {
          label: "企业代码",
          prop: "ck_sec"
        },
        {
          label: "合伙人账户",
          prop: "secAccountAndName",
          width: "200"
        },
        {
          label: "广告主账户",
          prop: "firstAccountAndName",
          width: "200"
        },
        {
          label: "合同金额",
          render(h, row) {
            return <span>￥{(row.money_small / 100).toFixed(2)}</span>;
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
        {
          label: "订单数",

          render: (h, row) => {
            return (
              <div onClick={() => this.contractNum(row)}>
                <span class="btn-detail">{row.orderNum}</span>
              </div>
            );
          }
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: this.perms("71"),
                title: "下载",
                icon: "el-icon-download",
                method: row => {
                  window.open(row.cdnContractUrl);
                }
              },
              {
                isShow: row.state == 1 ? true : false,
                title: "审核",
                icon: "el-icon-tickets",
                method: () => this.checkContract(row)
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
        contractNo: "",
        ck: "",
        firstOrSecAccount: ""
      },
      contracts: [
        { name: "待签署", val: 0 },
        { name: "待付款", val: 1 },
        { name: "已付款", val: 2 },
        { name: "已关闭", val: 3 }
      ],
      title: 0,
      footer: false,
      contractObj: {},
      textarea: "",
      dialogParams: {
        limit: 10,
        page: 0
      },
      dialogLoading: true,
      dialogColumns: [
        { label: "订单编号", prop: "orderNo", width: "200" },
        { label: "订单名称", prop: "remark" },
        { label: "创建账户", prop: "creatorAccount" },
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
                  : row.status == 5
                  ? "审核不通过"
                  : ""}
              </span>
            );
          }
        }
      ],
      dialogData: [],
      total: 0,
      contractRow: {}
    };
  },

  methods: {
    callServer(pagination) {
      return getContractPage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.contractTable.pagination.page = 0;
      this.$refs.contractTable.currentPage = 1;
      this.$refs.contractTable.fecthData();
    },
    contractDetail(row) {
      this.title = 0;
      this.footer = false;
      this.getContractObj(row);
    },
    search() {
      this.tableParams.ck = this.searchObj.ck;
      this.tableParams.contractNo = this.searchObj.contractNo;
      this.tableParams.firstOrSecAccount = this.searchObj.firstOrSecAccount;
      this.getData();
    },
    contractChange(val) {
      this.tableParams.state = val;
      this.search();
    },
    checkContract(row) {
      this.title = 2;
      this.footer = true;
      this.getContractObj(row);
    },
    getContractObj(row) {
      let params = {
        id: row.id
      };
      getContractDetail(params)
        .then(res => {
          this.$refs.contractDialog.dialogVisible = true;
          this.contractObj = res;
        })
        .catch(err => {});
    },
    checkPass() {
      let that = this;
      let params = {
        status: 2,
        id: this.contractObj.id
      };
      this.confirm(`确定已收款？`, "", {
        request: () => {
          return patchContract(params);
        },
        success() {
          that.$refs.contractDialog.dialogVisible = false;
          that.toast("操作成功", "success");
          that.getData();
        }
      });
    },
    notPass() {
      this.textarea = "";
      this.$refs.innerVisible.dialogVisible = true;
    },
    handleClose() {
      if (this.textarea == "") {
        this.toast("请输入取消此合同的原因", "error");
        return;
      }
      let params = {
        status: 3,
        id: this.contractObj.id,
        reason: this.textarea
      };
      patchContract(params).then(res => {
        this.getData();
        this.$refs.innerVisible.dialogVisible = false;
        this.$refs.contractDialog.dialogVisible = false;
        this.toast("操作成功", "success");
      });
    },
    contractNum(row) {
      this.$refs.contractDialog.dialogVisible = true;
      this.title = 1;
      this.contractRow = row;
      this.dialogParams.page = 0;
      this.dialogParams.limit = 10;
      this.getOrderList();
    },
    getOrderList() {
      this.dialogLoading = true;
      this.dialogParams.contractId = this.contractRow.id;
      getListOrder(this.dialogParams).then(res => {
        this.dialogData = res.data;
        this.total = res.total;
        this.dialogLoading = false;
      });
    },
    handleSizeChange(val) {
      this.dialogParams.limit = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.dialogParams.page = val - 1;
      this.getOrderList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>