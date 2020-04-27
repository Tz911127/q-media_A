<template>
  <div>
    <div style="margin: 15px 0;">
      <v-select :placeholder="`内容类型`" @optionChange="typeChange" :options="types" ref="navType"></v-select>
      <v-select
        :placeholder="`审核类型`"
        @optionChange="checkTypeChange"
        :options="checkTypes"
        ref="checkType"
      ></v-select>
      <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
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
          placeholder="内容名称"
          v-model.trim="searchObj.targetName"
          @keyup.enter.native="search"
          clearable
        ></el-input>
      </div>
    </div>
    <dialog-table
      :loading="loading"
      :columns="columns"
      :props-data="data"
      :muti="false"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></dialog-table>
    <v-dialog
      :width="`50%`"
      @closed="closed"
      :title="rowData.type==0?'素材预览':'节目预览'"
      :showFooter="tab>3?false:true"
      :cancelBtnTxt="`不通过`"
      :confirmBtnTxt="`通过`"
      :isBody="true"
      ref="detail"
      @handleClose="handleClose"
      @close="close"
    >
      <meterial-form v-if="rowData.type==0" :data="detailRow" @click="click"></meterial-form>
      <program-form v-else :data="detailRow"></program-form>
      <el-dialog
        width="30%"
        title="审核不通过原因"
        :visible.sync="innerVisible"
        append-to-body
        :before-close="beforeClose"
      >
        <el-input type="textarea" :rows="2" placeholder="请输入审核不通过的原因" v-model.trim="textarea"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="beforeClose">取 消</el-button>
          <el-button type="success" @click="submitPass">确 定</el-button>
        </span>
      </el-dialog>
    </v-dialog>
    <div class="image-view" v-if="flag" @click="click">
      <div class="img-box">
        <img :src="imgPathFormate(detailRow.path)" width="100%" height="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import dialogTable from "./components/dialogTable";
import meterialForm from "@/components/form/meterialForm";
import programForm from "@/components/form/programForm";
import screenfull from "screenfull";
import { getCheckDetail } from "@/api/audit";
export default {
  components: {
    dialogTable,
    meterialForm,
    programForm
  },
  props: {
    data: Array,
    total: Number,
    loading: Boolean,
    tab: Number
  },
  data() {
    return {
      columns: [
        {
          label: "名称",
          prop: "name",
          overflow: true
        },
        {
          label: "类型",
          render(h, row) {
            return <span>{row.type == 0 ? "素材" : "节目"}</span>;
          }
        },
        {
          label: "企业代码",
          prop: "ck"
        },
        {
          label: "企业名称",
          prop: "ck"
        },
        {
          label: "审核状态",
          render(h, row) {
            return (
              <span>
                {row.status == 1
                  ? "审核成功"
                  : row.status == 2
                  ? "内部审核中"
                  : row.status == 3
                  ? "平台审核中"
                  : row.status == 4
                  ? "内部审核失败"
                  : "审核失败（平台）"}
              </span>
            );
          }
        },
        {
          label: "提交时间",
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.submitTime)}</span>;
          }
        },
        {
          label: "审核账号",
          prop: "lastChecker"
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "详情",
                icon: "el-icon-tickets",
                method: () => this.detail(row)
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
      types: [
        {
          name: "素材",
          val: 0
        },
        {
          name: "节目",
          val: 1
        }
      ],
      checkTypes: [
        { name: "平台审核", val: 0 },
        { name: "CCTV审核", val: 1 }
      ],
      searchObj: {
        ck: "",
        targetName: ""
      },
      detailRow: {},
      rowData: {},
      flag: false,
      innerVisible: false,
      textarea: ""
    };
  },

  methods: {
    detail(row) {
      this.rowData = row;
      getCheckDetail(row).then(res => {
        this.$refs.detail.dialogVisible = true;
        this.detailRow = res;
        if (row.type == 1) {
          this.programContent = {};
          this.programContent.content = JSON.parse(res.content).pages;
          this.programContent.pixelHorizontal = res.width;
          this.programContent.pixelVertical = res.height;
          this.programContent.programDialogType = 1;
          this.$store.commit("SET_PROGRAM_CONTENT", this.programContent);
        }
      });
    },
    beforeClose() {
      this.textarea = "";
      this.innerVisible = false;
    },
    typeChange(val) {
      this.$emit("typeChange", val);
    },
    checkTypeChange(val) {
      this.$emit("checkTypeChange", val);
    },
    search() {
      this.$emit("search", this.searchObj);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    closed() {
      this.detailRow.path = "";
    },
    click() {
      screenfull.toggle();
      screenfull.on("change", () => {
        if (screenfull.isFullscreen) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
    },
    handleClose() {
      this.$refs.detail.dialogVisible = false;
      this.$emit("handleClose", this.rowData);
    },
    close() {
      this.innerVisible = true;
    },
    submitPass() {
      if (this.textarea == "") {
        this.$message.error("请输入审核不通过原因");
      } else {
        this.innerVisible = false;
        this.$refs.detail.dialogVisible = false;
        let params = {
          id: this.rowData.id,
          reject: 1,
          reason: this.textarea
        };
        this.$parent.$parent.$parent.sentData(params);
      }
    }
  },
  computed: {
    changeTab() {
      return this.tab;
    }
  },
  watch: {
    changeTab(val) {
      this.$refs.navType.value = "";
      this.$refs.checkType.value = "";
      this.searchObj.ck = "";
      this.searchObj.targetName = "";
    }
  }
};
</script>

<style >
@import "../../style/card.css";
</style>