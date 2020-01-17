<template>
  <div>
    <el-form :model="addVersionForm" label-width="130px">
      <el-form-item label="上传文件">
        <el-upload
          class="upload-demo"
          ref="upload"
          action
          :on-change="handChange"
          :before-remove="beforeRemove"
          :http-request="uploadFile"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button size="mini" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="终端文件版本号">{{addVersionForm.versionName}}</el-form-item>
      <el-form-item label="功能说明">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addVersionForm.remark"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVersionOss, upload } from "../../api/system";
export default {
  data() {
    return {
      fileList: [],
      addVersionForm: {
        versionName: "",
        remark: ""
      }
    };
  },
  methods: {
    handChange(file, fileList) {
      this.addVersionForm.versionName = file.name;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    uploadFile(e) {
      let upgradeInfo = this.addVersionForm.remark;
      let params = {
        name: e.file.name
      };

      getVersionOss(params).then(res => {
        let originName = e.file.name;
        res["x:data"] = res["x:data"]
          .replace("${groupId}", "0")
          .replace("${originName}", originName)
          .replace("${upgradeInfo}", upgradeInfo);
        res.file = e.file;
        upload({ url: res.host }, res)
          .then(res => {
            this.$parent.$parent.posting = false;
            this.$parent.$parent.dialogVisible = false;
          })
          .catch(() => {
            this.$parent.$parent.posting = false;
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>