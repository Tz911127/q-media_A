<template>
  <div>
    <div class="logo">
      <img src="../../img/logo.png" alt />
    </div>
    <i @click="together" class="el-icon-s-fold i"></i>

    <el-popover
      placement="bottom"
      width="150"
      trigger="hover"
      style="float:right;line-height:60px;margin-right:10px;"
    >
      <el-button
        type="text"
        style="width:100%"
        size="mini"
        @click="$refs.updatePassFormDialog.dialogVisible = true"
      >修改密码</el-button>
      <el-button type="text" style="width:100%" size="mini" @click="loginOut">退出</el-button>
      <el-button slot="reference" style="border:none">
        {{userInfo.account}}
        <span class="el-icon-caret-bottom"></span>
      </el-button>
    </el-popover>
    <v-dialog ref="updatePassFormDialog" :title="'修改密码'" @handleClose="updatePass">
      <update-pass-form ref="updatePassForm"></update-pass-form>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import updatePassForm from "../form/updatePassForm";
export default {
  components: { updatePassForm },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["handleLogout", "updatePwd", "isOpen"]),
    together() {
      this.$emit("together");
    },
    loginOut() {
      let that = this;
      this.confirm(`确定退出登录?`, "退出", {
        request: () => {
          return this.handleLogout();
        },
        success() {
          that.$router.push({
            name: "login"
          });
        }
      });
    },
    updatePass() {
      this.$refs.updatePassForm.validate(data => {
        let postData = {
          password: this.md5(data.password),
          newPassword: this.md5(data.newPassword)
        };
        this.$refs.updatePassFormDialog.posting = true;
        this.updatePwd(postData)
          .then(() => {
            this.toast("修改成功", "success");
            this.$router.push({ name: "login" });
          })
          .catch(() => {
            this.$refs.updatePassFormDialog.posting = false;
          });
      });
    }
  }
};
</script>
<style >
.i {
  font-size: 20px;
  cursor: pointer;
  line-height: 60px !important;
  vertical-align: top !important;
  margin-left: 20px;
}
.logo {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  width: 200px;
}
.upload {
  float: right;
}
</style>