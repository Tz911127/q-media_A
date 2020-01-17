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
  </div>
</template>

<script>
import dialogTable from "./components/dialogTable";
import { getProgramDetail } from "../../api/report";
export default {
  components: {
    dialogTable
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
              <span   class={row.programDel == 1 ? "txt-red" : "btn-detail"}>
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
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>