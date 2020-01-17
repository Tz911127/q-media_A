<template>
  <div>
    <el-form size="mini" :model="reportForm" label-width="80px">
      <el-form-item label="报表名称">
        <el-input
          v-model.trim="reportForm.name"
          maxlength="20"
          placeholder="请输入报表名称（1-20）位"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="业务类型">
        <v-select
          :options="types"
          @optionChange="typeChange"
          :propValue="typeValue"
          :clearable="false"
        ></v-select>
      </el-form-item>
      <template v-if="typeValue==0">
        <el-form-item label="终端业务">
          <el-select v-model="workValue" @change="workChange">
            <el-option v-for="item in works" :key="item.val" :label="item.name" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-if="typeValue==1">
        <el-form-item label="广告业务">
          <el-select v-model="adValue" @change="adChange">
            <el-option v-for="item in ads" :key="item.val" :label="item.name" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="报表类型">
        <v-select
          :options="reports"
          @optionChange="reportChange"
          :propValue="reportValue"
          :clearable="false"
          ref="reportSelect"
        ></v-select>
      </el-form-item>
      <template v-if="isDetailed">
        <el-form-item label="企业代码" v-if="!isTerminalNum">
          <el-input placeholder=" 输入3-16位小写字母" v-model.trim="reportForm.code"></el-input>
        </el-form-item>
        <el-form-item label="终端编号" v-else>
          <el-input placeholder=" 输入3-16位小写字母" v-model.trim="reportForm.code"></el-input>
        </el-form-item>
      </template>
      <template v-if="adName">
        <el-form-item label="广告名称">
          <el-input placeholder=" 输入3-16位小写字母" v-model.trim="reportForm.code"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="时间">
        <el-date-picker
          v-model="timeValue"
          :type="isMonth?'monthrange':'daterange'"
          range-separator="至"
          :start-placeholder="isMonth?'开始月份':'开始日期'"
          :end-placeholder="isMonth?'结束月份':'结束日期'"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="change"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reportForm: {
        name: "",
        code: ""
      },
      typeValue: "0",
      types: [
        { name: "终端", val: "0" },
        { name: "广告", val: "1" },
        { name: "合同", val: "2" }
      ],
      //业务类型
      workValue: "0",
      works: [
        { name: "终端数量", val: "0" },
        { name: "在线时长", val: "1" },
        { name: "播放时长（全部企业）", val: "2" },
        { name: "播放时长（个别企业）", val: "3" }
      ],
      //报表类型
      reportValue: "0",
      reports: [
        { name: "全部汇总", val: "0" },
        { name: "按月汇总", val: "1" },
        { name: "按天汇总（最多31天）", val: "2" },
        { name: "明细", val: "3" }
      ],
      //广告业务
      adValue: "0",
      ads: [
        { name: "广告数量", val: "0" },
        { name: "广告播放时长(单位企业）", val: "1" }
      ],
      timeValue: "",
      isMonth: false,
      isDetailed: false,
      isTerminalNum: false,
      adName: false,
      typeValue: "0",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerMinDate: ""
    };
  },
  methods: {
    //业务类型
    typeChange(val) {
      this.typeValue = val;
      this.workValue = "0";
      this.adValue = "0";
      this.$refs.reportSelect.value = "0";
      this.timeValue = "";
      this.isDetailed = false;
      this.adName = false;
      if (val != 0) {
        let item = { name: "明细", val: "3" };
        if (this.reports.length == 3) {
          this.reports.push(item);
        }
      }
    },
    //终端业务
    workChange(val) {
      let item = { name: "明细", val: "3" };
      this.$refs.reportSelect.value = "0";
      this.isDetailed = false;
      this.workValue = val;
      if (val == 2) {
        if (this.reports.length > 3) {
          this.reports.pop();
        }
      } else {
        if (this.reports.length == 3) {
          this.reports.push(item);
        }
      }

      if (val == 3) {
        this.isDetailed = true;
      } else {
        this.isDetailed = false;
      }
    },
    //报表类型
    reportChange(val) {
      this.timeValue = "";
      //月份判断
      if (val == 1) {
        this.isMonth = true;
      } else {
        this.isMonth = false;
      }
      //时间判断
      if (val == 2) {
        this.pickerOptions = {
          onPick: ({ maxDate, minDate }) => {
            this.pickerMinDate = minDate.getTime();
            if (maxDate) {
              this.pickerMinDate = "";
            }
          },
          disabledDate: time => {
            if (this.pickerMinDate !== "") {
              let one = 30 * 24 * 3600 * 1000;
              let minTime = this.pickerMinDate - one;
              let maxTime = this.pickerMinDate + one;
              if (maxTime > new Date()) {
                maxTime = new Date();
              }
              return time.getTime() < minTime || time.getTime() > maxTime;
            }
            return time.getTime() > Date.now();
          }
        };
      } else {
        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        };
      }
      //企业代码判断
      if (this.typeValue == 0) {
        if (this.workValue != 3) {
          if (val == 3) {
            this.isDetailed = true;
          } else {
            this.isDetailed = false;
          }
        }
      }
      //终端编号
      if (this.workValue == 3 && val == 3) {
        this.isTerminalNum = true;
      } else {
        this.isTerminalNum = false;
      }

      //广告业务

      if (this.typeValue == 1 && this.adValue == 0) {
        if (val == 3) {
          this.isDetailed = true;
        } else {
          this.isDetailed = false;
        }
      } else if (this.typeValue == 1 && this.adValue == 1) {
        if (val == 3) {
          this.adName = true;
        } else {
          this.adName = false;
        }
      }

      //合同业务
      if (this.typeValue == 2) {
        if (val == 3) {
          this.isDetailed = true;
        } else {
          this.isDetailed = false;
        }
      }
    },
    change(val) {
      console.log(val);
    },
    adChange(val) {
      this.adValue = val;
      this.$refs.reportSelect.value = "0";
      this.adName = false;
      if (this.typeValue == 1 && val == 1) {
        this.isDetailed = true;
      } else {
        this.isDetailed = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>