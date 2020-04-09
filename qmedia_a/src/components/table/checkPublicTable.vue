<template>
  <div>
    <div class="page-title" style="cursor:pointer" @click="reBack">
      <i class="el-icon-arrow-left"></i> 返回/查看发布终端
    </div>
    <div class="notice">
      <div>广告名称：{{rowData.name}}</div>
      <div>
        <el-popover trigger="hover" placement="top">
          <p>播放次数:连续播放{{times}}次</p>
          <p>优先级: 优先级{{level}}</p>
          <div>
            播放周期：
            <div
              v-for=" (item,index) in period "
              :key="index"
            >{{item.start}}-{{item.end}} {{item.weeks|filterWeek(scheduleType)}}</div>
          </div>

          <span slot="reference" class="name-wrapper">播放时间：{{schedules|filtersDate}}</span>
        </el-popover>
      </div>
      <div>播放方式：{{scheduleType|filtersType}}</div>
    </div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="checkPublicTable"
      @getTableData="getTableData"
    >
      <template slot="tableHeader">
        <div style="margin:15px 0">
          <v-city
            style="width: 160px;margin-right:15px;display:inline-block"
            @handleChange="handleChange"
          ></v-city>
          <v-selectRes
            :placeholder="`分辨率`"
            @optionChange="resoleChange"
            style="width: 160px;margin-right:15px"
            :options="resolutes"
          ></v-selectRes>
          <v-select :placeholder="`在线状态`" @optionChange="statesChange" :options="states"></v-select>
          <v-select :placeholder="`发布状态`" @optionChange="syncStatusChange" :options="syncStatuses"></v-select>
          <el-button
            style="float:right;margin-right:10px"
            type="warning"
            icon="el-icon-search"
            @click="search"
          >查询</el-button>
          <div class="select-wraper searchInput">
            <el-input
              placeholder="终端名称/编号"
              v-model.trim="searchItem.snOrName"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
        </div>
      </template>
    </basic-table>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import { getProgramPlay } from "@/api/program";
import { format } from "util";
export default {
  props: {
    rowData: Object
  },
  components: {
    basicTable
  },
  data() {
    return {
      loading: true,
      columns: [
        { label: "终端编号", prop: "deviceSn" },
        {
          label: "终端名称",
          prop: "deviceName"
        },
        {
          label: "在线状态",
          render(h, row) {
            return <span>{row.state == 0 ? "离线" : "在线"}</span>;
          }
        },
        {
          label: "状态",
          render(h, row) {
            return <span>{row.syncStatus == 0 ? "待执行" : "成功"}</span>;
          }
        }
      ],
      tableData: [],
      tableParams: {
        page: 0,
        limit: 10,
        programId: this.rowData.id
      },
      searchItem: {
        snOrName: ""
      },
      resolutes: [],
      states: [
        { name: "在线", val: "1" },
        { name: "离线", val: "0" }
      ],
      syncStatuses: [
        { name: "成功", val: "1" },
        { name: "待执行", val: "0" }
      ],
      scheduleType: "",
      schedules: "",
      times: 0,
      level: 0,
      period: []
    };
  },
  methods: {
    reBack() {
      this.$emit("reBack");
    },
    callServer(pagination) {
      return getProgramPlay(Object.assign(this.tableParams, pagination));
    },
    getTableData(e) {
      if (e.data.length > 0) {
        this.scheduleType = e.data[0].scheduleType;
        this.schedules = e.data[0].schedules;
        this.times = e.data[0].schedules[0].period[0].times;
        this.level = e.data[0].schedules[0].period[0].level;
        this.period = e.data[0].schedules[0].period;
      }
    },
    getData() {
      this.$refs.checkPublicTable.pagination.page = 0;
      this.$refs.checkPublicTable.currentPage = 1;
      this.$refs.checkPublicTable.fecthData();
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
    statesChange(val) {
      this.tableParams.state = val;
      this.search();
    },
    syncStatusChange(val) {
      this.tableParams.syncStatus = val;
      this.search();
    },
    search() {
      this.tableParams.snOrName = this.searchItem.snOrName;
      this.getData();
    }
  },

  mounted() {
    this.resolutes = JSON.parse(
      localStorage.getItem("userInfo")
    ).sysConfig.resolutions;
  }
};
</script>

<style lang="scss" scoped>
</style>