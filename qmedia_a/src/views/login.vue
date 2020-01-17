<template>
  <div class="login-vue">
    <div class="loginNav">
      <div class="loginmain">
        <div class="main_left">
          <img
            src="../img/login_text.png"
            alt
            width="230px"
            height="150px"
            style="position: relative;top: 25%;"
          />
        </div>
        <div class="main_right">
          <div class="main_right_top">
            <img src="../img/login_logo.png" alt style="width: 90%;margin-top: 35px;" />
            <login-form></login-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from "../components/form/loginForm";
export default {
  components: {
    loginForm
  }
};
</script>

<style scoped>
.login-vue {
  height: 100%;
  width: 100%;
  min-width: 1366px;
  background: url("../img/login_bg.png") no-repeat;
  background-size: 100% 100%;
}
.login-vue .loginNav {
  margin: 0 auto;
  width: 60%;
}
.login-vue .loginmain {
  width: 800px;
  height: 450px;
  text-align: center;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  float: right;
  box-shadow: none;
}
.login-vue .loginmain .main_left {
  width: 60%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  float: left;
  border-radius: 10px 0px 0px 10px;
}
.login-vue .loginmain .main_right {
  width: 40%;
  height: 100%;
  background-color: white;
  float: left;
  border-radius: 0px 10px 10px 0px;
}
.login-vue .loginmain .main_right .main_right_top {
  width: 100%;
  height: 30%;
}
.login-vue .loginmain .main_right .main_right_bottom {
  width: 100%;
  height: 70%;
  padding-top: 20px;
  box-sizing: border-box;
}
.login-vue .ivu-input {
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
/* .login-vue .error {
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
} */
</style>