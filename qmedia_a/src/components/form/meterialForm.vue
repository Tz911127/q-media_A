<template>
  <div>
    <div style="display:inline-block;width:60%;height:350px ;text-align:center">
      <el-tooltip
        class="item"
        effect="dark"
        content="点击全屏查看"
        placement="right"
        v-if="data.type == 0"
      >
        <img :src="imgPathFormate(data.path)" @click="click" style="width: 100%; height: 100%" alt />
      </el-tooltip>
      <video
        v-else
        :src="videoPathFormate(data.path)"
        autoplay
        controls
        style="width: 100%; height: 100%"
      ></video>
    </div>
    <div style="display:inline-block;width:30%;margin-left:5%;vertical-align:top">
      <el-form :model="data">
        <el-form-item label="名称">{{this.$filters.filterPrograms(data.name,data.del)}}</el-form-item>
        <el-form-item label="分辨率">{{data.width}}*{{data.height}}</el-form-item>
        <el-form-item label="大小">{{this.$filters.programMb(data.size)}}</el-form-item>
        <el-form-item label="时长" v-if="data.duration">{{(data.duration)}}</el-form-item>
        <el-form-item label="节目创建">{{(data.creator)}}</el-form-item>
        <el-form-item label="创建时间">{{this.$filters.filterTime(data.createTime)}}</el-form-item>
        <el-form-item label="组织机构">{{data.organizationId}}</el-form-item>
        <el-form-item label="当前状态">{{this.$filters.filterStatus(data.status)}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: Object
  },
  data() {
    return {
      isVideo: false
    };
  },
  methods: {
    click() {
      this.$emit("click");
    }
  },
  watch: {}
};
</script>

<style  scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>