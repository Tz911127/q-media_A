<template>
  <div>
    <slot name="tableHeader"></slot>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      ref="businessTable"
      :call-server="callServer"
      @handleSortChange="handleSortChange"
    ></basic-table>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import { getDevicePage } from "@/api/report";
export default {
  components: { basicTable },
  data() {
    return {
      loading: false,
      tableData: [],
      columns: [
        { label: "合伙人企业代码", prop: "ck" },
        { label: "企业名称", prop: "name" },
        { label: "终端总数", prop: "totalNum", sortable: true },
        { label: "在线终端", prop: "onlineNum", sortable: true },
        { label: "离线终端", prop: "offLineNum", sortable: true }
      ],
      prop: "",
      tableParams: {
        limit: 10,
        page: 0
      }
    };
  },
  methods: {
    handleSortChange({ column, prop, order }) {
      this.$emit("handleSortChange", { column, prop, order });
    },
    callServer(pagination) {
      return getDevicePage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.businessTable.pagination.page = 0;
      this.$refs.businessTable.currentPage = 1;
      this.$refs.businessTable.fecthData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>