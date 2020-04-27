<template>
  <div>
    <div class="main_right_bottom">
      <div class="input-c">
        <el-input
          prefix-icon="el-icon-user-solid"
          v-model.trim="ruleForm.account"
          placeholder="用户名"
          clearable
          @keyup.enter.native="submit"
        ></el-input>
        <!-- <p class="error">{{accountError}}</p> -->
      </div>
      <div class="input-c">
        <el-input
          prefix-icon="el-icon-lock"
          type="password"
          v-model.trim="ruleForm.pwd"
          placeholder="密码"
          clearable
          @keyup.enter.native="submit"
        ></el-input>
        <!-- <p class="error">{{pwdError}}</p> -->
      </div>
      <p class="account">
        <span style="float:left;margin-left:35px">
          <el-checkbox v-model="checked" @change="change">记住账户</el-checkbox>
        </span>
      </p>
      <el-button
        :loading="isShowLoading"
        class="submit"
        type="warning"
        @click="submit"
        @keyup.enter="submit"
      >登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      ruleForm: { account: "", pwd: "" },
      accountError: "",
      pwdError: "",
      checked: true,
      isShowLoading: false
    };
  },
  created() {
    let user_cookie = this.getCookie("user_cookie")
      ? this.getCookie("user_cookie").toString()
      : "";
    if (user_cookie) {
      this.ruleForm.account = JSON.parse(Base64.decode(user_cookie)).account;
      this.ruleForm.pwd = JSON.parse(Base64.decode(user_cookie)).pwd;
    }
  },
  methods: {
    ...mapActions(["handleLogin", "getRegion"]),
    submit() {
      if (!this.ruleForm.account) {
        this.$message({
          type: "error",
          message: "账号不能为空"
        });
        return;
      }
      if (!this.ruleForm.pwd) {
        this.$message({
          type: "error",
          message: "密码不能为空"
        });
        return;
      }
      let params = {
        account: this.ruleForm.account,
        password: this.md5(this.ruleForm.pwd)
      };
      this.handleLogin(params).then(() => {
        if (this.checked) {
          this.setCookie(
            "user_cookie",
            Base64.encode(JSON.stringify(this.ruleForm)),
            30
          );
        } else {
          this.setCookie("user_cookie", "");
        }
        this.getRegion().then(() => {});
        this.$router.replace({ name: "homePage" });
      });
    },
    change() {}
  }
};
</script>

<style  scoped>
.login-vue .loginmain .main_right .main_right_bottom {
  width: 100%;
  height: 70%;
  padding-top: 20px;
  box-sizing: border-box;
}
.ivu-input {
  background-color: transparent;
  color: #fff;
  outline: #fff;
  border-color: #fff;
}
.login-vue ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue .title {
  font-size: 16px;
  margin-bottom: 20px;
}
.login-vue .input-c {
  margin: 10px auto 0px;
  width: 250px;
  height: 50px;
}
.login-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.login-vue .submit {
  width: 250px;
  margin-top: 20px;
}
.login-vue .account span {
  cursor: pointer;
  font-size: 12px;
}
.login-vue .ivu-icon {
  color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
  color: #777;
}
.login-vue .el-input__inner {
  background: #f4f4f4;
}
.login-vue input::-webkit-input-placeholder {
  color: #c0c4cc;
}
input::-moz-input-placeholder {
  color: #c0c4cc;
}
input::-ms-input-placeholder {
  color: #c0c4cc;
}
</style>