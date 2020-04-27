<template>
  <div>
    <card-list v-show="isDetail" @checkPub="checkPub"></card-list>
    <check-public-table v-if="!isDetail" @reBack="reBack" :rowData="rowData"></check-public-table>
  </div>
</template>

<script>
import cardList from "./cardList";
import checkPublicTable from "../table/checkPublicTable";
export default {
  components: {
    cardList,
    checkPublicTable
  },
  data() {
    return {
      isDetail: true,
      rowData: {}
    };
  },
  methods: {
    checkPub(row) {
      this.isDetail = false;
      this.$root.eventHub.$emit("isDetail", false);
      this.rowData = row;
    },
    reBack() {
      this.isDetail = true;
      this.$root.eventHub.$emit("isDetail", true);
    }
  }
};
</script>

