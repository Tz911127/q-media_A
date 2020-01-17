<template>
  <div>
    <el-table
      :data="tableData"
      ref="elTable"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      v-loading="loading"
      :row-class-name="tableRowClassName"
      :header-cell-style="{background:'#fff',color:'#555'}"
    >
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
      >
        <template slot-scope="scope">
          <v-render v-if="column.render" :scope="scope.row" :render="column.render"></v-render>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="isFoot"
      style="margin-top:10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import tableOperate from "./tableOperate";
export default {
  components: {
    tableOperate
  },
  props: {
    propsData: Array,
    columns: Array,
    loading: {
      type: Boolean,
      default: true
    },
    total: Number,
    isFoot: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      res: {},
      tableData: this.propsData || [],
      currentPage: 1,
      multipleSelection: [],
      pagination: {
        page: 0,
        limit: this.limit || 10
      }
    };
  },
  watch: {
    propsData(val) {
      if (val) {
        this.tableData = val;
      }
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 1) {
        return "warningRow";
      }
      return "";
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>