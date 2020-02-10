<template>
  <div>
    <div class="report clearfix">
      <el-col :span="16">
        <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
          <el-tab-pane label="新增终端" name="first">
            <div style="text-align:right">
              <el-date-picker
                size="mini"
                v-model="addTerminalValue"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                @change="addTerminalChange"
                :picker-options="pickerOptions"
                value-format="yyyyMM"
              ></el-date-picker>
            </div>
            <terminal-add
              v-if="activeName=='first'"
              :dataMonth="dataMonth"
              :value="value"
              :title="`新增终端数`"
              :flag="addFlag"
              ref="addTermialNum"
            ></terminal-add>
          </el-tab-pane>
          <el-tab-pane label="终端在线时长" name="second">
            <div style="text-align:right">
              <el-date-picker
                size="mini"
                v-model="terminalOnlineValue"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                @change="terminalOnlineChange"
                :picker-options="pickerOptions"
                value-format="yyyyMM"
              ></el-date-picker>
            </div>
            <terminal-add
              v-if="activeName=='second'"
              :dataMonth="secondDataMonth"
              :value="secondValue"
              :title="`终端在线时长`"
              :flag="onlineFlag"
              ref="termialOnline"
            ></terminal-add>
          </el-tab-pane>
          <el-tab-pane label="终端播放时长/小时" name="third">
            <div style="text-align:right">
              <el-date-picker
                size="mini"
                v-model="terminalPlayValue"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                @change="terminalPlayChange"
                :picker-options="pickerOptions"
                value-format="yyyyMM"
              ></el-date-picker>
            </div>
            <terminal-add
              v-if="activeName=='third'"
              :dataMonth="thirdDataMonth"
              :value="thirdValue"
              :title="`终端在线时长`"
              :flag="playFlag"
              ref="termialPlay"
            ></terminal-add>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <terminal-list
          :options="options"
          :lis="lis"
          @btnClick="btnClick"
          :loading="topLoading"
          @change="change"
        ></terminal-list>
      </el-col>
    </div>
    <div class="business">
      <business-terminal-table @handleSortChange="handleSortChange" ref="terminalTable">
        <template slot="tableHeader">
          企业终端
          <span style="font-size:14px;color:#999">(10分钟更新一次)</span>
        </template>
      </business-terminal-table>
    </div>
  </div>
</template>

<script>
import terminalAdd from "./terminalTab/terminalAdd";
import terminalList from "./common/terminalList";
import businessTerminalTable from "../table/businessTerminalTable";
import {
  getDeviceReport,
  getDeviceOnline,
  getDevicePlay,
  getDeviceTop10,
  getDevicePage
} from "@/api/report";
export default {
  components: {
    terminalAdd,
    terminalList,
    businessTerminalTable
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      dataMonth: [],
      value: [],
      addTerminalValue: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      month: {},
      secondDataMonth: [],
      secondValue: [],
      secondTab: true,
      secondMonth: {},
      terminalOnlineValue: "",
      thirdDataMonth: [],
      thirdValue: [],
      thirdTab: true,
      thirdMonth: {},
      terminalPlayValue: "",
      options: [
        { label: "新增终端排名", value: 0 },
        { label: "终端在线时长排名", value: 1 },
        { label: "终端播放时长排名", value: 2 }
      ],
      lis: [],
      topLoading: false,
      rankType: 0,
      timeType: 0,
      isTotalSort: 4,
      onlineSort: 0,
      offLineSort: 2,
      tabIndex: 0,
      addFlag: false,
      onlineFlag: false,
      playFlag: false
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
        this.$refs.addTermialNum.flag = false;
        this.$refs.addTermialNum.loading = true;
        this.value = [];
        this.dataMonth = [];
        setTimeout(() => {
          this.getDeviceData();
        }, 200);
      } else if (this.tabIndex == 1) {
        this.$refs.termialOnline.flag = false;
        this.$refs.termialOnline.loading = true;
        this.secondValue = [];
        this.secondDataMonth = [];
        setTimeout(() => {
          this.getTeminalOnline();
        }, 200);
      } else {
        this.$refs.termialPlay.flag = false;
        this.$refs.termialPlay.loading = true;
        this.thirdValue = [];
        this.thirdDataMonth = [];
        setTimeout(() => {
          this.getDevicePlayData();
        }, 200);
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.tabIndex = tab.index;
      if (tab.index == 1) {
        if (this.secondTab) {
          this.getTeminalOnline();
          this.secondTab = false;
        }
      } else if (tab.index == 2) {
        if (this.thirdTab) {
          this.getDevicePlayData();
          this.thirdTab = false;
        }
      }
    },
    handleSortChange({ column, prop, order }) {
      if (column.label == "终端总数") {
        if (this.isTotalSort == 5) {
          this.isTotalSort = 4;
        } else {
          this.isTotalSort = 5;
        }
        this.$refs.terminalTable.tableParams.sort = this.isTotalSort;
      }
      if (column.label == "在线终端") {
        if (this.onlineSort == 0) {
          this.onlineSort = 1;
        } else {
          this.onlineSort = 0;
        }
        this.$refs.terminalTable.tableParams.sort = this.onlineSort;
      }
      if (column.label == "离线终端") {
        if (this.offLineSort == 2) {
          this.offLineSort = 3;
        } else {
          this.offLineSort = 2;
        }
        this.$refs.terminalTable.tableParams.sort = this.offLineSort;
      }
      this.$refs.terminalTable.getData();
    },
    //新增终端
    getDeviceData() {
      this.addFlag = false;
      this.$refs.addTermialNum.loading = true;
      getDeviceReport(this.month).then(res => {
        this.addFlag = true;
        this.$refs.addTermialNum.loading = false;
        for (let i in res) {
          this.value.push(res[i].count);
          this.dataMonth.push(this.$filters.formateDate(res[i].m));
        }
      });
    },
    addTerminalChange(val) {
      this.addFlag = false;
      this.$refs.addTermialNum.loading = true;
      this.value = [];
      this.dataMonth = [];
      if (val) {
        this.month.startMonth = val[0];
        this.month.endMonth = val[1];
        this.getDeviceData();
      } else {
        this.month = {};
        this.getDeviceData();
      }
    },
    //终端在线时长
    getTeminalOnline() {
      this.onlineFlag = false;
      getDeviceOnline(this.secondMonth).then(res => {
        this.onlineFlag = true;
        this.$refs.termialOnline.loading = false;
        for (let i in res) {
          this.secondValue.push((res[i].duration / 3600 / 1000).toFixed(2));
          this.secondDataMonth.push(this.$filters.formateDate(res[i].m));
        }
      });
    },
    terminalOnlineChange(val) {
      this.onlineFlag = false;
      this.$refs.termialOnline.loading = true;
      this.secondValue = [];
      this.secondDataMonth = [];
      if (val) {
        this.secondMonth.startMonth = val[0];
        this.secondMonth.endMonth = val[1];
        this.getTeminalOnline();
      } else {
        this.secondMonth = {};
        this.getTeminalOnline();
      }
    },
    //终端播放时长
    getDevicePlayData() {
      this.playFlag = false;
      getDevicePlay(this.thirdMonth).then(res => {
        this.playFlag = true;
        this.$refs.termialPlay.loading = false;
        for (let i in res) {
          this.thirdValue.push((res[i].duration / 3600).toFixed(2));
          this.thirdDataMonth.push(this.$filters.formateDate(res[i].m));
        }
      });
    },
    terminalPlayChange(val) {
      this.$refs.termialPlay.loading = true;
      this.thirdValue = [];
      this.thirdDataMonth = [];
      if (val) {
        this.thirdMonth.startMonth = val[0];
        this.thirdMonth.endMonth = val[1];
        this.getDevicePlayData();
      } else {
        this.thirdMonth = {};
        this.getDevicePlayData();
      }
    },
    //top10
    getDeviceTop10Data(rankType, timeType) {
      let params = {
        rankType: rankType,
        timeType: timeType
      };
      this.topLoading = true;
      getDeviceTop10(params).then(res => {
        this.topLoading = false;
        this.lis = res;
      });
    },
    change(val) {
      this.rankType = val;
      this.getDeviceTop10Data(val, this.timeType);
    },
    btnClick(e) {
      this.timeType = e.value;
      this.getDeviceTop10Data(this.rankType, e.value);
    }
    // 列表
  },

  mounted() {
    this.getDeviceData();
    this.getDeviceTop10Data(0, 0);
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
.business {
  background: #fff;
  margin-top: 15px;
  padding-top: 15px;
}
</style>