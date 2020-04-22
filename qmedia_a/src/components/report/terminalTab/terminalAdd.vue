<template>
  <div v-loading="loading" style="height:320px">
    <basic-echart :dataMonth="dataMonth" :id="id" :title="title" :value="value" v-if="flag"></basic-echart>
  </div>
</template>

<script>
import basicEchart from "../common/basicEchart";
var echarts = require("echarts");
export default {
  components: {
    basicEchart
  },
  props: {
    dataMonth: Array,
    value: Array,
    title: String,
    flag: {
      type: Boolean,
      default: false
    },
    id: String
  },

  data() {
    return {
      // id: "addTerminal",
      loading: true
    };
  },

  mounted() {
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
</style>