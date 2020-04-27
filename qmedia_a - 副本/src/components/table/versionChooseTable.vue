<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :call-server="callServer"
      ref="versionChooseTable"
    ></basic-table>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import { getVersionFile } from "@/api/system";
export default {
  components: {
    basicTable
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      columns: [
        { label: "版本名称", prop: "versionName" },
        {
          label: "上传时间",
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.createTime)}</span>;
          }
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "选择版本",
                method: () => this.chooseDeviceRow(row)
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
        limit: 10,
        page: 0
      }
    };
  },
  methods: {
    callServer(pagination) {
      this.tableParams.type = this.type;
      return getVersionFile(Object.assign(this.tableParams, pagination));
    },
    chooseDeviceRow(row) {
      this.$emit("chooseDeviceRow", row);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>