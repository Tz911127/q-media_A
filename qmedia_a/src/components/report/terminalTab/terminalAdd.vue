<template>
  <div v-loading="loading" style="height:320px">
    <basic-echart :dataMonth="dataMonth" :id="id" :title="title" :value="value" v-if="flag"></basic-echart>
  </div>
</template>

<script>
import basicEchart from "../common/basicEchart";
export default {
  components: {
    basicEchart
  },
  props: {
    dataMonth: Array,
    value: Array,
    title: String
  },

  data() {
    return {
      flag: false,
      id: "addTerminal",
      loading: true
    };
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      this.flag = true;
      this.loading = false;
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
</style>