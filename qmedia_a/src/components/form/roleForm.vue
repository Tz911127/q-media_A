<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
      :rules="rules"
    >
      <el-form-item label="账户类型" prop="type" v-if="title==1">
        <el-select v-model="ruleForm.type" @change="getRoleData">
          <el-option v-for="item in types" :key="item.val" :label="item.name" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业代码" prop="ck" v-if="ruleForm.type == '0'&&title==1">
        <el-input v-model="ruleForm.ck" clearable @blur="blurRole"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="2-20位字母、数字、汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色说明" prop="remark">
        <el-input v-model="ruleForm.remark" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item class="auth" label="选择权限" prop="functionIds">
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          ref="tree"
          :props="defaultProps"
          style="height: 150px;overflow:auto"
          @check-change="handleCheckChange"
          v-model="ruleForm.functionIds"
          :default-checked-keys="ruleForm.functionIds"
        ></el-tree>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRolePerm } from "@/api/role";
import formMinxin from "./minxins/formMinxin.js";
export default {
  mixins: [formMinxin],
  props: {
    propTree: {
      type: Array,
      default: []
    },
    editData: {
      type: Object,
      default: {}
    },
    title: {
      type: Number,
      default: 0
    }
  },
  data() {
    let validatorAccount = (rule, value, callback) => {
      let rex = this.regRole.roleReg;
      if (value == "") {
        callback(new Error("请输入标题"));
      } else if (!rex.test(value)) {
        callback(new Error("请输入2-20位数字、字母、汉字"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        type: 1,
        ck: "",
        name: "",
        remark: "",
        functionIds: []
      },
      rules: {
        type: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { validator: validatorAccount }
        ],
        ck: [{ required: true, message: "请输入企业代码", trigger: "blur" }]
      },
      types: [
        { val: 1, name: "A端账户" },
        { val: 0, name: "B端账户" },
        { val: 2, name: "CCTV账户" }
      ],
      treeData: this.propTree || [],
      defaultProps: { children: "children", label: "name" },
      treeChecked: false
    };
  },
  methods: {
    getRoleData(val) {
      this.ruleForm.type = val;
      let params = {
        type: val
      };
      if (val != 0) {
        getRolePerm(params).then(res => {
          this.treeData = res;
        });
      } else {
        this.treeData = [];
      }
    },
    blurRole() {
      let params = {
        type: 0,
        ck: this.ruleForm.ck
      };
      getRolePerm(params).then(res => {
        this.treeData = res;
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      this.treeChecked = checked;
    }
    // 编辑
  },
  watch: {
    propTree(val) {
      this.treeData = val;
    },
    editData(val) {
      this.ruleForm = val;
    }
  },

  mounted() {
    if (this.title == 2) {
      this.ruleForm = this.editData;
    }
  }
};
</script>

<style  scoped>
.auth .el-form-item::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>