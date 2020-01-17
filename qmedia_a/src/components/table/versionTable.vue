<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :call-server="callServer"
      :props-data="tableData"
      :muti="false"
      ref="versionTable"
    >
      <template slot="tableHeader">
        <div style="margin: 15px 0;">
          <v-select
            :placeholder="`文件类型`"
            @optionChange="typeChange"
            :options="types"
            style="width: 160px;margin-right:15px"
          ></v-select>
          <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>
          <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
            <el-input
              placeholder="版本名称"
              v-model.trim="versionName"
              @keyup.enter.native="search"
              clearable
            ></el-input>
          </div>
        </div>
        <div>
          <div style="margin: 15px 0;">
            <el-button type="success" @click="addVersion">
              <i class="el-icon-plus"></i> 添加版本
            </el-button>
          </div>
        </div>
      </template>
    </basic-table>
    <v-dialog
      ref="versionDialog"
      :title="title==0?'查看版本功能':'添加版本'"
      :showFooter="title==0?false:true"
      @handleClose="handleClose"
    >
      <version-form v-if="title ==0" :versionForm="versionForm"></version-form>
      <add-version-form v-else ref="addVersionForm"></add-version-form>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import versionForm from "../form/versionForm";
import addVersionForm from "../form/addVersionForm";
import { getVersionFile, delVersion } from "../../api/system";
export default {
  components: {
    basicTable,
    versionForm,
    addVersionForm
  },
  data() {
    return {
      loading: true,
      columns: [
        {
          label: "版本名称",
          prop: "versionName",
          width: "300"
        },
        {
          label: "文件类型",
          render(h, row) {
            return <span>{row.type == 0 ? "主程序" : "适配程序"}</span>;
          }
        },
        {
          label: "大小",
          render: (h, row) => {
            return <span>{this.$filters.programMb(row.size)}</span>;
          }
        },
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
                title: "删除",
                icon: "el-icon-delete",
                method: () => this.deleteDevice(row)
              },
              {
                isShow: true,
                title: "下载",
                icon: "el-icon-download",
                method: () => this.downDevice(row)
              },
              {
                isShow: true,
                title: "查看版本功能",
                icon: "el-icon-view",
                method: () => this.reviewDevice(row)
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
      },
      types: [
        {
          name: "主程序",
          val: 0
        },
        {
          name: "适配程序",
          val: 1
        }
      ],
      versionName: "",
      versionForm: {},
      title: 0
    };
  },
  methods: {
    callServer(pagination) {
      return getVersionFile(Object.assign(this.tableParams, pagination));
    },
    getData() {
      this.$refs.versionTable.pagination.page = 0;
      this.$refs.versionTable.currentPage = 1;
      this.$refs.versionTable.fecthData();
    },
    deleteDevice(row) {
      let that = this;
      this.confirm(`确认删除？` + row.versionName, "删除", {
        request: () => {
          return delVersion(row);
        },
        success() {
          that.getData();
          that.toast("操作成功", "success");
        }
      });
    },
    downDevice(row) {
      this.$confirm("确认下载？" + row.versionName)
        .then(_ => {
          window.open(this.userInfo.cdnImgUrl + row.path);
          done();
        })
        .catch(_ => {});
    },
    reviewDevice(row) {
      this.$refs.versionDialog.dialogVisible = true;
      this.title = 0;
      this.versionForm = row;
    },
    typeChange(val) {
      this.tableParams.type = val;
      this.search();
    },
    search() {
      this.tableParams.versionName = this.versionName;
      this.getData();
    },
    addVersion() {
      this.$refs.versionDialog.dialogVisible = true;
      this.title = 1;
    },
    handleClose() {
      if (this.$refs.addVersionForm.addVersionForm.versionName == "") {
        this.toast("请上传文件", "error");
        return;
      }
      if (this.$refs.addVersionForm.addVersionForm.remark == "") {
        this.toast("请填写功能说明", "error");
        return;
      }
      this.$refs.versionDialog.posting = true;
      this.$refs.addVersionForm.$refs.upload.submit();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>