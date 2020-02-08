<template>
  <div style="text-align:center">
    <el-time-picker
      v-model="startTime"
      :picker-options="{
      selectableRange: '00:00:00 - 23:59:00'
    }"
      placeholder="开机时间"
      format="HH:mm"
      value-format="HH:mm"
      @change="startChange"
      :clearable="false"
      style="width:45%;float:left"
    ></el-time-picker>
    <span style="line-height:40px">--</span>
    <el-time-picker
      v-model="endTime"
      :picker-options="{
      selectableRange: '00:00:00 - 23:59:00'
    }"
      placeholder="关机时间"
      format="HH:mm"
      value-format="HH:mm"
      @change="endChange"
      :clearable="false"
      style="width:45%;float:right"
    ></el-time-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: ""
    };
  },
  methods: {
    startChange(val) {
      this.$emit("startTime", val);
    },
    endChange(val) {
      this.$emit("endTime", val);
    }
  }
};
</script>