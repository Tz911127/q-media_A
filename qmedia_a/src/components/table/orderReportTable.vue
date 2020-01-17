<template>
  <div>
    <basic-table :loading="loading" :columns="columns" :props-data="tableData" :muti="false"></basic-table>
    <v-dialog ref="orderReport" :showFooter="false" :title="`详情`" :width="`50%`"></v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
export default {
  components: {
    basicTable
  },
  data() {
    return {
      loading: false,
      columns: [
        { label: "时间", prop: "time" },
        { label: "待签" },
        { label: "待付款" },
        { label: "已付款" },
        { label: "已关闭" },
        { label: "合计" },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "查看",
                icon: "el-icon-view",
                method: () => this.review(row)
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
      tableData: [
        {
          time: "13"
        }
      ]
    };
  },
  methods: {
    review(row) {
      this.$refs.orderReport.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>