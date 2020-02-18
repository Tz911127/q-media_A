<template>
  <div v-loading="loading">
    <div style="margin:15px 0 ">
      <v-selectRes
        :placeholder="`分辨率`"
        @optionChange="resoleChange"
        style="width: 160px;margin-right:15px"
        :options="resolutes"
      ></v-selectRes>
      <v-select :placeholder="`节目状态`" @optionChange="statesChange" :options="states"></v-select>
      <v-select :placeholder="`删除状态`" @optionChange="delChange" :options="dels"></v-select>
      <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
      <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
        <el-input placeholder="素材名称" v-model.trim="name" @keyup.enter.native="search" clearable></el-input>
      </div>
      <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
        <el-input placeholder="企业代码" v-model.trim="ck" @keyup.enter.native="search" clearable></el-input>
      </div>
    </div>
    <el-row style="margin-left:-7.5px;margin-bottom:20px">
      <el-col class="cardBox" v-for="(index,value) in cardData" :key="value">
        <el-card shadow="hover" style="height:230px;position:relative">
          <div
            @mouseenter="mouseenter(index,value)"
            @mouseleave="mouseLeave()"
            style="position:relative;height:150px"
          >
            <div class="review" v-show="active == value">
              <div class="review_flex">
                <span @click="review(value)">预览</span>
              </div>
            </div>

            <span
              class="status baseStatus"
              :class="statusStyle[index.status][0]"
            >{{(index.status)|filterStatus}}</span>
            <span class="del delStyle" v-if="index.del==1">已删除</span>
            <img :src="index.snapshot" style="width: 100%; height: 150px" />
          </div>
          <div class="card_tit">
            <el-tooltip class="item" effect="dark" :content="index.name" placement="top">
              <span class="card_name">{{index.name}}</span>
            </el-tooltip>

            <div class="clearfix" :style="active == index?'display:block':''">
              <span style="font-size:12px;margin-left:10px">{{index.width}}*{{index.height}}</span>
              <el-button type="text" class="button" @click="checkPub(index)">播放管理</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div
      v-if="cardData.length==0"
      style="margin-top:20px;text-align:center;color:rgb(144, 147, 153);font-size:14px"
    >暂无素材数据！</div>
    <el-pagination
      style="margin-top:10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getProgramPage } from "@/api/program";
export default {
  data() {
    return {
      cardData: [],
      tableParams: {
        page: 0,
        limit: 10
      },
      active: -1,
      statusStyle: {
        0: ["blue"],
        1: ["green"],
        2: ["gray"],
        3: ["gray"],
        4: ["red"],
        5: ["red"],
        6: ["red"],
        7: ["red"]
      },
      currentPage: 1,
      total: 0,
      loading: true,
      name: "",
      ck: "",
      states: [
        { name: "待提交审核", val: 0 },
        { name: "审核成功", val: 1 },
        { name: "内部审核中", val: 2 },
        { name: "平台审核中", val: 3 },
        { name: "内部审核失败", val: 4 },
        { name: "平台审核失败", val: 5 }
      ],
      dels: [
        { name: "已删除", val: 1 },
        { name: "未删除", val: 0 }
      ],
      resolutes: []
    };
  },
  methods: {
    getData() {
      this.loading = true;
      getProgramPage(this.tableParams).then(res => {
        this.cardData = res.data;
        this.total = res.total;
        this.loading = false;
      });
    },
    mouseenter(val, index) {
      this.active = index;
    },
    mouseLeave() {
      this.active = -1;
    },
    review() {},
    handleSizeChange(val) {
      this.tableParams.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.tableParams.page = val - 1;
      this.getData();
    },
    search() {
      this.tableParams.ck = this.ck;
      this.tableParams.name = this.name;
      this.tableParams.page = 0;
      this.getData();
    },
    statesChange(val) {
      this.tableParams.status = val;
      this.currentPage = 1;
      this.search();
    },
    delChange(val) {
      this.tableParams.del = val;
      this.currentPage = 1;
      this.search();
    },
    resoleChange(val) {
      this.tableParams.width = val.split("*")[0];
      this.tableParams.height = val.split("*")[1];
      this.search();
    }
  },
  mounted() {
    this.getData();
    this.resolutes = JSON.parse(
      localStorage.getItem("userInfo")
    ).sysConfig.resolutions;
  }
};
</script>

<style scoped>
.card_name {
  display: inline-block;
  /* width: 100%; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.button {
  float: right;
  font-size: 12px;
  padding: 0;
}
.card_tit {
  padding: 0 10px;
}
</style>