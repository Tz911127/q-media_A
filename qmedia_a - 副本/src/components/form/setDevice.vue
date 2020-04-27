<template>
  <div>
    <el-form label-width="130px" :model="deviceForm" ref="ruleForm" :rules="deviceRules">
      <el-form-item label="版本名称" prop="mainName">
        <el-input placeholder="请输入主程序版本名称" maxlength="20" v-model.trim="deviceForm.mainName" clearable></el-input>
      </el-form-item>
      <el-form-item label="选择主程序版本">
        <el-button
          type="success"
          size="mini"
          @click="chooseDevice"
        >{{versionName?versionName:'请选择'}}</el-button>
      </el-form-item>
    </el-form>
    <v-dialog ref="addDevice" :title="`选择主程序版本`" :showFooter="false" :width="`50%`">
      <version-choose-table @chooseDeviceRow="chooseDeviceRow" :type="0"></version-choose-table>
    </v-dialog>
  </div>
</template>

<script>
import formMinxin from "./minxins/formMinxin";
import versionChooseTable from "../table/versionChooseTable";
export default {
  mixins: [formMinxin],
  components: { versionChooseTable },
  data() {
    return {
      deviceForm: {
        mainName: "",
        mainId: ""
      },
      deviceRules: {
        mainName: [
          {
            required: true,
            message: "请输入0-20位主程序名称",
            trigger: "blur"
          }
        ]
      },
      versionName: ""
    };
  },
  methods: {
    chooseDevice() {
      this.$refs.addDevice.dialogVisible = true;
    },
    chooseDeviceRow(row) {
      this.versionName = row.versionName;
      this.deviceForm.mainId = row.id;
      this.$refs.addDevice.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>