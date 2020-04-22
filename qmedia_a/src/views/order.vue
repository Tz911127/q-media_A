<template>
  <div>
    <order-table v-show="isDetail" ref="orderTable" @orderDetail="orderDetail"></order-table>
    <order-detail v-if="!isDetail" @reBack="reBack" :rowData="rowData"></order-detail>
  </div>
</template>

<script>
import orderTable from "@/components/table/orderTable";
import orderDetail from "../components/orderDetail/orderDetail";
export default {
  components: {
    orderTable,
    orderDetail
  },
  data() {
    return {
      isDetail: true,
      rowData: {}
    };
  },
  methods: {
    orderDetail(row) {
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