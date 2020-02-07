<template>
  <div class="select-wraper">
    <el-cascader
      v-model="selectedOptions"
      :options="options"
      @change="handleChange"
      :props="props"
      clearable
      placeholder="省/市/区"
      ref="cities"
    ></el-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      props: {
        value: "id",
        label: "n",
        children: "children",
        checkStrictly: true
      }
    };
  },
  mounted() {
    this.options = JSON.parse(localStorage.getItem("treeCities"));
  },
  methods: {
    handleChange(val) {
      this.$emit("handleChange", val);
      this.$refs.cities.dropDownVisible = false;
    }
    /**
     * 递归处理
     * 将所有的id更换为string类型
     */
  }
};
</script>