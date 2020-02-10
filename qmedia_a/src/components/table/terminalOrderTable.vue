<template>
  <div>
    <basic-table
      :columns="columns"
      :call-server="callServer"
      :props-data="tableData"
      :muti="false"
      ref="terminalOrderTable"
    >
      <template slot="tableHeader">
        <div style="15px 0">
            
        </div>
      </template>
    </basic-table>
  </div>
</template>

<script>
import { terminalOrder } from "@/api/terminal";
import basicTable from "./components/basicTable";
export default {
  components: { basicTable },
  props: {
    rowData: Object
  },
  data() {
    return {
      tableParams: {
        limit: 10,
        page: 0,
        deviceId: this.rowData.id
      },
      columns: [
        {
          label: "命令名称",
          render: (h, row) => {
            return (
              <span>
                {row.type == 0
                  ? "截屏"
                  : row.type == 1
                  ? "重启"
                  : row.type == 2
                  ? "获取运行日志"
                  : "磁盘清理"}
              </span>
            );
          }
        },
        {
          label: "状态",
          prop: "status",
          render: (h, row) => {
            return (
              <span>
                {row.status == 0 ? "失败" : row.status == 1 ? "成功" : "待执行"}
              </span>
            );
          }
        },
        { label: "操作账户", prop: "creator" },
        {
          label: "操作时间",
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.createTime)}</span>;
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    getData() {
      this.$refs.terminalOrderTable.pagination.page = 0;
      this.$refs.terminalOrderTable.currentPage = 1;
      this.$refs.terminalOrderTable.fecthData();
    },
    callServer(pagination) {
      return terminalOrder(Object.assign(this.tableParams, pagination));
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>