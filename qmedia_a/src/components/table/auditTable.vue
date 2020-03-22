<template>
  <div>
    <div style="margin: 15px 0;">
      <v-select
        :placeholder="`内容类型`"
        @optionChange="typeChange"
        :options="types"
        style="width: 160px;margin-right:15px"
      ></v-select>
      <v-select
        :placeholder="`审核类型`"
        @optionChange="checkTypeChange"
        :options="checkTypes"
        style="width: 160px;margin-right:15px"
      ></v-select>
      <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
      <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
        <el-input
          placeholder="企业代码"
          v-model.trim="searchObj.ck"
          @keyup.enter.native="search"
          clearable
        ></el-input>
      </div>
      <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
        <el-input
          placeholder="内容名称"
          v-model.trim="searchObj.targetName"
          @keyup.enter.native="search"
          clearable
        ></el-input>
      </div>
    </div>
    <dialog-table
      :loading="loading"
      :columns="columns"
      :props-data="data"
      :muti="false"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></dialog-table>
  </div>
</template>

<script>
import dialogTable from "./components/dialogTable";
export default {
  components: {
    dialogTable
  },
  props: {
    data: Array,
    total: Number,
    loading: Boolean
  },
  data() {
    return {
      columns: [
        {
          label: "名称",
          prop: "name",
          overflow: true
        },
        {
          label: "类型",
          render(h, row) {
            return <span>{row.type == 0 ? "素材" : "节目"}</span>;
          }
        },
        {
          label: "企业代码",
          prop: "ck"
        },
        {
          label: "企业名称",
          prop: "ck"
        },
        {
          label: "审核状态",
          render(h, row) {
            return (
              <span>
                {row.status == 1
                  ? "审核成功"
                  : row.status == 2
                  ? "内部审核中"
                  : row.status == 3
                  ? "平台审核中"
                  : row.status == 4
                  ? "内部审核失败"
                  : "审核失败（平台）"}
              </span>
            );
          }
        },
        {
          label: "提交时间",
          render: (h, row) => {
            return <span>{this.$filters.filterTime(row.submitTime)}</span>;
          }
        },
        {
          label: "审核账号",
          prop: "lastChecker"
        },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: true,
                title: "详情",
                icon: "el-icon-tickets",
                method: () => this.detail(row)
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
      types: [
        {
          name: "素材",
          val: 0
        },
        {
          name: "节目",
          val: 1
        }
      ],
      checkTypes: [
        { name: "平台审核", val: 0 },
        { name: "CCTV审核", val: 1 }
      ],
      searchObj: {
        ck: "",
        targetName: ""
      }
    };
  },
  methods: {
    detail(row) {},
    typeChange(val) {
      this.$emit("typeChange", val);
    },
    checkTypeChange(val) {
      this.$emit("checkTypeChange", val);
    },
    search() {
      this.$emit("search", this.searchObj);
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

<style lang="scss" scoped>
</style>