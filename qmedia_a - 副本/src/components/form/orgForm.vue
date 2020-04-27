<template>
  <div>
    <el-form label-width="120px" :model="orgForm" ref="ruleForm" :rules="orgRules">
      <el-form-item label="组织机构名称" prop="name">
        <el-input v-model.trim="orgForm.name" maxlength="10" placeholder="请输入1-10位组织机构名称" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    treeData: Object
  },
  data() {
    return {
      orgForm: {
        name: ""
      },
      orgRules: {
        name: [
          {
            required: true,
            message: "请输入1-10位组织机构名称",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>