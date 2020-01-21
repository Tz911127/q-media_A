<template>
  <div>
    <span class="el-upload__tip">提示：终端可按横竖屏各添加一个垫播广告，在轮播、插播未覆盖的时段播放，选择后无需发布</span>
    <dialog-table :propsData="fillData" :columns="columns" :loading="loading" :isFoot="false"></dialog-table>
    <el-dialog width="30%" title="选择广告" :visible.sync="innerVisible" append-to-body>
      <span class="el-upload__tip">提示：系统已自动筛选出与屏幕一致且大小不超过100M的广告</span>
      <el-table
        :data="adData"
        :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#fff',color:'#555'}"
      >
        <el-table-column property="name" label="广告名称">
          <template slot-scope="scope">
            <span class="btn-detail">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="setProgram(scope.row)" type="text" size="small">
              <el-tooltip placement="top-start">
                <div slot="content">设为垫播</div>
                <i class="el-icon-files" style=" color: black;font-size:18px"></i>
              </el-tooltip>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyFillList } from "@/api/business";
import dialogTable from "./components/dialogTable";
export default {
  props: {
    fillData: Array,
    rowId: String,
    adData: Array,
    loading: Boolean
  },
  components: {
    dialogTable
  },
  data() {
    return {
      innerVisible: false,
      columns: [
        {
          label: "屏幕类型",
          prop: "resolutionType",
          render(h, row) {
            return <span>{row.resolutionType == 0 ? "横屏" : "竖屏"}</span>;
          }
        },
        {
          label: "当前垫播广告",
          render: (h, row) => {
            return <span class="btn-detail">{row.name}</span>;
          }
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "选择广告",
                icon: "el-icon-files",
                method: () => this.handleClick(0, row)
              },
              {
                isShow: true,
                title: "删除",
                icon: "el-icon-delete",
                method: () => this.handleClick(1, row)
              }
            ];
            return h("table-operate", {
              attrs: {
                operateList: operateList,
                rowData: row,
                width: "150px"
              }
            });
          }
        }
      ]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 1) {
        return "warningRow";
      }
    },
    handleClick(index, row) {
      if (index == 0) {
        this.innerVisible = true;
      }
      this.$emit("handleClick", index, row);
    },
    setProgram(row) {
      this.$emit("setProgram", row);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>