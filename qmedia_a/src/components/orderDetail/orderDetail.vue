<template>
  <div v-loading="loading">
    <div class="page-title" style="cursor:pointer" @click="reBack">
      <i class="el-icon-arrow-left"></i> 返回/订单详情
    </div>
    <div class="status">
      <div>
        <span>订单状态：{{state==0?'待审核':state==1?'待播放':state==2?'播放中':state==3?'已停播':state==4?'订单完成':'审核不通过'}}</span>
        <span v-if="state==0">
          <el-button type="primary" @click="checkPass" v-if="perms('82')">审核通过</el-button>
          <el-button type="warning" @click="checkNo" v-if="perms('82')">审核不通过</el-button>
        </span>
        <span
          style="color:#333333;font-size:16px"
          v-if="state==3"
        >{{baseForm.stopAccountName}}于{{this.$filters.filterTime(baseForm.stopProgramTime)}}停播</span>
        <span style="color:red;font-size:16px" v-if="state==5">原因：{{baseForm.checkReason}}</span>
      </div>
    </div>
    <span>订单信息</span>
    <el-divider></el-divider>
    <el-form :inline="true" :model="baseForm" class="orderDetail">
      <el-form-item label="订单编号">{{baseForm.orderNo}}</el-form-item>
      <el-form-item label="订单名称">{{baseForm.remark}}</el-form-item>
      <el-form-item label="投放日期">{{dateStart}}至{{dateEnd}}</el-form-item>
      <el-form-item label="投放终端数">
        <el-button type="text" @click="getDeviceCount">{{baseForm.deviceCount}}台</el-button>
      </el-form-item>
      <el-form-item label="广告名称">
        <el-button type="text" @click="proRev">{{baseForm.programName}}</el-button>
      </el-form-item>
      <el-form-item label="投放时段">
        <template>
          <div v-for="i in period" :key="i">{{i|filterWeek(baseForm.scheduleType)}}</div>
        </template>
      </el-form-item>
      <el-form-item label="播放方式">{{baseForm.scheduleType == 0?'轮播|':"插播"}}{{periodType}}</el-form-item>
      <el-form-item label="广告时长">{{this.$filters.formatSeconds(baseForm.programDuration)}}</el-form-item>
      <el-form-item label="创建账户">{{baseForm.creatorAccount}}</el-form-item>
      <el-form-item label="创建时间">{{this.$filters.filterTime(baseForm.createTime)}}</el-form-item>
    </el-form>
    <br />
    <span>合同信息</span>
    <el-divider></el-divider>
    <el-form :inline="true" :model="orderForm" class="orderDetail">
      <el-form-item label="合同编号">{{orderForm.contractNo}}</el-form-item>
      <el-form-item
        label="投放日期"
      >{{this.$filters.formateDate(orderForm.time_begin)}}至{{this.$filters.formateDate(orderForm.time_end)}}</el-form-item>
      <el-form-item label="终端数">{{orderForm.term_num}}台</el-form-item>
      <el-form-item
        label="合同类型"
      >{{orderForm.content_type==0?'政府宣传':orderForm.content_type==1?'商业广告':"公益广告"}}</el-form-item>
      <el-form-item label="合同金额">￥{{this.$filters.numFilter(orderForm.money_small)}}</el-form-item>
      <el-form-item label="播放次数">{{orderForm.ad_count}}次/天/台</el-form-item>
      <el-form-item label="广告时长">{{this.$filters.formatSeconds(orderForm.ad_time)}}</el-form-item>
      <el-form-item label="订单数">
        <el-button type="text" @click="getOrderCount">{{orderForm.orderNum}}</el-button>
      </el-form-item>
      <el-form-item label="合伙人">{{orderForm.secAccountAndName}}</el-form-item>
      <el-form-item label="广告主">{{orderForm.firstAccountAndName}}</el-form-item>
      <el-form-item label="创建时间">{{this.$filters.filterTime(orderForm.createTime)}}</el-form-item>
      <el-form-item label="合伙人企业">{{orderForm.secCkAndName}}</el-form-item>
      <el-form-item label="广告主企业">{{orderForm.firstCkAndName}}</el-form-item>
      <el-form-item label="抄送人" v-if="orderForm.copyToSecAccount">{{orderForm.copyToSecAccount}}</el-form-item>
    </el-form>
    <br />
    <span>审核信息</span>
    <el-divider></el-divider>
    <el-form :inline="true" :model="baseForm" class="orderDetail">
      <el-form-item
        label="审核状态"
      >{{baseForm.status==0?'待审核':baseForm.status==1?'待播放':baseForm.status==2?'播放中':baseForm.status==3?'已停播':baseForm.status==4?'订单完成':"审核不通过"}}</el-form-item>
      <el-form-item label="审核账户">{{baseForm.lastOpeAccountAndName}}</el-form-item>
      <el-form-item
        label="审核时间"
        v-if="baseForm.lastOperateTime"
      >{{this.$filters.filterTime(baseForm.lastOperateTime)}}</el-form-item>
    </el-form>
    <!-- 弹窗 -->
    <v-dialog
      ref="orderDialog"
      :width="title==1?`50%`:`70%`"
      :showFooter="false"
      :title="title==0?'投放终端':title==1?'广告预览':title==2?'关联订单':''"
    >
      <order-device-table
        v-if="title==0"
        ref="deviceDialog"
        :status="baseForm.status"
        :rowData="rowData"
      ></order-device-table>
      <program-form v-if="title==1" :data="detailRow"></program-form>
      <order-count v-if="title==2" :data="countTable" :rowData="rowData"></order-count>
    </v-dialog>
  </div>
</template>

<script>
import { getOrderDetail, getProgramReview } from "@/api/order";
import orderDeviceTable from "../table/orderDeviceTable";
import orderCount from "../table/orderCount";
import programForm from "@/components/form/programForm";

export default {
  props: {
    rowData: Object
  },
  components: { orderDeviceTable, programForm, orderCount },
  data() {
    return {
      state: 0,
      loading: true,
      baseForm: {},
      orderForm: {},
      period: [],
      dateStart: "",
      dateEnd: "",
      periodType: "",
      // 投放终端数
      title: 0,
      //广告预览
      detailRow: {},
      programContent: {},
      //关联订单
      orderCountParams: {
        orderId: this.rowData.contractId,
        limit: 10,
        page: 0
      },
      countTable: []
    };
  },
  methods: {
    reBack() {
      this.$emit("reBack");
    },
    getData() {
      getOrderDetail(this.rowData.id)
        .then(result => {
          this.state = result.status;
          this.loading = false;
          this.baseForm = result;
          this.orderForm = result.contract;
          this.dateStart = this.$filters.formateDate(
            result.schedules[0].dateStart
          );
          this.dateEnd = this.$filters.formateDate(result.schedules[0].dateEnd);
          let periods = this.baseForm.schedules[0].period;
          if (result.scheduleType == 0) {
            for (let i = 0; i < periods.length; i++) {
              this.period.push(
                periods[i].start +
                  "-" +
                  periods[i].end +
                  " " +
                  periods[i].weeks +
                  " "
              );
              this.periodType =
                "优先级" +
                periods[i].level +
                "|连续播放" +
                periods[i].times +
                "次";
            }
          } else {
            this.period.push(periods[0].start + "-" + periods[0].end);
          }
        })
        .catch(err => {});
    },

    checkPass() {},
    checkNo() {},
    getDeviceCount() {
      this.title = 0;
      this.$refs.orderDialog.dialogVisible = true;
    },

    proRev() {
      this.title = 1;
      getProgramReview(this.rowData.programId).then(res => {
        this.detailRow = res;
        this.$refs.orderDialog.dialogVisible = true;
        this.programContent = {};
        this.programContent.content = JSON.parse(res.content).pages;
        this.programContent.pixelHorizontal = res.width;
        this.programContent.pixelVertical = res.height;
        this.programContent.programDialogType = 1;
        this.$store.commit("SET_PROGRAM_CONTENT", this.programContent);
      });
    },
    getOrderCount() {
      this.title = 2;
      this.$refs.orderDialog.dialogVisible = true;
    }
  },
  mounted() {
    this.getData();
  },
  filters: {
    filterWeek(num, type) {
      if (type == 0) {
        let weeksArr = num.split(" ")[1];
        let time = num.split(" ")[0];
        if (weeksArr.length == 13) {
          weeksArr = "每天";
        } else {
          weeksArr = weeksArr.replace("1", "周一");
          weeksArr = weeksArr.replace("2", "周二");
          weeksArr = weeksArr.replace("3", "周三");
          weeksArr = weeksArr.replace("4", "周四");
          weeksArr = weeksArr.replace("5", "周五");
          weeksArr = weeksArr.replace("6", "周六");
          weeksArr = weeksArr.replace("7", "周日");
        }
        return time + " " + weeksArr;
      } else {
        return num;
      }
    }
  }
};
</script>

<style  scoped>
.status {
  background-color: rgba(236, 245, 255, 1);
  height: 50px;
  line-height: 50px;
  color: #0099ff;
  padding-left: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.status span {
  margin-right: 50px;
}
.orderDetail .el-form-item {
  width: 30%;
}
</style>