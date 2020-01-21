<template>
  <div>
    <basic-table
      :call-server="callServer"
      :columns="columns"
      :props-data="tableData"
      ref="terminalTable"
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
      </template>
    </basic-table>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import { getDevicePage } from "@/api/terminal";
export default {
  components: {
    basicTable
  },
  data() {
    let cities = JSON.parse(localStorage.getItem("cities"));
    return {
      columns: [
        {
          label: "终端编号",
          render: (h, row) => {
            return (
              <div>
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
      resolutes:[]
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
</style>