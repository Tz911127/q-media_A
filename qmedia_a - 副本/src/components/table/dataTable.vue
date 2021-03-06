<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="dataTable"
    >
      <template slot="tableHeader">
        <div style="margin:15px 0">
          <v-select :placeholder="`业务类型`" @optionChange="typeChange" :options="types"></v-select>
          <v-select :placeholder="`报表状态`" @optionChange="statusChange" :options="statuses"></v-select>
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd"
            @change="dateChange"
          ></el-date-picker>
          <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="操作账户"
              v-model.trim="creator"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper searchInput">
            <el-input placeholder="报表名称" v-model.trim="name" @keyup.enter.native="search" clearable></el-input>
          </div>
        </div>
        <div style="margin:15px 0">
          <el-button type="success" style="margin-right:15px" @click="addReport">添加报表</el-button>
        </div>
      </template>
    </basic-table>
    <v-dialog
      ref="addReport"
      :title="title==0?'添加报表':'查看导出条件'"
      :showFooter="title==0?true:false"
      @handleClose="handleClose"
    >
      <add-report ref="addReportForm" v-if="title==0"></add-report>
      <report-form v-else :termForm="termForm"></report-form>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import addReport from "../form/addReport";
import reportForm from "../form/reportForm";
import { getReportJob, delReportJob, postReportJob } from "@/api/report.js";
const FileSaver = require("file-saver");
export default {
  components: {
    basicTable,
    addReport,
    reportForm
  },
  data() {
    return {
      loading: false,
      title: 0,
      tableParams: {
        limit: 10,
        page: 0
      },
      columns: [
        {
          label: "业务类型",
          render(h, row) {
            return (
              <span>
                {row.bizType == 0 ? "终端" : row.bizType == 1 ? "广告" : "合同"}
              </span>
            );
          }
        },
        { label: "报表名称", overflow: true, prop: "name" },
        {
          label: "报表日期",
          overflow: true,
          render: (h, row) => {
            return (
              <span>
                {this.$filters.formateDate(row.start)}至
                {this.$filters.formateDate(row.end)}
              </span>
            );
          }
        },
        {
          label: "报表状态",
          prop: "status",
          render(h, row) {
            return (
              <span>
                {row.status == 0
                  ? "处理中"
                  : row.status == 1
                  ? "已完成"
                  : "失败"}
              </span>
            );
          }
        },
        {
          label: "创建时间",
          overflow: true,
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.createTime)}</span>;
          }
        },
        { label: "操作账户", prop: "creator" },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "查看",
                icon: "el-icon-view",
                method: () => this.review(row)
              },
              {
                isShow: row.status == 1 ? true : false,
                title: "下载",
                icon: "el-icon-download",
                method: row => {
                  FileSaver.saveAs(
                    this.userInfo.cdnImgUrl + row.path,
                    row.name + row.start + "-" + row.end
                  );
                }
              },
              {
                isShow: row.status != 0 ? true : false,
                title: "删除",
                icon: "el-icon-delete",
                method: () => this.deleteRow(row)
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
      tableData: [
        {
          type: "1"
        }
      ],
      types: [
        {
          name: "终端",
          val: 0
        },
        {
          name: "广告",
          val: 1
        },
        {
          name: "合同",
          val: 2
        }
      ],
      statuses: [
        {
          name: "已完成",
          val: 1
        },
        {
          name: "失败",
          val: 2
        },
        {
          name: "处理中",
          val: 0
        }
      ],
      dateValue: "",
      name: "",
      creator: "",
      termForm: {}
    };
  },
  methods: {
    callServer(pagination) {
      return getReportJob(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.dataTable.pagination.page = 0;
      this.$refs.dataTable.currentPage = 1;
      this.$refs.dataTable.fecthData();
    },
    review(row) {
      this.title = 1;
      this.$refs.addReport.dialogVisible = true;
      this.termForm = row;
    },
    deleteRow(row) {
      let that = this;
      this.confirm(`确定删除` + row.name + `？`, "删除", {
        request: () => {
          return delReportJob(row);
        },
        success() {
          that.getData();
          that.toast("操作成功", "success");
        }
      });
    },
    typeChange(val) {
      this.tableParams.bizType = val;
      this.search();
    },
    statusChange(val) {
      this.tableParams.status = val;
      this.search();
    },
    dateChange(val) {
      if (val) {
        this.tableParams.start = val[0];
        this.tableParams.end = val[1];
      } else {
        this.tableParams.start = "";
        this.tableParams.end = "";
      }
      this.search();
    },
    search() {
      this.tableParams.creator = this.creator;
      this.tableParams.name = this.name;
      this.getData();
    },
    addReport() {
      this.title = 0;
      this.$refs.addReport.dialogVisible = true;
    },
    handleClose() {
      let reportForm = this.$refs.addReportForm.reportForm;
      this.$refs.addReportForm.$refs.ruleForm.validate(data => {
        if (data) {
          let params = {
            name: reportForm.name,
            bizType: reportForm.typeValue,
            bizDetail:
              reportForm.typeValue == 2
                ? "-1"
                : reportForm.typeValue == 1
                ? reportForm.adValue
                : reportForm.workValue,
            countType: reportForm.reportValue,
            start: reportForm.timeValue[0],
            end: reportForm.timeValue[1],
            ck: reportForm.ck,
            deviceSn: reportForm.deviceSn,
            programName: reportForm.programName
          };
          postReportJob(params).then(res => {
            this.$refs.addReport.dialogVisible = false;
            this.toast("创建成功", "success");
            this.getData();
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>