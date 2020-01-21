<template>
  <div>
    <el-form size="mini" :model="reportForm" label-width="80px" ref="ruleForm" :rules="reportRules">
      <el-form-item label="报表名称" prop="name">
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
          :propValue="reportForm.typeValue"
          :clearable="false"
        ></v-select>
      </el-form-item>
      <template v-if="reportForm.typeValue==0">
        <el-form-item label="终端业务">
          <el-select v-model="reportForm.workValue" @change="workChange">
            <el-option v-for="item in works" :key="item.val" :label="item.name" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-if="reportForm.typeValue==1">
        <el-form-item label="广告业务">
          <el-select v-model="reportForm.adValue" @change="adChange">
            <el-option v-for="item in ads" :key="item.val" :label="item.name" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="报表类型">
        <v-select
          :options="reports"
          @optionChange="reportChange"
          :propValue="reportForm.reportValue"
          :clearable="false"
          ref="reportSelect"
        ></v-select>
      </el-form-item>
      <template v-if="isDetailed">
        <el-form-item label="企业代码" v-if="!isTerminalNum" prop="ck">
          <el-input placeholder=" 输入3-16位小写字母" v-model.trim="reportForm.ck"></el-input>
        </el-form-item>
        <el-form-item label="终端编号" v-else prop="deviceSn">
          <el-input placeholder=" 输入3-16位小写字母" v-model.trim="reportForm.deviceSn"></el-input>
        </el-form-item>
      </template>
      <template v-if="adName">
        <el-form-item label="广告名称" prop="programName">
          <el-input placeholder=" 输入3-16位小写字母" v-model.trim="reportForm.programName"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="时间" prop="timeValue">
        <el-date-picker
          v-model="reportForm.timeValue"
          :type="isMonth?'monthrange':'daterange'"
          range-separator="至"
          :start-placeholder="isMonth?'开始月份':'开始日期'"
          :end-placeholder="isMonth?'结束月份':'结束日期'"
          :value-format="isMonth?'yyyyMM':'yyyyMMdd'"
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
        ck: "",
        deviceSn: "",
        programName: "",
        workValue: "0",
        adValue: "0",
        reportValue: "0",
        timeValue: "",
        typeValue: "0"
      },
      reportRules: {
        name: [
          { required: true, message: "请输入1-20位报表名称", trigger: "blur" }
        ],
        ck: [{ required: true, message: "请输入企业代码", trigger: "blur" }],
        timeValue: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        programName: [
          { required: true, message: "请输入广告名称", trigger: "blur" }
        ],
        deviceSn: [
          { required: true, message: "请输入终端编号", trigger: "blur" }
        ]
      },
      types: [
        { name: "终端", val: "0" },
        { name: "广告", val: "1" },
        { name: "合同", val: "2" }
      ],
      //业务类型
      works: [
        { name: "终端数量", val: "0" },
        { name: "在线时长", val: "1" },
        { name: "播放时长（全部企业）", val: "2" },
        { name: "播放时长（个别企业）", val: "3" }
      ],
      //报表类型

      reports: [
        { name: "全部汇总", val: "0" },
        { name: "按月汇总", val: "1" },
        { name: "按天汇总（最多31天）", val: "2" },
        { name: "明细", val: "3" }
      ],
      //广告业务
      ads: [
        { name: "广告数量", val: "0" },
        { name: "广告播放时长(单位企业）", val: "1" }
      ],

      isMonth: false,
      isDetailed: false,
      isTerminalNum: false,
      adName: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      pickerMinDate: ""
    };
  },
  methods: {
    //业务类型
    typeChange(val) {
      this.reportForm.typeValue = val;
      this.reportForm.workValue = "0";
      this.reportForm.adValue = "0";
      this.reportForm.reportValue = "0";
      this.$refs.reportSelect.value = "0";
      this.reportForm.timeValue = "";
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
      this.reportForm.workValue = val;
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
      this.reportForm.timeValue = "";
      this.reportForm.reportValue = val;
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
      if (this.reportForm.typeValue == 0) {
        if (this.reportForm.workValue != 3) {
          if (val == 3) {
            this.isDetailed = true;
          } else {
            this.isDetailed = false;
          }
        }
      }
      //终端编号
      if (this.reportForm.workValue == 3 && val == 3) {
        this.isTerminalNum = true;
      } else {
        this.isTerminalNum = false;
      }

      //广告业务

      if (this.reportForm.typeValue == 1 && this.reportForm.adValue == 0) {
        if (val == 3) {
          this.isDetailed = true;
        } else {
          this.isDetailed = false;
        }
      } else if (
        this.reportForm.typeValue == 1 &&
        this.reportForm.adValue == 1
      ) {
        if (val == 3) {
          this.adName = true;
        } else {
          this.adName = false;
        }
      }

      //合同业务
      if (this.reportForm.typeValue == 2) {
        if (val == 3) {
          this.isDetailed = true;
        } else {
          this.isDetailed = false;
        }
      }
    },
    change(val) {},
    adChange(val) {
      this.reportForm.adValue = val;
      this.$refs.reportSelect.value = "0";
      this.adName = false;
      if (this.reportForm.typeValue == 1 && val == 1) {
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