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
            <span class="btn-detail" @click="review(scope.row)">{{scope.row.name}}</span>
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
    <!-- 预览 -->
    <v-dialog ref="programDialog" :width="`50%`" :showFooter="false" title="广告预览">
      <program-form :data="programForm"></program-form>
    </v-dialog>
  </div>
</template>

<script>
import { getCompanyFillList } from "@/api/business";
import { getProgramDetail } from "@/api/program";
import dialogTable from "./components/dialogTable";
import programForm from "@/components/form/programForm";
export default {
  props: {
    fillData: Array,
    rowId: String,
    adData: Array,
    loading: Boolean
  },
  components: {
    dialogTable,
    programForm
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
            return (
              <span onClick={() => this.review(row)} class="btn-detail">
                {row.name}
              </span>
            );
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
      ],
      programForm: {}
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
    },
    review(row) {
      getProgramDetail(row).then(res => {
        this.$refs.programDialog.dialogVisible = true;
        this.programForm = res;
        this.programContent = {};
        this.programContent.content = JSON.parse(res.content).pages;
        this.programContent.pixelHorizontal = res.width;
        this.programContent.pixelVertical = res.height;
        this.programContent.programDialogType = 1;
        this.$store.commit("SET_PROGRAM_CONTENT", this.programContent);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>