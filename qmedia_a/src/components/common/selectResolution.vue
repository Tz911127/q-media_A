<template>
  <div class="select-wraper">
    <el-select
      :class="{'holerTxt':value == ''}"
      v-model="value"
      :placeholder="placeholder"
      @change="optionChange"
      clearable
    >
      <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    optionChange(val) {
      this.$emit("optionChange", val);
    }
  }
};
</script>
<style lang="less">
.select-wraper {
  display: inline-block;
  .holerTxt {
    .el-input__inner {
      color: #c0c4cc;
    }
  }
}
</style>