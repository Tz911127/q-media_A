<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :call-server="callServer"
      :muti="false"
      ref="addReport"
    ></basic-table>
    <v-dialog ref="reportDetail" :showFooter="false" :title="`详情`" :width="`70%`">
      <ad-report-detail
        :dialogTata="dialogTata"
        :total="dialogTotal"
        :loading="dialogLoading"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></ad-report-detail>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import adReportDetail from "./adReportDetail";
import { getProgramPage, getProgramDetail } from "../../api/report";
export default {
  components: {
    basicTable,
    adReportDetail
  },
  data() {
    return {
      loading: false,
      dialogLoading: false,
      columns: [
        {
          label: "时间",
          render: (h, row) => {
            return <span>{this.$filters.formateDate(row.m)}</span>;
          }
        },
        { label: "广告数", prop: "programCount" },
        { label: "发布终端数", prop: "deviceCount" },
        {
          label: "播放时长（时：分：秒）",
          prop: "duration",
          render: (h, row) => {
            return <span>{this.$filters.formatSeconds(row.duration)}</span>;
          }
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "查看",
                icon: "el-icon-view",
                method: () => this.review(row)
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
      dialogData: {
        limit: 10,
        page: 0
      },
      dialogTata: [],
      dialogTotal: 0
    };
  },
  methods: {
    review(row) {
      this.$refs.reportDetail.dialogVisible = true;
      this.dialogData.month = row.m;
      this.dialogData.limit = 10;
      this.dialogData.page = 0;
      this.getProgramDetailData();
    },
    getProgramDetailData() {
      this.dialogLoading = true;
      getProgramDetail(this.dialogData).then(res => {
        this.dialogTata = res.data;
        this.dialogTotal = res.total;
        this.dialogLoading = false;
      });
    },
    callServer(pagination) {
      return getProgramPage(Object.assign(this.tableParams, pagination));
    },
    handleSizeChange(val) {
      this.dialogData.limit = val;
      this.getProgramDetailData();
    },
    handleCurrentChange(val) {
      this.dialogData.page = val - 1;
      this.getProgramDetailData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>