<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="图片格式">
        <el-input type="textarea" v-model="form.imageFormat"></el-input>
        <span class="el-upload__tip" style="display:block">小写字母，多个格式用,分隔</span>
      </el-form-item>
      <el-form-item label="视频格式">
        <el-input type="textarea" v-model="form.videoFormat"></el-input>
        <span class="el-upload__tip" style="display:block">小写字母，多个格式用,分隔</span>
      </el-form-item>
      <el-form-item label="分辨率">
        <el-input type="textarea" v-model="form.resolutions"></el-input>
        <span class="el-upload__tip" style="display:block">小写字母，多个格式用,分隔</span>
      </el-form-item>
      <el-form-item v-if="perms('111')">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSystemConfig, patchSystemConfig } from "../../api/system";
export default {
  data() {
    return {
      form: {
        imageFormat: "",
        videoFormat: "",
        resolutions: ""
      }
    };
  },
  methods: {
    getData() {
      getSystemConfig().then(res => {
        this.id = res.id;
        for (let i = 0; i < res.imageFormat.length; i++) {
          this.form.imageFormat += res.imageFormat[i] + ",";
        }
        for (let i = 0; i < res.videoFormat.length; i++) {
          this.form.videoFormat += res.videoFormat[i] + ",";
        }
        for (let i = 0; i < res.resolutions.length; i++) {
          this.form.resolutions += res.resolutions[i] + ",";
        }
      });
    },
    onSubmit() {
      let params = {
        id: this.id,
        videoFormat: this.form.videoFormat.split(","),
        imageFormat: this.form.imageFormat.split(","),
        resolutions: this.form.resolutions.split(",")
      };
      patchSystemConfig(params).then(() => {
        this.toast("保存成功", "success");
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style  scoped>
.form {
  width: 50%;
  margin: auto;
}
.form .el-form-item {
  width: 100%;
}
</style>