<template>
  <div v-loading="loading" class="detail">
    <div>基本信息</div>
    <el-divider></el-divider>
    <el-form :model="formData" :inline="true">
      <el-form-item label="终端编号">{{formData.sn}}</el-form-item>
      <el-form-item label="终端名称">{{formData.name}}</el-form-item>
      <el-form-item
        label="创建时间"
        v-if="formData.createTime"
      >{{this.$filters.filterTime(formData.createTime)}}</el-form-item>
      <el-form-item label="组织机构">{{formData.organizationId}}</el-form-item>
      <el-form-item label="所属分组">{{formData.groupId}}</el-form-item>
      <el-form-item label="安装地址">{{formData.addr}}</el-form-item>
      <el-form-item label="注册账号">{{formData.creator}}</el-form-item>
      <el-form-item label="备注">{{formData.remark}}</el-form-item>
    </el-form>
    <br />
    <br />
    <div>命令信息</div>
    <el-divider></el-divider>
    <img v-if="formData.screenshot" :src="formData.screenshot" style="width:60%" alt />
    <el-form :model="formData" :inline="true">
      <el-form-item
        label="截屏时间"
        v-if="formData.screenshotUpdate"
      >{{this.$filters.filterTime(formData.screenshotUpdate)}}</el-form-item>
      <el-form-item label="开关机时间">{{formData.workCron}}</el-form-item>
      <el-form-item label="目标开关机时间">{{formData.workCronTarget}}</el-form-item>
      <el-form-item label="目标音量">{{formData.Targetvolume}}</el-form-item>
      <el-form-item label="音量">{{formData.volume}}</el-form-item>
      <el-form-item
        label="最后上线时间"
        v-if="formData.lastOnline"
      >{{this.$filters.filterTime(formData.lastOnline)}}</el-form-item>
      <el-form-item label="运行日志" v-if="formData.runLog">
        <el-button type="text" @click="runLog">下载</el-button>
      </el-form-item>
    </el-form>
    <br />
    <br />
    <div>版本信息</div>
    <el-divider></el-divider>
    <el-form :model="formData" :inline="true">
      <el-form-item label="APP版本">{{formData.appVersionName}}</el-form-item>
      <el-form-item label="适配程序版本">{{formData.adaptVersionName}}</el-form-item>
    </el-form>
    <br />
    <br />
    <div>硬件信息</div>
    <el-divider></el-divider>
    <el-form :model="formData" :inline="true">
      <el-form-item label="系统">{{formData.os==1?'安卓':'windows'}}</el-form-item>
      <el-form-item label="分辨率">{{formData.resolutionH}}*{{formData.resolutionV}}</el-form-item>
      <el-form-item label="MAC地址">{{formData.mac}}</el-form-item>
      <el-form-item label="硬盘信息">{{formData.diskInfo}}</el-form-item>
      <el-form-item label="板卡信息">{{formData.cardInfo}}</el-form-item>
      <el-form-item label="网络类型">{{formData.netType==1?'LAN':formData.netType==1?'WIFI':'移动网络'}}</el-form-item>
      <el-form-item label="IP地址">{{formData.ip}}</el-form-item>
      <el-form-item label="局域网地址" v-if="formData.lanIp">{{formData.lanIp}}</el-form-item>
    </el-form>
  </div>
</template>

<script>
import { terminalDetail } from "@/api/terminal";
export default {
  props: {
    rowData: Object
  },
  data() {
    return {
      formData: {},
      loading: true
    };
  },
  methods: {
    getData() {
      this.loading = true;
      terminalDetail(this.rowData)
        .then(result => {
          this.loading = false;
          this.formData = result;
        })
        .catch(err => {});
    },
    runLog() {
      window.open(this.formData.runLog);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scope>
.detail .el-form-item {
  width: 40%;
  min-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-divider--horizontal {
  width: 104%;
  margin: 24px -20px;
}
</style>