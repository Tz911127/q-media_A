<template>
  <div class="tableBtnWrap" :style="{'width': width}">
    <el-button
      type="text"
      size="mini"
      v-for="(btn,index) in operateList"
      :key="index"
      @click="btn.method(rowData)"
    >
      <div v-if="btn.isShow">
        <el-tooltip placement="top-start" v-if="btn.icon">
          <div slot="content">{{btn.title}}</div>
          <i :class="btn.icon" style=" color: black;font-size:18px"></i>
        </el-tooltip>
        <div v-else>{{btn.title}}</div>
      </div>
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    operateList: Array,
    rowData: Object,
    width: String
    // icon: String
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
