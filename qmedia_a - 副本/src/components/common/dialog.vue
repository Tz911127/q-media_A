<template>
  <el-dialog
    :modal-append-to-body="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    custom-class="vb-dialog"
    :width="width"
    :title="title"
    :visible.sync="dialogVisible"
    :posting="posting"
    @close="closed"
    @open="open"
    :before-close="beforeClose"
  >
    <slot></slot>
    <div v-if="showFooter" slot="footer" class="dialog-footer">
      <el-button class="btn-custom-cancel el-button--black" @click="close">{{cancelBtnTxt}}</el-button>
      <el-button
        class="el-button--success"
        @click="handleClose"
        type="primary"
        :loading="posting"
      >{{posting?confirmPostingTxt:confirmBtnTxt}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showFooter: {
      type: Boolean,
      default: true
    },
    confirmBtnTxt: {
      type: String,
      default: "确定"
    },
    cancelBtnTxt: {
      type: String,
      default: "取消"
    },
    confirmPostingTxt: {
      type: String,
      default: "执行中..."
    },
    title: {
      type: String,
      default: "标题"
    },
    width: {
      type: String,
      default: "540px"
    },
    isBody: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      posting: false
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    closed() {
      this.posting = false;
      this.$emit("closed");
      // this.$store.state.material.detailData = {};
      this.$store.commit("CLEAR_PROGRAM_CONTENT");
    },
    open() {
      // this.dialogVisible = true;
      this.$emit("open");
    },
    close() {
      if (this.isBody) {
        this.$emit("close");
      } else {
        this.dialogVisible = false;
      }
    },
    beforeClose() {
      this.$emit("beforeClose");
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="less">
</style>