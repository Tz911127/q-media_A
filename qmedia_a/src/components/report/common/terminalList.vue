<template>
  <div>
    <div>
      <el-select
        size="mini"
        v-model="value"
        placeholder="请选择"
        style="width:140px;margin-right:15px"
        @change="change"
        v-if="isSelect"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span v-else style="margin-right:15px;font-size:14px">已付款合同金额排名</span>
      <el-button
        size="mini"
        v-for="btn in btns"
        :key="btn.index"
        :type="btn.type"
        @click="btnClick(btn)"
        style="width:68px"
      >{{btn.label}}</el-button>
    </div>
    <div>
      <list :lis="lis" :loading="loading"></list>
    </div>
  </div>
</template>

<script>
import list from "./termianlListItem";
export default {
  components: {
    list
  },
  props: {
    lis: Array,
    loading: Boolean,
    options: Array,
    isSelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: 0,
      btns: [
        { label: "近一月", type: "primary", value: 0 },
        { label: "近半年", type: "text", value: 1 },
        { label: "近一年", type: "text", value: 2 }
      ]
    };
  },
  methods: {
    change(val) {
      this.$emit("change", val);
    },
    btnClick(e) {
      let btns = this.btns;
      for (let i = 0; i < btns.length; i++) {
        btns[i].type = "text";
      }
      e.type = "primary";
      this.$emit("btnClick", e);
    }
  }
};
</script>

<style  scoped>
.list {
  margin: 10px 30px;
  font-size: 14px;
}
.list li {
  margin: 10px 0;
}
</style>