<template>
  <div class="home" v-loading="loading">
    <div class="clearfix item">
      <el-col :span="12">
        <echarts-mat
          v-if="flag"
          :state="state"
          :exception="exception"
          :del="del"
          :disabled="disabled"
          :platformCheckPendingType="platformCheckPendingType"
        ></echarts-mat>
      </el-col>
      <el-col :span="12">
        <echarts-pro v-if="flag" :registReport="registReport"></echarts-pro>
      </el-col>
    </div>
    <div class="clearfix item">
      <el-col :span="12">
        <echarts-map v-if="flag" :deviceProvince="deviceProvince"></echarts-map>
      </el-col>
      <el-col :span="12">
        <echarts-mat-time v-if="flag" :onlineReport="onlineReport"></echarts-mat-time>
      </el-col>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import sideBar from '@/components/sideBar.vue'
import echartsMat from "../components/homePage/echartsMat";
import echartsPro from "../components/homePage/echartsPro";
import echartsMap from "../components/homePage/echartsMap";
import echartsMatTime from "../components/homePage/echartsMatTime";
import { getReport } from "../api/homePage";
export default {
  name: "home",
  components: {
    echartsMat,
    echartsPro,
    echartsMap,
    echartsMatTime
  },
  data() {
    return {
      state: {},
      flag: false,
      loading: true
    };
  },
  methods: {
    getData() {
      this.loading = true;
      getReport().then(res => {
        this.loading = false;
        // 终端
        this.state = res.device.state;
        this.platformCheckPendingType = res.platformCheckPendingType;
        this.del = Number(res.device.del);
        this.disabled = Number(res.device.disabled);
        this.exception = Number(res.device.exception);
        //新增终端
        this.registReport = res.device.registReport;
        //在线时长
        this.onlineReport = res.device.onlineReport;
        //终端分布
        this.deviceProvince = res.deviceProvince;
        this.flag = true;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style scope>
.el-col {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
}
.item {
  display: flex;
  margin-bottom: 15px;
}
.item .el-col:nth-child(1) {
  margin-right: 7px;
}
.item .el-col:nth-child(2) {
  margin-left: 7px;
}
</style>
