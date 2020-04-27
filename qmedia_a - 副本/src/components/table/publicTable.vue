<template>
  <div>
    <div class="page-title" style="cursor:pointer" @click="reBack">
      <i class="el-icon-arrow-left"></i> 返回/发布终端
    </div>
    <div class="notice">
      <h3>{{rowData.row.title}}</h3>
      <div>
        <span>通知内容:{{rowData.row.content}}</span>
        <br />
        <span>播放时间:{{this.$filters.formateDate(rowData.row.period.dateStart)}}至{{this.$filters.formateDate(rowData.row.period.dateEnd)}}</span>
        <span>{{rowData.row.period.start}}-{{rowData.row.period.end}}</span>
      </div>
    </div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="true"
      :call-server="callServer"
      @selectionChange="selectionChange"
      ref="publicTable"
    >
      <template slot="tableHeader">
        <div style="margin:15px 0">
          <v-city
            style="width: 140px;margin-right:15px;display:inline-block"
            @handleChange="handleChange"
          ></v-city>
          <v-selectRes
            :placeholder="`分辨率`"
            @optionChange="resoleChange"
            style="width: 140px;margin-right:15px"
            :options="resolutes"
          ></v-selectRes>
          <v-select :placeholder="`在线状态`" @optionChange="statesChange" :options="states"></v-select>
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
          <div class="select-wraper searchInput">
            <el-input
              placeholder="企业代码"
              v-model.trim="searchItem.ck"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
        </div>
        <div style="margin:15px 0">
          <div class="checkAll">
            <el-checkbox
              v-model="checked"
              :indeterminate="indeterminate"
              @change="toggleSelection"
            >选择全部</el-checkbox>
            <span class="checkTotal">
              当前已选择
              <span v-if="checked">{{total}}</span>
              <span v-else>{{selectList.length}}</span>
              个终端
            </span>
            <el-button
              size="mini"
              :type="rowData.i==0?'primary':'danger'"
              @click="postNotice"
            >{{rowData.i==0?'发布':'停播'}}</el-button>
          </div>
        </div>
      </template>
    </basic-table>
  </div>
</template>

<script>
import { getNoticeDevice, patchNoticePlay } from "@/api/notice";
import basicTable from "./components/basicTable";
export default {
  components: { basicTable },
  props: {
    rowData: Object
  },
  data() {
    return {
      loading: true,
      columns: [
        { label: "终端编号", prop: "sn" },
        { label: "终端名称", prop: "name" },
        {
          label: "在线状态",
          render(h, row) {
            return <span>{row.state == 0 ? "离线" : "在线"}</span>;
          }
        }
      ],
      tableData: [],
      tableParams: {
        page: 0,
        limit: 10
      },
      resolutes: [],
      states: [
        { name: "在线", val: "1" },
        { name: "离线", val: "0" }
      ],
      searchItem: {
        snOrName: "",
        ck: ""
      },
      checked: false,
      indeterminate: false,
      total: 0,
      selectList: [],
      type: "",
      content: ""
    };
  },
  methods: {
    reBack() {
      this.$emit("reBack");
    },
    callServer(pagination) {
      if (this.rowData.i == 1) {
        this.tableParams.urgentNoticeId = this.rowData.row.id;
      } else {
        this.tableParams.urgentNoticeId = "";
      }
      return getNoticeDevice(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.publicTable.pagination.page = 0;
      this.$refs.publicTable.currentPage = 1;
      this.$refs.publicTable.fecthData();
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
    search() {
      this.tableParams.snOrName = this.searchItem.snOrName;
      this.tableParams.ck = this.searchItem.ck;
      this.getData();
    },
    toggleSelection(e) {
      if (e) {
        this.total = this.$refs.publicTable.total;
      } else {
        this.total = 0;
      }
    },
    selectionChange(val) {
      this.selectList = val;
    },
    postNotice() {
      let deviceIds = [];
      for (let i = 0; i < this.selectList.length; i++) {
        deviceIds.push(this.selectList[i].id);
      }
      let params = {
        publish: this.rowData.i == 0 ? 1 : 0,
        urgentNoticeId: this.rowData.row.id
      };
      if (this.checked) {
        params.queryAll = {
          state: this.tableParams.state,
          ck: this.tableParams.ck,
          snOrName: this.tableParams.snOrName,
          resolutionV: this.tableParams.resolutionV,
          resolutionH: this.tableParams.resolutionH,
          city: this.tableParams.city,
          district: this.tableParams.district,
          province: this.tableParams.province
        };
      } else {
        params.deviceIds = deviceIds;
      }
      patchNoticePlay(params).then(res => {
        this.toast("操作成功", "success");
        this.reBack();
      });
    },
    statesChange(val) {
      this.tableParams.state = val;
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

<style  scoped>
.notice {
  margin-bottom: 30px;
  font-size: 14px;
}

.checkAll {
  border: 1px solid rgba(77, 121, 246, 0.4);
  background-color: rgba(77, 121, 246, 0.1);
  padding: 15px 6px;
  border-radius: 4px;
  font-size: 14px;
  color: rgba(53, 68, 110, 1);
}
.checkAll .checkTotal {
  margin-right: 20px;
}
</style>