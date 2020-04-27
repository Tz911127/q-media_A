<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="noticeTable"
    >
      <template slot="tableHeader">
        <div style="margin:15px 0">
          <el-button type="success" @click="createNotice">
            <i class="el-icon-plus"></i>添加通知
          </el-button>
        </div>
      </template>
    </basic-table>
    <!-- 创建 -->
    <v-dialog ref="noticeForm" @handleClose="handleClose">
      <notice-form ref="noticeObj"></notice-form>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import noticeForm from "../form/noticeForm";
import { getNoticePage, postNotice } from "@/api/notice.js";
export default {
  components: { basicTable, noticeForm },
  data() {
    return {
      loading: false,
      columns: [
        { label: "标题", prop: "title" },
        {
          label: "播放时间",
          overflow:true,
          render: (h, row) => {
            return (
              <span>
                {this.$filters.formateDate(String(row.period.dateStart))}至
                {this.$filters.formateDate(String(row.period.dateEnd))}{" "}
                {row.period.start}-{row.period.end}
              </span>
            );
          }
        },
        {
          label: "创建时间",
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.createTime)}</span>;
          }
        },
        {
          label: "操作账户",
          prop: "operationAccount"
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "发布",
                icon: "el-icon-s-fold",
                method: () => this.public(0, row)
              },
              {
                isShow: true,
                title: "查看发布终端",
                icon: "el-icon-view",
                method: () => this.public(1,row)
              }
            ];
            return h("table-operate", {
              attrs: {
                operateList: operateList,
                rowData: row,
                width: "100px"
              }
            });
          }
        }
      ],
      tableData: [],
      tableParams: {
        page: 0,
        limit: 10
      }
    };
  },
  methods: {
    callServer(pagination) {
      return getNoticePage(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.noticeTable.pagination.page = 0;
      this.$refs.noticeTable.currentPage = 1;
      this.$refs.noticeTable.fecthData();
    },
    public(i, row) {
      this.$emit("noticePublic", i, row);
    },
    createNotice() {
      this.$refs.noticeForm.dialogVisible = true;
    },
    handleClose() {
      this.$refs.noticeObj.validate(data => {
        let ruleForm = this.$refs.noticeObj.ruleForm;
        let params = {
          title: ruleForm.tit,
          content: ruleForm.content,
          period: {
            dateEnd: ruleForm.date[1],
            dateStart: ruleForm.date[0],
            end: ruleForm.time[1],
            start: ruleForm.time[0]
          }
        };
        postNotice(params).then(res => {
          this.$refs.noticeForm.dialogVisible = false;
          this.toast("创建成功", "success");
          this.getData();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>