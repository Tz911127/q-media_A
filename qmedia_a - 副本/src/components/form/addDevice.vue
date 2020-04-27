<template>
  <div>
    <el-form label-width="100px" :model="deviceForm" ref="ruleForm" :rules="deviceRules">
      <el-form-item label="公司名称" prop="coFullName">
        <el-input placeholder="请输入公司名称" maxlength="20" v-model.trim="deviceForm.coFullName"></el-input>
      </el-form-item>
      <el-form-item label="公司简称" prop="coSimpleName">
        <el-input placeholder="请输入公司简称" maxlength="20" v-model.trim="deviceForm.coSimpleName"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="deviceType">
        <el-input placeholder="请输入设备型号" maxlength="20" v-model.trim="deviceForm.deviceType"></el-input>
      </el-form-item>
      <el-form-item label="版本名称" prop="adapterName">
        <el-input placeholder="请输入适配文件名称" maxlength="20" v-model.trim="deviceForm.adapterName"></el-input>
      </el-form-item>
      <el-form-item label="选择适配程序">
        <el-button
          type="success"
          size="mini"
          @click="chooseDevice"
        >{{versionName?versionName:'请选择'}}</el-button>
      </el-form-item>
    </el-form>
    <v-dialog ref="addDevice" :title="`选择适配程序版本`" :showFooter="false" :width="`50%`">
      <version-choose-table @chooseDeviceRow="chooseDeviceRow"></version-choose-table>
    </v-dialog>
  </div>
</template>

<script>
import versionChooseTable from "../table/versionChooseTable";
import formMinxin from "./minxins/formMinxin";
export default {
  components: { versionChooseTable },
  mixins: [formMinxin],
  data() {
    return {
      versionName: "",
      deviceForm: {
        coFullName: "",
        coSimpleName: "",
        deviceType: "",
        adapterName: "",
        adapterVersion: ""
      },
      deviceRules: {
        adapterName: [
          {
            required: true,
            message: "请输入0-20位适配文件名称",
            trigger: "blur"
          }
        ],
        deviceType: [
          { required: true, message: "请输入0-20位设备型号", trigger: "blur" }
        ],
        coFullName: [
          { required: true, message: "请输入0-20位公司名称", trigger: "blur" }
        ],
        coSimpleName: [
          {
            required: true,
            message: "请输入0-20位公司简称",
            trigger: "blur"
          }
        ]
      },
      tableParams: {
        limit: 10,
        page: 0
      }
    };
  },
  methods: {
    chooseDevice() {
      this.$refs.addDevice.dialogVisible = true;
    },
    chooseDeviceRow(row) {
      this.versionName = row.versionName;
      this.deviceForm.adapterVersion = row.id;
      this.$refs.addDevice.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>