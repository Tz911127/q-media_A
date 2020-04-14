<template>
  <div>
    <basic-table
      :loading="loading"
      :columns="columns"
      :props-data="tableData"
      :muti="false"
      :showFooter="false"
      ref="uploadTable"
    >
      <template slot="tableHeader">
        <div style="margin: 15px 0;">
          <el-button type="success" @click="addDevice" v-if="perms('141')">
            <i class="el-icon-plus"></i> 添加适配程序
          </el-button>
          <el-button type="success" @click="setDevice" v-if="perms('143')">
            <i class="el-icon-plus"></i> 设置主程序
          </el-button>
        </div>
      </template>
    </basic-table>
    <v-dialog ref="uploadDevice" :title="title ==0?'添加适配程序版本':'选择主程序版本'" @handleClose="handleClose">
      <add-device v-if="title==0" ref="addDevice"></add-device>
      <set-device v-else ref="addDevice"></set-device>
    </v-dialog>
  </div>
</template>

<script>
import basicTable from "./components/basicTable";
import addDevice from "../form/addDevice";
import setDevice from "../form/setDevice";
import Sortable from "sortablejs";
import { sortDevice, postDevice, delDevice, setDeviceSys } from "@/api/system";
export default {
  components: {
    basicTable,
    addDevice,
    setDevice
  },
  data() {
    return {
      loading: false,
      tableData: [],
      columns: [
        { label: "公司名称", prop: "coFullName" },
        { label: "公司简称", prop: "coSimpleName" },
        { label: "设备类型", prop: "deviceType" },
        {
          label: "版本名称",
          render(h, row) {
            return <span>{row.adapter.versionName}</span>;
          }
        },
        { label: "适配文件名称", prop: "adapterName" },
        {
          label: "操作",
          render: (h, row) => {
            let operateList = [
              {
                isShow: this.perms('142'),
                title: "删除",
                icon: "el-icon-delete",
                method: () => this.deleteDevice(row)
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
      sortable: null,
      oldList: [],
      newList: [],
      title: 0
    };
  },
  methods: {
    getData() {
      this.oldList = this.tableData.map(v => v.id);
      this.newList = this.oldList.slice();
      this.$nextTick(() => {
        this.setSort();
      });
    },
    addDevice() {
      this.$refs.uploadDevice.dialogVisible = true;
      this.title = 0;
    },
    setDevice() {
      this.$refs.uploadDevice.dialogVisible = true;
      this.title = 1;
    },
    deleteDevice(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          delDevice(row).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.tableData = res;
            this.setUserInfo(res);
          });
        })
        .catch(() => {});
    },
    handleClose() {
      this.$refs.addDevice.validate(data => {
        if (this.title == 0) {
          if (data.adapterVersion == "") {
            this.toast("请选择适配程序", "error");
            return;
          }
          let params = data;
          postDevice(params).then(res => {
            this.$refs.uploadDevice.dialogVisible = false;
            this.toast("添加成功", "success");
            this.tableData = res;
            this.setUserInfo(res);
          });
        } else {
          if (data.adapterVersion == "") {
            this.toast("请选择主程序版本", "error");
            return;
          }
          let configId = this.userInfo.sysConfig.id;
          let params = {
            configId: configId,
            mainId: data.mainId,
            mainName: data.mainName
          };
          setDeviceSys(params).then(res => {
            this.$refs.uploadDevice.dialogVisible = false;
            this.toast("设置成功", "success");
            this.setUserInfo(res);
          });
        }
      });
    },
    setSort() {
      const el = document.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "123");
        },
        onEnd: evt => {
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
          let params = this.newList;
          sortDevice(params).then(res => {
            this.setUserInfo(res);
          });
        }
      });
    },
    setUserInfo(res) {
      let userInfo = localStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      userInfo.companyAdapters = res;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  },
  mounted() {
    this.tableData = JSON.parse(
      localStorage.getItem("userInfo")
    ).companyAdapters;
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
</style>