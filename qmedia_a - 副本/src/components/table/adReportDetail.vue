<template>
  <div>
    <dialog-table
      :loading="loading"
      :columns="columns"
      :props-data="dialogTata"
      :muti="false"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></dialog-table>

    <v-dialog :width="`50%`" ref="adReportDialog" :showFooter="false" :title="`广告预览`">
      <program-form :data="detailRow"></program-form>
    </v-dialog>
  </div>
</template>

<script>
import dialogTable from "./components/dialogTable";
import { getProgramDetail } from "../../api/report";
import { getProgramReview } from "@/api/order";
import programForm from "@/components/form/programForm";
export default {
  components: {
    dialogTable,
    programForm
  },
  props: {
    dialogTata: Array,
    total: Number,
    loading: Boolean
  },
  data() {
    return {
      columns: [
        {
          label: "广告名称",
          overflow: true,
          render: (h, row) => {
            return (
              <span
                onClick={() => this.review(row)}
                class={row.programDel == 1 ? "txt-red" : "btn-detail"}
              >
                {this.$filters.filterPrograms(row.programName, row.programDel)}
              </span>
            );
          }
        },
        {
          label: "广告时长(s)",
          prop: "programDuration",
          width: 100
        },
        {
          label: "发布终端数",
          prop: "deviceCount",
          width: 100
        },
        {
          label: "播放时长",
          prop: "duration",
          width: 150,
          render: (h, row) => {
            return <span>{this.$filters.formatSeconds(row.duration)}</span>;
          }
        },
        {
          label: "企业代码",
          prop: "ck",
          width: 150
        },
        {
          label: "企业名称",
          prop: "companyName"
        }
      ],
      tableData: [],
      detailRow: {}
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    review(e) {
      console.log(e);
      getProgramReview(e.programId).then(res => {
        this.detailRow = res;
        this.$refs.adReportDialog.dialogVisible = true;
        this.programContent = {};
        this.programContent.content = JSON.parse(res.content).pages;
        this.programContent.pixelHorizontal = res.width;
        this.programContent.pixelVertical = res.height;
        this.programContent.programDialogType = 1;
        this.$store.commit("SET_PROGRAM_CONTENT", this.programContent);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>