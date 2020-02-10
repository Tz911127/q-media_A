<template>
  <div>
    <div class="page-title" style="cursor:pointer" @click="reBack">
      <i class="el-icon-arrow-left"></i> 返回/终端详情
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="终端信息" name="first">
          <terminal-form :rowData="rowData"></terminal-form>
        </el-tab-pane>
        <el-tab-pane label="终端命令记录" name="second">
          <terminal-order-table :rowData="rowData"></terminal-order-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import terminalForm from "../form/terminalForm";
import terminalOrderTable from "../table/terminalOrderTable";
export default {
  props: {
    rowData: Object
  },
  components: {
    terminalForm,
    terminalOrderTable
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    reBack() {
      this.$emit("reBack");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>