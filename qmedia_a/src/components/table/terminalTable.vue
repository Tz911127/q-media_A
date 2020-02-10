<template>
  <div>
    <basic-table
      :call-server="callServer"
      :columns="columns"
      :props-data="tableData"
      ref="terminalTable"
      @selectionChange="selectionChange"
    >
      <template slot="tableHeader">
        <div style="margin:15px 0">
          <v-select
            :placeholder="`运行状态`"
            @optionChange="excepteChange"
            :options="exceptes"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <v-select
            :placeholder="`在线状态`"
            @optionChange="statesChange"
            :options="states"
            style="width: 160px;margin-right:15px"
          ></v-select>

          <el-button style="float:right;" type="text" @click="onOpen">
            展开
            <i :class="icon"></i>
          </el-button>
          <el-button
            style="float:right;margin-right:10px"
            type="warning"
            icon="el-icon-search"
            @click="search"
          >查询</el-button>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="企业代码"
              v-model.trim="searchItem.ck"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="播控版本"
              v-model.trim="searchItem.appVersion"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="适配版本"
              v-model.trim="searchItem.adaptVersion"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="终端名称/编号"
              v-model.trim="searchItem.snOrName"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
          <transition name="slide-fade">
            <div v-if="slideFade" style="margin:15px 0">
              <v-city
                style="width: 160px;margin-right:15px;display:inline-block"
                @handleChange="handleChange"
              ></v-city>
              <v-selectRes
                :placeholder="`分辨率`"
                @optionChange="resoleChange"
                :options="resolutes"
                style="width: 160px;margin-right:15px"
              ></v-selectRes>
              <v-select
                :placeholder="`删除状态`"
                @optionChange="deleteChange"
                :options="dels"
                style="width: 160px;margin-right:15px"
              ></v-select>
              <v-select
                :placeholder="`停用状态`"
                @optionChange="enabledChange"
                :options="enableds"
                style="width: 160px;margin-right:15px"
              ></v-select>
              <v-select
                :placeholder="`播放版本升级状态`"
                @optionChange="appVerUpChange"
                :options="appVerUpStatuses"
                style="width: 160px;margin-right:15px"
              ></v-select>
              <v-select
                :placeholder="`适配版本升级状态`"
                @optionChange="adaptVerUpChange"
                :options="appVerUpStatuses"
                style="width: 160px;margin-right:15px"
              ></v-select>
            </div>
          </transition>
        </div>
        <div style="margin:15px 0">
          <el-tooltip
            effect="dark"
            content="请选择在线终端"
            placement="top-start"
            :disabled="!disabled"
            style="margin-right:15px "
          >
            <el-popover placement="bottom" width="50" trigger="click" :disabled="disabled">
              <el-button style="margin-left:10px" type="text">截屏</el-button>
              <el-button type="text">重启</el-button>
              <el-button type="text">磁盘清理</el-button>
              <el-button type="text" size="mini">获取运行日志</el-button>
              <el-button slot="reference" type="success" :disabled="disabled">
                发布命令
                <i class="el-icon-arrow-down"></i>
              </el-button>
            </el-popover>
          </el-tooltip>
          <v-tooltip :content="`终端升级`" :type="`success`" :onSubmit="devicesUp" :disabled="disabled"></v-tooltip>
          <v-tooltip
            :content="`终端启用`"
            :disabled="disabled"
            :type="`success`"
            :onSubmit="devicesEnable"
          ></v-tooltip>
          <v-tooltip
            :content="`设置开关机时间`"
            :disabled="disabled"
            :type="`warning`"
            :onSubmit="setTime"
          ></v-tooltip>
          <v-tooltip :content="`设置音量`" :disabled="disabled" :type="`warning`" :onSubmit="setVolue"></v-tooltip>
          <v-tooltip
            :content="`终端停用`"
            :disabled="disabled"
            :type="`danger`"
            :onSubmit="devicesUnEnable"
          ></v-tooltip>
        </div>
      </template>
    </basic-table>
    <!-- 弹窗 -->
    <v-dialog
      ref="terDialog"
      :title="title == 0?'开关机时间':title == 1?'音量设置':title == 2?'终端升级':title == 3?'':''"
      :width="title==2?`70%`:`50%`"
      @handleClose="handleClose"
      :showFooter="title==2?false:true"
    >
      <set-times v-if="title==0" ref="setTimes"></set-times>
      <set-volume v-if="title==1" ref="setVolume"></set-volume>
      <terminal-up-table
        v-if="title==2"
        :dialogData="dialogData"
        :dialogTotal="dialogTotal"
        :loading="dialogLoading"
        ref="terminalUp"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @upDevice="upDevice"
      ></terminal-up-table>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import setTimes from "../form/setTimes";
import setVolume from "../form/setVolume";
import terminalUpTable from "./terminalUpTable";
import {
  getDevicePage,
  enableDevice,
  deviceWorkCron,
  setVolumes,
  getVersionFile,
  getDeviceVersion,
  delDeviceFile
} from "@/api/terminal";
export default {
  components: {
    basicTable,
    setTimes,
    setVolume,
    terminalUpTable
  },
  data() {
    let cities = JSON.parse(localStorage.getItem("cities"));
    return {
      columns: [
        {
          label: "终端编号",
          render: (h, row) => {
            return (
              <div onClick={() => this.terminalDetail(row)}>
                <span class="btn-detail">{row.sn}</span>
                <span class="txt-red">
                  {row.exception == 1 ? "(异常)" : ""}
                </span>
                <span class="txt-red">{row.enabled == 0 ? "(停用)" : ""}</span>
                <span class="txt-red">{row.del == 1 ? "(已删)" : ""}</span>
              </div>
            );
          }
        },
        {
          label: "终端名称",
          prop: "name",
          overflow: true,
          render: (h, row) => {
            return (
              <span>{this.$filters.filterTerminal(row.name, row.del)}</span>
            );
          }
        },
        { label: "分辨率", prop: "resolution" },
        {
          label: "区/县",
          render(h, row) {
            return <span>{cities[row.district]}</span>;
          }
        },
        {
          label: "在线状态",
          render(h, row) {
            return <span>{row.state == 0 ? "离线" : "在线"}</span>;
          }
        },
        { label: "所属企业", prop: "ck" },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "播放管理",
                icon: "el-icon-video-play",
                method: () => this.playDevice(row)
              },
              {
                isShow: row.del == 1 ? false : true,
                title: "删除",
                icon: "el-icon-delete",
                method: () => this.delDevice(row)
              }
            ];
            return h("table-operate", {
              attrs: {
                operateList: operateList,
                rowData: row,
                width: "100px"
              }
            });
          }
        }
      ],
      tableData: [],
      tableParams: {
        limit: 10,
        page: 0
      },
      searchItem: {
        snOrName: "",
        adaptVersion: "",
        appVersion: "",
        ck: ""
      },
      exceptes: [
        { name: "正常", val: "0" },
        { name: "异常", val: "1" }
      ],
      states: [
        { name: "在线", val: "1" },
        { name: "离线", val: "0" }
      ],
      icon: "el-icon-arrow-down",
      slideFade: false,
      dels: [
        { name: "已删除", val: "1" },
        { name: "未删除", val: "0" }
      ],
      enableds: [
        { name: "已停用", val: "0" },
        { name: "未停用", val: "1" }
      ],
      appVerUpStatuses: [
        { name: "未升级", val: "0" },
        { name: "已升级", val: "1" }
      ],
      adaptVerUpStatuses: [
        { name: "未升级", val: "0" },
        { name: "已升级", val: "1" }
      ],
      resolutes: [],
      disabled: true,
      selectList: [],
      title: 0,
      dialogParams: {
        limit: 10,
        page: 0
      },
      dialogData: [],
      dialogTotal: 0,
      dialogLoading: true
    };
  },
  methods: {
    callServer(pagination) {
      return getDevicePage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.terminalTable.pagination.page = 0;
      this.$refs.terminalTable.currentPage = 1;
      this.$refs.terminalTable.fecthData();
    },
    playDevice(row) {},
    delDevice(row) {
      let that = this;
      this.confirm(`确定删除终端：` + row.name, "删除", {
        request: () => {
          return delDeviceFile(row);
        },
        success() {
          that.getData();
          that.toast("操作成功", "success");
        }
      });
    },
    search() {
      this.tableParams.snOrName = this.searchItem.snOrName;
      this.tableParams.adaptVersion = this.searchItem.adaptVersion;
      this.tableParams.appVersion = this.searchItem.appVersion;
      this.tableParams.ck = this.searchItem.ck;
      this.getData();
    },
    excepteChange(val) {
      this.tableParams.exception = val;
      this.search();
    },
    statesChange(val) {
      this.tableParams.state = val;
      this.search();
    },
    onOpen() {
      this.slideFade = !this.slideFade;
      if (this.icon == "el-icon-arrow-down") {
        this.icon = "el-icon-arrow-up";
      } else if (this.icon == "el-icon-arrow-up") {
        this.icon = "el-icon-arrow-down";
      }
    },
    deleteChange(val) {
      this.tableParams.del = val;
      this.search();
    },
    enabledChange(val) {
      this.tableParams.enabled = val;
      this.search();
    },
    appVerUpChange(val) {
      this.tableParams.appVerUpStatus = val;
      this.search();
    },
    adaptVerUpChange(val) {
      this.tableParams.adaptVerUpStatus = val;
      this.search();
    },
    handleChange(val) {
      if (val.length == 1) {
        this.tableParams.province = val[0];
        this.tableParams.city = "";
        this.tableParams.district = "";
      } else if (val.length == 2) {
        this.tableParams.province = val[0];
        this.tableParams.city = val[1];
        this.tableParams.district = "";
      } else {
        this.tableParams.province = val[0];
        this.tableParams.city = val[1];
        this.tableParams.district = val[2];
      }
      this.search();
    },
    resoleChange(val) {
      this.tableParams.resolutionH = val.split("*")[0];
      this.tableParams.resolutionV = val.split("*")[1];
      this.search();
    },
    //终端升级
    devicesUp() {
      this.title = 2;
      this.dialogParams = {
        limit: 10,
        page: 0
      };
      this.getVersionFileData();
    },
    getVersionFileData() {
      getVersionFile(this.dialogParams).then(res => {
        this.dialogData = res.data;
        this.dialogTotal = res.total;
        this.dialogLoading = false;
        this.$refs.terDialog.dialogVisible = true;
      });
    },
    handleSizeChange(val) {
      this.dialogParams.limit = val;
      this.dialogLoading = true;
      getVersionFile(this.dialogParams).then(res => {
        this.dialogLoading = false;
        this.dialogData = res.data;
        this.$refs.terminalUp.tableData = res.data;
      });
    },
    handleCurrentChange(val) {
      this.dialogParams.page = val - 1;
      this.dialogLoading = true;
      getVersionFile(this.dialogParams).then(res => {
        this.dialogLoading = false;
        this.dialogData = res.data;
        this.$refs.terminalUp.tableData = res.data;
      });
    },
    upDevice(row) {
      let deviceIds = [];
      this.selectList.map(val => {
        deviceIds.push(val.id);
      });
      let params = {
        versionFileId: row.id,
        deviceIds: deviceIds
      };
      getDeviceVersion(params).then(res => {
        this.toast("操作成功", "success");
        this.$refs.terDialog.dialogVisible = false;
        this.getData();
      });
    },
    //终端启用
    devicesEnable() {
      this.enabled(1);
    },
    //终端停用
    devicesUnEnable() {
      this.enabled(0);
    },
    enabled(e) {
      let that = this;
      let idList = [];
      this.selectList.map(val => {
        idList.push(val.id);
      });
      this.confirm(`是否` + (e == 1 ? "启用" : "停用") + `终端？`, "", {
        request: () => {
          let params = {
            idList: idList,
            enable: e
          };
          return enableDevice(params);
        },
        success() {
          that.getData();
          that.toast("操作成功", "success");
        }
      });
    },
    setTime() {
      this.$refs.terDialog.dialogVisible = true;
      this.title = 0;
    },
    setVolue() {
      this.$refs.terDialog.dialogVisible = true;
      this.title = 1;
    },
    handleClose() {
      if (this.title == 0) {
        let startTime = this.$refs.setTimes.startTime;
        let endTime = this.$refs.setTimes.endTime;
        let ids = "";
        this.selectList.map(val => {
          ids += val.id + ",";
        });
        if (startTime == "" || endTime == "") {
          this.$message.error("时间不能为空");
          return;
        }
        if (startTime > endTime) {
          this.$message.error("开始时间不能大于结束时间");
          return;
        }
        let workCron = startTime + "-" + endTime;
        let params = {
          idLists: ids,
          time: workCron
        };
        deviceWorkCron(params).then(res => {
          this.getData();
          this.toast("操作成功", "success");
          this.$refs.terDialog.dialogVisible = false;
        });
      } else if (this.title == 1) {
        let idList = [];
        this.selectList.map(val => {
          idList.push(val.id);
        });
        let val = this.$refs.setVolume.timeForm.voice;
        let domains = this.$refs.setVolume.timeForm.domains;
        this.$refs.setVolume.validate(data => {
          let period = [];
          for (let i = 0; i < domains.length; i++) {
            if (
              domains[i].voice == "" ||
              domains[i].voice > 100 ||
              domains[i].voice < 0
            ) {
              this.$message.error("请设置音量/0-100整数");
              return;
            }
            let obj = {};
            obj.t = domains[i].time[0] + "-" + domains[i].time[1];
            obj.v = domains[i].voice;
            period.push(obj);
          }
          if (domains.length == 2) {
            for (let i = 0; i < domains.length; i++) {
              let start = domains[i].time[0];
              let end = domains[i].time[1];
              for (let j = i + 1; j < domains.length; j++) {
                let startJ = domains[j].time[0];
                let endJ = domains[j].time[1];
                if (startJ > start) {
                  start = startJ;
                }
                if (endJ < end) {
                  end = endJ;
                }
                if (start < end) {
                  this.$message.error("时间段不能交叉");
                  return;
                }
              }
            }
          }
          let params = {
            idList: idList,
            volumeTarget: {
              val: val,
              period: period
            }
          };
          setVolumes(params).then(() => {
            this.getData();
            this.toast("操作成功", "success");
            this.$refs.terDialog.dialogVisible = false;
          });
        });
      }
    },
    selectionChange(val) {
      this.selectList = val;
      if (val.length != 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    terminalDetail(row) {
      this.$emit("terminalDetail", row);
    }
  },
  mounted() {
    this.resolutes = JSON.parse(
      localStorage.getItem("userInfo")
    ).sysConfig.resolutions;
  }
};
</script>

<style scoped>
.searchInput {
  width: 160px;
  float: right;
  margin-right: 15px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.el-popover button {
  display: block;
  width: 100%;
  text-align: left;
}
</style>