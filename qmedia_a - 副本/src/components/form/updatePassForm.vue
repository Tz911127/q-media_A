<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
    <el-form-item label="旧密码" prop="password">
      <el-input
        type="password"
        @keyup.enter.native="keyUpSubmit"
        v-model="ruleForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="newPassword">
      <el-input
        type="password"
        @keyup.enter.native="keyUpSubmit"
        v-model="ruleForm.newPassword"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="reNewPassword">
      <el-input
        type="password"
        @keyup.enter.native="keyUpSubmit"
        v-model="ruleForm.reNewPassword"
        autocomplete="off"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import formMinxin from "./minxins/formMinxin.js";

export default {
  mixins: [formMinxin],
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!this.regexSets.passReg.test(value)) {
        callback(new Error("密码格式不正确"));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        newPassword: "",
        reNewPassword: ""
      },
      rules: {
        password: [{ required: true, message: `请输入密码`, trigger: "blur" }],
        newPassword: [
          { required: true, message: `请输入新密码`, trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        reNewPassword: [
          { required: true, message: `请再次输入密码`, trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {}
};
</script>