<template>
  <div>
    <notice-table v-show="isDetail" @noticePublic="noticePublic"></notice-table>
    <public-table v-if="!isDetail" @reBack="reBack" :rowData="rowData"></public-table>
  </div>
</template>

<script>
import noticeTable from "../table/noticeTable";
import publicTable from "../table/publicTable";
export default {
  components: {
    noticeTable,
    publicTable
  },
  data() {
    return {
      isDetail: true
    };
  },
  methods: {
    noticePublic(i, row) {
      this.isDetail = false;
      this.$root.eventHub.$emit("isDetail", false);
      this.rowData = { i, row };
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