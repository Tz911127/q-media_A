<template>
  <div>
    <v-city
      style="width: 160px;margin-right:15px;display:inline-block"
      @handleChange="handleChange"
    ></v-city>
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
    <dialog-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></dialog-table>
  </div>
</template>

<script>
import dialogTable from "./components/dialogTable";
import { getListDevice } from "@/api/order";
export default {
  components: {
    dialogTable
  },
  props: {
    // dialogData: Array,
    status: Number,
    // total: Number,
    rowData: Object
  },
  data() {
    return {
      tableData: [],
      total: 0,
      loading: true,
      columns: [
        { label: "终端编号", prop: "sn" },
        {
          label: "终端名称",
          render: (h, row) => {
            return (
              <span>{this.$filters.filterPrograms(row.name, row.del)}</span>
            );
          }
        },
        {
          label: "在线状态",
          render(h, row) {
            return <span>{row.state == 0 ? "离线" : "在线"}</span>;
          }
        }
      ],
      searchItem: {
        snOrName: ""
      },
      states: [
        { name: "在线", val: "1" },
        { name: "离线", val: "0" }
      ],
      tableParams: {
        orderId: this.rowData.id,
        page: 0,
        limit: 10
      }
    };
  },
  methods: {
    getData() {
      this.loading = true;
      getListDevice(this.tableParams)
        .then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(err => {});
    },
    handleSizeChange(val) {
      this.tableParams.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.tableParams.page = val - 1;
      this.getData();
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
      this.getData();
    },
    statesChange(val) {
      this.tableParams.state = val;
      this.getData();
    },
    search() {
      this.tableParams.snOrName = this.searchItem.snOrName;
      this.getData();
    }
  },
  computed: {
    state() {
      if (this.status == 1 || this.status == 2) {
        this.columns.push({
          label: "状态",
          render(h, row) {
            return <span>{row.syncStatus == 0 ? "待执行" : "成功"}</span>;
          }
        });
      } else {
        if (this.columns.length == 4) {
          this.columns.pop();
        }
      }
    }
  },
  watch: {
    state(val) {},

    rowData: function() {
      this.getData();
    }
  },

  mounted() {
    this.getData();
  }
};
</script>

<style  scoped>
.searchInput {
  width: 160px;
  float: right;
  margin-right: 15px;
}
</style>