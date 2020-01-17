<template>
  <div class="cctv-table-wrapper">
    <template>
      <slot name="tableHeader" :scope="{loading,tableData,multipleSelection}"></slot>
      <slot v-if="isOther" name="isOther" :scope="{loading,tableData,multipleSelection}"></slot>
      <el-table
        v-show="!isOther"
        :data="tableData"
        ref="elTable"
        tooltip-effect="dark"
        style="width: 100%"
        :show-header="showHeader || true"
        stripe
        v-loading="loading"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#fff',color:'#555'}"
      >
        <el-table-column v-if="muti" width="50" type="selection"></el-table-column>
        <el-table-column v-if="showIndex" :index="indexMethod" width="40" type="index"></el-table-column>
        <el-table-column
          v-for="(column,index) in columns"
          :label="column.label"
          :formatter="column.formatter || null"
          :key="index"
          v-show="!column.isHide"
          :width="column.width || null"
          :min-width="column.minWidth || null"
          :show-overflow-tooltip="column.overflow || false"
          :fixed="column.fixed || null"
          :sortable="column.sortable || null"
        >
          <!--   :extra="scope.$index" -->
          <template slot-scope="scope">
            <v-render v-if="column.render" :scope="scope.row" :render="column.render"></v-render>
            <!-- ="column.render" -->
            <span v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      style="margin-top:10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
      v-if="showFooter"
    ></el-pagination>
  </div>
</template>

<script>
import tableOperate from "./tableOperate";

export default {
  props: {
    callServer: Function,
    indexMethod: Function,
    fixed: String,
    isOther: {
      type: Boolean,
      default: false
    },
    muti: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    // loading: {
    //   type: Boolean,
    //   default: false
    // },
    limit: Number,
    showHeader: Boolean,
    propsData: Array,
    columns: Array,
    propPageSizes: Array,
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  components: {
    tableOperate
  },
  data() {
    return {
      res: {},
      tableData: this.propsData || [],
      total: 0,
      currentPage: 1,
      multipleSelection: [],
      loading: false,
      pagination: {
        page: 0,
        limit: this.limit || 10
      },
      pageSizes: this.propPageSizes || [10, 20, 30, 40]
    };
  },
  watch: {
    propsData(val) {
      if (val) {
        this.tableData = val;
      }
    }
  },
  created() {
    this.init();
  },
  computed: {
    isOperate: () => {
      return type => {
        if (type) {
          if (type == "operate") {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };
    }
  },
  methods: {
    init() {
      if (this.callServer) {
        this.fecthData();
      }
    },
    fecthData() {
      this.loading = true;
      this.callServer(this.pagination).then(res => {
        this.res = res;
        this.loading = false;
        this.total = res.total;
        this.tableData = res.data;
        this.getTableData();
      });
    },
    getTableData() {
      this.$emit("getTableData", this.res);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.elTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.elTable.clearSelection();
      }
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    selectAll(selected) {
      if (selected) {
        this.tableData.forEach(row => {
          this.$refs.elTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.elTable.clearSelection();
      }
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("selectionChange", val);
    },
    handleSortChange({ column, prop, order }) {
      this.$emit("handleSortChange", { column, prop, order });
    },
    handleSizeChange(val) {
      this.pagination.limit = val;
      this.fecthData();
    },
    handleCurrentChange(val) {
      this.pagination.page = val - 1;
      this.fecthData();
    },
    tableRowClassName({ rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 1) {
        return "warningRow";
      }
      return "";
    }
  }
};
</script>
<style>

</style>