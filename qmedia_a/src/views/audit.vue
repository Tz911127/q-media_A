<template>
  <div>
    <el-tabs style="backdround:#fff;padding:10px" @tab-click="handleClick">
      <el-tab-pane>
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
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane>
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
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane>
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
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane>
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
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane>
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
      <el-tab-pane>
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
import { getCheckPage } from "@/api/audit.js";
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
      tab: 0
    };
  },
  methods: {
    handleClick(tab, event) {
      this.tab = JSON.parse(tab.index);
      this.tableParams.page = 0;
      this.tableParams.limit = 10;
      this.tableParams.flowType = "";
      this.tableParams.platformCheckType = "";
      this.tableParams.targetName = "";
      this.tableParams.ck = "";
      if (tab.index == 0) {
        this.tableParams.status = "";
        this.tableParams.platformCurrentLevel = 1;
        this.getCheckData();
      } else if (tab.index == 1) {
        this.tableParams.status = "";
        this.tableParams.platformCurrentLevel = 2;
        this.getCheckData();
      } else if (tab.index == 2) {
        this.tableParams.status = "";
        this.tableParams.platformCurrentLevel = 3;
        this.getCheckData();
      } else if (tab.index == 3) {
        this.tableParams.status = "";
        this.tableParams.platformCurrentLevel = 4;
        this.getCheckData();
      } else if (tab.index == 4) {
        this.tableParams.status = 1;
        this.tableParams.platformCurrentLevel = "";
        this.getCheckData();
      } else if (tab.index == 5) {
        this.tableParams.status = 5;
        this.tableParams.platformCurrentLevel = "";
        this.getCheckData();
      }
    },
    getData() {
      if (this.tab < 4) {
        this.tableParams.platformCurrentLevel = this.tab + 1;
      } else if (this.tab == 4) {
        this.tableParams.platformCurrentLevel = "";
        this.status = 1;
      } else {
        this.tableParams.platformCurrentLevel = "";
        this.status = 5;
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
      if (this.tab == 0) {
        this.tableParams.ck = this.$refs.check1.searchObj.ck;
        this.tableParams.targetName = this.$refs.check1.searchObj.targetName;
      } else if (this.tab == 1) {
        this.tableParams.ck = this.$refs.check2.searchObj.ck;
        this.tableParams.targetName = this.$refs.check2.searchObj.targetName;
      } else if (this.tab == 2) {
        this.tableParams.ck = this.$refs.check3.searchObj.ck;
        this.tableParams.targetName = this.$refs.check3.searchObj.targetName;
      } else if (this.tab == 3) {
        this.tableParams.ck = this.$refs.check4.searchObj.ck;
        this.tableParams.targetName = this.$refs.check4.searchObj.targetName;
      } else if (this.tab == 4) {
        this.tableParams.ck = this.$refs.check5.searchObj.ck;
        this.tableParams.targetName = this.$refs.check5.searchObj.targetName;
      } else if (this.tab == 5) {
        this.tableParams.ck = this.$refs.check6.searchObj.ck;
        this.tableParams.targetName = this.$refs.check6.searchObj.targetName;
      }

      this.getData();
    },
    handleSizeChange(val) {
      this.tableParams.limit = val;
      this.getCheckData();
    },
    handleCurrentChange(val) {
      this.tableParams.page = val - 1;
      this.getCheckData();
    }
  },
  mounted() {
    this.tableParams.platformCurrentLevel = 1;
    this.getCheckData();
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