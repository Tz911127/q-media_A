<template>
  <div>
    <div class="report clearfix">
      <el-col :span="16">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          v-loading="loading"
          style="height:400px"
        >
          <el-tab-pane label="新增广告（审核通过）" name="first">
            <div style="text-align:right">
              <el-date-picker
                size="mini"
                v-model="dateValue"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                @change="addChange"
                :picker-options="pickerOptions"
                value-format="yyyyMM"
              ></el-date-picker>
            </div>

            <terminal-add
              v-if="activeName=='first'"
              :dataMonth="dataMonth"
              :value="value"
              :title="`新增广告`"
              :flag="addAD"
              :id="`adFirst`"
              ref="terminalAdd"
            ></terminal-add>
          </el-tab-pane>
          <el-tab-pane label="广告播放时长" name="second">
            <div style="text-align:right">
              <el-date-picker
                size="mini"
                v-model="playDataValue"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                @change="playAddChange"
                :picker-options="pickerOptions"
                value-format="yyyyMM"
              ></el-date-picker>
            </div>

            <terminal-add
              v-if="activeName=='second'"
              :dataMonth="playDataMonth"
              :value="playValue"
              :title="`广告时长/小时`"
              :flag="ADtimeFlag"
              :id="`adSecond`"
              ref="terminalOnline"
            ></terminal-add>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <terminal-list
          @change="change"
          :options="options"
          :lis="lis"
          @btnClick="btnClick"
          :loading="topLoading"
        ></terminal-list>
      </el-col>
    </div>
    <div class="adReport">
      <add-report-table></add-report-table>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");
import terminalAdd from "./terminalTab/terminalAdd";
import terminalList from "./common/terminalList";
import addReportTable from "../table/addReportTable";
import {
  getProgramIncrement,
  getProgramDuration,
  getIncrementTop10,
  getDurationTop10
} from "@/api/report";
export default {
  components: {
    terminalAdd,
    terminalList,
    addReportTable
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      topLoading: false,
      dataMonth: [],
      dateValue: "",
      value: [],
      month: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      playDataValue: "",
      playDataMonth: [],
      playValue: [],
      playMonth: {},
      toggther: true,
      lis: [],
      changeVal: 0,
      btnValue: 0,
      options: [
        { label: "新增广告排名", value: 0 },
        { label: "广告在线时长排名", value: 1 }
      ],
      tabIndex: 0,
      addAD: false,
      ADtimeFlag: false
    };
  },
  computed: {
    opened() {
      return this.$store.state.user.isCollapse;
    }
  },
  watch: {
    opened(val) {
      if (this.tabIndex == 0) {
        this.value = [];
        this.dataMonth = [];
        setTimeout(() => {
          this.getIncrementData();
        }, 200);
      } else {
        this.playValue = [];
        this.playDataMonth = [];
        setTimeout(() => {
          this.getPlayPage();
        }, 200);
      }
    }
  },
  methods: {
    //图形数据
    getIncrementData() {
      let params = this.month;
      this.$refs.terminalAdd.loading = true;
      this.addAD = false;
      getProgramIncrement(params)
        .then(res => {
          this.$refs.terminalAdd.loading = false;
          for (let i in res) {
            this.value.push(res[i].count);
            this.dataMonth.push(this.$filters.formateDate(res[i].m));
          }
          this.addAD = true;
        })
        .catch(res => {
          if (res) {
            this.month = {};
            this.dateValue = "";
            this.getIncrementData();
          }
        });
    },

    getPlayPage() {
      let params = this.playMonth;
      this.ADtimeFlag = false;
      getProgramDuration(params)
        .then(res => {
          this.ADtimeFlag = true;
          this.$refs.terminalOnline.loading = false;
          for (let i in res) {
            this.playValue.push((res[i].duration / 3600).toFixed(2));
            this.playDataMonth.push(this.$filters.formateDate(res[i].m));
          }
        })
        .catch(res => {
          if (res) {
            this.playMonth = {};
            this.playDataValue = "";
            this.getPlayPage();
          }
        });
    },
    handleClick(val) {
      this.tabIndex = val.index;
      if (this.toggther) {
        this.getPlayPage();
        this.toggther = false;
      }
    },
    addChange(val) {
      this.$refs.terminalAdd.loading = true;
      this.value = [];
      this.dataMonth = [];
      if (val) {
        this.month.startMonth = val[0];
        this.month.endMonth = val[1];
        this.getIncrementData();
      } else {
        this.month = {};
        this.getIncrementData();
      }
    },
    playAddChange(val) {
      this.$refs.terminalOnline.loading = true;
      this.playValue = [];
      this.playDataMonth = [];
      if (val) {
        this.playMonth.startMonth = val[0];
        this.playMonth.endMonth = val[1];
        this.getPlayPage();
      } else {
        this.playMonth = {};
        this.getPlayPage();
      }
    },
    //top10数据
    getIncrementTop10Data(val) {
      let params = {
        timeType: val
      };
      this.topLoading = true;
      getIncrementTop10(params).then(res => {
        this.topLoading = false;
        this.lis = res;
      });
    },
    //top10 广告时长
    getDurationTop10Data(val) {
      let params = {
        timeType: val
      };
      this.topLoading = true;
      getDurationTop10(params).then(res => {
        this.topLoading = false;
        this.lis = res;
      });
    },
    btnClick(e) {
      this.topLoading = true;
      this.btnValue = e.value;
      if (this.changeVal == 0) {
        this.getIncrementTop10Data(e.value);
      } else {
        this.getDurationTop10Data(e.value);
      }
    },
    change(val) {
      this.changeVal = val;
      if (val == 0) {
        this.getIncrementTop10Data(this.btnValue);
      } else {
        this.getDurationTop10Data(this.btnValue);
      }
    }
  },

  mounted() {
    this.getIncrementData();
    this.getIncrementTop10Data(0);
  }
};
</script>

<style scoped>
.report {
  display: flex;
}
.report .el-col:nth-child(1) {
  margin-right: 7px;
}
.report .el-col:nth-child(2) {
  margin-left: 7px;
}
.adReport {
  margin-top: 15px;
  background: #fff;
  border-radius: 4px;
}
</style>