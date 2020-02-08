<template>
  <div>
    <dialog-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :showFooter="false"
      ref="upTerminalTable"
    ></dialog-table>
  </div>
</template>
<script>
import dialogTable from "./components/dialogTable";
export default {
  components: {
    dialogTable
  },
  props: {
    dialogData: Array,
    dialogTotal: Number,
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableData: this.dialogData || [],
      columns: [
        { label: "版本名称", prop: "versionName" },
        {
          label: "文件类型",
          render(h, row) {
            return <span>{row.type == 0 ? "主程序" : "适配程序"}</span>;
          }
        },
        {
          label: "大小",
          render: (h, row) => {
            return <span>{this.$filters.programMb(row.size)}</span>;
          }
        },
        {
          label: "上传时间",
          prop: "createTime",
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.createTime)}</span>;
          }
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "升级",
                method: () => this.upDevice(row)
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
      total: this.dialogTotal
    };
  },
  methods: {
    upDevice(row) {
      this.$emit("upDevice", row);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  },
  mounted() {}
};
</script>