<template>
  <div>
    <dialog-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></dialog-table>
  </div>
</template>

<script>
import { getOrderCount } from "@/api/order";
import dialogTable from "./components/dialogTable";
export default {
  components: { dialogTable },
  props: {
    rowData: Object
  },
  data() {
    return {
      loading: true,
      columns: [
        { label: "订单编号", prop: "orderNo" },
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
                  : "审核不通过"}
              </span>
            );
          }
        }
      ],
      tableData: [],
      total: 0,
      tableParams: {
        contractId: this.rowData.contractId,
        page: 0,
        limit: 10
      }
    };
  },
  methods: {
    getData() {
      this.loading = true;
      getOrderCount(this.tableParams)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(err => {});
    },
    handleSizeChange(val) {
      this.tableParams.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.tableParams.page = val - 1;
      this.getData();
    }
  },
  watch: {
    rowData: function() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
</style>