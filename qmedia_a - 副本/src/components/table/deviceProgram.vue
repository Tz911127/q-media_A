<template>
  <div>
    <div style="margin-bottom:30px">
      <span>终端编号:{{rowData.sn}}</span>
      <span style="margin-left:20px">终端名称:{{rowData.name |filterPrograms(rowData.del)}}</span>
    </div>

    <el-table
      :data="playData"
      style="margin:20px 0;width:100%"
      :header-cell-style="{background:'#fff',color:'#555'}"
      :row-class-name="tableRowClassName"
      @cell-click="cellProgram"
      :cell-style="cellStyle"
    >
      <el-table-column property="programName" label="广告名称"></el-table-column>
      <el-table-column property="schedules" label="播放时间" width="300px">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p style="font-size:12px">播放次数:连续播放 {{ scope.row.schedules[0].period[0].times }}次</p>
            <p style="font-size:12px">优先级: 优先级{{ scope.row.schedules[0].period[0].level }}</p>
            <p
              style="font-size:12px"
              v-for=" (item,index) in scope.row.schedules[0].period "
              :key="index"
            >播放周期：{{item.start}}-{{item.end}} {{item.weeks|filterWeek(scope.row.scheduleType)}}</p>

            <div slot="reference" class="name-wrapper">{{scope.row.schedules|filtersDate}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column property="scheduleType" label="播放方式">
        <template slot-scope="scope">{{scope.row.scheduleType == 0 ? "轮播" : "插播"}}</template>
      </el-table-column>
      <el-table-column property="programSyncStatus" label="状态">
        <template slot-scope="scope">{{scope.row.programSyncStatus== 0 ? "待执行" : "成功"}}</template>
      </el-table-column>
    </el-table>
    <v-dialog title="广告预览" ref="deviceDialog" :showFooter="false" width="55%">
      <program-form :data="proRevData"></program-form>
    </v-dialog>
  </div>
</template>

<script>
import dialogTable from "./components/dialogTable";
import programForm from "@/components/form/programForm";
import { getProgramDetail } from "@/api/terminal";
export default {
  components: {
    dialogTable,
    programForm
  },
  props: {
    rowData: Object,
    playData: Array
  },
  data() {
    return {
      loading: false,
    //   tableData: this.playData,
      outerVisible: false,
      proRevData: {}
    };
  },
  methods: {
    cellProgram(row, column, event, cell) {
      this.title = "广告预览";
      let params = {
        id: row.programId
      };
      getProgramDetail(params).then(res => {
        this.proRevData = res;
        this.$refs.deviceDialog.dialogVisible = true;
        this.programContent = {};
        this.programContent.content = JSON.parse(this.proRevData.content).pages;
        this.programContent.pixelHorizontal = this.proRevData.width;
        this.programContent.pixelVertical = this.proRevData.height;
        this.programContent.programDialogType = 1;
        this.$store.commit("SET_PROGRAM_CONTENT", this.programContent);
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warningRow";
      }
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label == "广告名称") {
        return "cursor:pointer;color:#409eff";
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>