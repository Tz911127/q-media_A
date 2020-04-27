<template>
  <div>
    <terminal-table v-show="isDetail" @terminalDetail="terminalDetail"></terminal-table>
    <ter-detail v-if="!isDetail" @reBack="reBack" :rowData="rowData"></ter-detail>
  </div>
</template>

<script>
import terminalTable from "../components/table/terminalTable";
import terDetail from "../components/terminalDetail/terDetail";

export default {
  components: {
    terminalTable,
    terDetail
  },
  data() {
    return {
      isDetail: true,
      rowData: {}
    };
  },
  methods: {
    terminalDetail(row) {
      this.isDetail = false;
      this.rowData = row;
      this.$root.eventHub.$emit("isDetail", false);
    },
    reBack() {
      this.isDetail = true;
      this.$root.eventHub.$emit("isDetail", true);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>