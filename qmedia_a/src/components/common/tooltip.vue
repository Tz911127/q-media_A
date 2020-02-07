<template>
  <section style="display:inline-block ;margin-right:15px">
    <el-tooltip class="item" effect="dark" :disabled="!disabled" content="请选择终端" placement="bottom">
      <span>
        <el-button slot="reference" :type="type" @click="onSubmit" :disabled="disabled">{{content}}</el-button>
      </span>
    </el-tooltip>
  </section>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: () => {}
    },
    content: {
      type: String,
      default: () => {}
    },
    type: {
      type: String,
      default: () => {}
    },
    onSubmit: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {};
  },
  methods: {}
};
</script>

