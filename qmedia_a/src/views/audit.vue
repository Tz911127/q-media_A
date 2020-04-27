<template>
  <div>
    <el-tabs style="backdround:#fff;padding:10px" @tab-click="handleClick" v-model="activeName">
      <el-tab-pane v-if="perms('61')" name="first">
        <span slot="label">
          <span>一级审核</span>
          <span class="platFont">{{extra.platformLv1}}</span>
        </span>
        <audit-table
          ref="check1"
          :data="data"
          :total="total"
          :loading="loading"
          :tab="tab"
          @typeChange="typeChange"
          @checkTypeChange="checkTypeChange"
          @search="search"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleClose="handleClose"
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane v-if="perms('62')" name="second">
        <span slot="label">
          <span>二级审核</span>
          <span class="platFont">{{extra.platformLv2}}</span>
        </span>
        <audit-table
          ref="check2"
          :data="data"
          :total="total"
          :loading="loading"
          :tab="tab"
          @typeChange="typeChange"
          @checkTypeChange="checkTypeChange"
          @search="search"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleClose="handleClose"
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane v-if="perms('63')" name="third">
        <span slot="label">
          <span>三级审核</span>
          <span class="platFont">{{extra.platformLv3}}</span>
        </span>
        <audit-table
          ref="check3"
          :data="data"
          :total="total"
          :loading="loading"
          :tab="tab"
          @typeChange="typeChange"
          @checkTypeChange="checkTypeChange"
          @search="search"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleClose="handleClose"
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane v-if="perms('64')" name="fourth">
        <span slot="label">
          <span>四级审核</span>
          <span class="platFont">{{extra.platformLv4}}</span>
        </span>
        <audit-table
          ref="check4"
          :data="data"
          :total="total"
          :loading="loading"
          :tab="tab"
          @typeChange="typeChange"
          @checkTypeChange="checkTypeChange"
          @search="search"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleClose="handleClose"
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane name="fifth">
        <span slot="label">审核通过</span>
        <audit-table
          ref="check5"
          :data="data"
          :total="total"
          :loading="loading"
          :tab="tab"
          @typeChange="typeChange"
          @checkTypeChange="checkTypeChange"
          @search="search"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane name="sixth">
        <span slot="label">审核不通过</span>
        <audit-table
          ref="check6"
          :data="data"
          :total="total"
          :loading="loading"
          :tab="tab"
          @typeChange="typeChange"
          @checkTypeChange="checkTypeChange"
          @search="search"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        ></audit-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getCheckPage,
  patchCheck1,
  patchCheck2,
  patchCheck3,
  patchCheck4
} from "@/api/audit.js";
import auditTable from "../components/table/auditTable";
export default {
  components: {
    auditTable
  },
  data() {
    return {
      extra: {},
      data: [],
      total: 0,
      loading: false,
      tableParams: {
        page: 0,
        limit: 10
      },
      tab: 0,
      activeName: "first",
      tabName: ""
    };
  },

  methods: {
    handleClick(tab, event) {
      this.tab = JSON.parse(tab.index);
      this.tabName = tab.name;
      this.tableParams.page = 0;
      this.tableParams.limit = 10;
      this.tableParams.flowType = "";
      this.tableParams.platformCheckType = "";
      this.tableParams.targetName = "";
      this.tableParams.ck = "";

      if (tab.name == "sixth") {
        this.tableParams.status = 5;
        this.tableParams.platformCurrentLevel = "";
        this.getCheckData();
      } else if (tab.name == "fifth") {
        this.tableParams.status = 1;
        this.tableParams.platformCurrentLevel = "";
        this.getCheckData();
      } else {
        this.tableParams.platformCurrentLevel =
          tab.name == "first"
            ? 1
            : tab.name == "second"
            ? 2
            : tab.name == "third"
            ? 3
            : 4;
        this.tableParams.status = "";
        this.getCheckData();
      }
    },
    getData() {
      if (this.activeName == "fifth") {
        this.tableParams.platformCurrentLevel = "";
        this.status = 1;
      } else if (this.activeName == "sixth") {
        this.tableParams.platformCurrentLevel = "";
        this.status = 5;
      } else {
        this.tableParams.platformCurrentLevel =
          this.activeName == "first"
            ? 1
            : this.activeName == "second"
            ? 2
            : this.activeName == "third"
            ? 3
            : 4;
      }

      this.getCheckData();
    },
    getCheckData() {
      this.loading = true;
      getCheckPage(this.tableParams)
        .then(res => {
          this.loading = false;
          this.extra = res.extra;
          this.data = res.data;
          this.total = res.total;
          let extraTotal = this.extra.platformLv1
            ? this.extra.platformLv1
            : 0 + this.extra.platformLv2
            ? this.extra.platformLv2
            : 0 + this.extra.platformLv3
            ? this.extra.platformLv3
            : 0 + this.extra.platformLv4
            ? this.extra.platformLv4
            : 0;
          this.$root.eventHub.$emit("extraTotal", extraTotal);
        })
        .catch(err => {});
    },
    typeChange(val) {
      this.tableParams.flowType = val;
      this.search();
    },
    checkTypeChange(val) {
      this.tableParams.platformCheckType = val;
      this.search();
    },
    search() {
      if (this.tabName == "first") {
        this.tableParams.ck = this.$refs.check1.searchObj.ck;
        this.tableParams.targetName = this.$refs.check1.searchObj.targetName;
      } else if (this.tabName == "second") {
        this.tableParams.ck = this.$refs.check2.searchObj.ck;
        this.tableParams.targetName = this.$refs.check2.searchObj.targetName;
      } else if (this.tabName == "third") {
        this.tableParams.ck = this.$refs.check3.searchObj.ck;
        this.tableParams.targetName = this.$refs.check3.searchObj.targetName;
      } else if (this.tabName == "fourth") {
        this.tableParams.ck = this.$refs.check4.searchObj.ck;
        this.tableParams.targetName = this.$refs.check4.searchObj.targetName;
      } else if (this.tabName == "fifth") {
        this.tableParams.ck = this.$refs.check5.searchObj.ck;
        this.tableParams.targetName = this.$refs.check5.searchObj.targetName;
      } else if (this.tabName == "sixth") {
        this.tableParams.ck = this.$refs.check6.searchObj.ck;
        this.tableParams.targetName = this.$refs.check6.searchObj.targetName;
      }

      this.getCheckData();
    },
    handleSizeChange(val) {
      this.tableParams.limit = val;
      this.getCheckData();
    },
    handleCurrentChange(val) {
      this.tableParams.page = val - 1;
      this.getCheckData();
    },
    handleClose(val) {
      let params = {
        id: val.id
      };
      this.sentData(params);
    },
    sentData(params) {
      if (this.tab == 0) {
        patchCheck1(params).then(res => {});
      } else if (this.tab == 1) {
        patchCheck2(params).then(res => {});
      } else if (this.tab == 2) {
        patchCheck3(params).then(res => {});
      } else if (this.tab == 3) {
        patchCheck4(params).then(res => {});
      }

      this.toast("操作成功", "success");
      this.getData();
    }
  },
  mounted() {
    setTimeout(() => {
      this.activeName = this.perms("61")
        ? "first"
        : this.perms("62")
        ? "second"
        : this.perms("63")
        ? "third"
        : this.perms("64")
        ? "fourth"
        : "fifth";

      this.tableParams.platformCurrentLevel = this.perms("61")
        ? 1
        : this.perms("62")
        ? 2
        : this.perms("63")
        ? 3
        : this.perms("64")
        ? 4
        : "";
      this.tableParams.status =
        this.perms("61") ||
        this.perms("62") ||
        this.perms("63") ||
        this.perms("64")
          ? ""
          : 1;
      this.getCheckData();
    }, 500);
  }
};
</script>

<style  scoped>
.platFont {
  font-size: 12px;
  color: rgba(241, 100, 108, 1);
  margin-left: 5px;
}
</style>