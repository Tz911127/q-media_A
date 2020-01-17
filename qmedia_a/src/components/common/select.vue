<template>
  <el-select
    :class="{'holerTxt':value === ''}"
    v-model="value"
    :placeholder="placeholder"
    @change="optionChange"
    :clearable="clearable"
  >
    <el-option v-for="item in options" :key="item.val" :label="item.name" :value="item.val"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },
    placeholder: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: true
    },
    propValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value: this.propValue || ""
    };
  },
  methods: {
    optionChange(val) {
      this.$emit("optionChange", val);
    }
  }
};
</script>