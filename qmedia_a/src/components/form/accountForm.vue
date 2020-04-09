<template>
  <div>
    <el-form
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      ref="ruleForm"
      :rules="rules"
      size="mini"
    >
      <el-form-item label="账户类型" prop="type">
        <el-select v-if="title==1" v-model="ruleForm.type">
          <el-option v-for="item in types" :key="item.val" :label="item.name" :value="item.val"></el-option>
        </el-select>
        <span
          v-else
        >{{ruleForm.type==0?'B端账户':ruleForm.type==1?'A端账户':ruleForm.type==2?'CCTV账户':'广告主账户'}}</span>
      </el-form-item>
      <el-form-item label="企业代码" prop="ck" v-if="ruleForm.type == 0||ruleForm.type == 3">
        <el-input
          v-if="title==1"
          v-model.trim="ruleForm.ck"
          @blur="blurOrz"
          clearable
          placeholder="请输入企业代码"
        ></el-input>
        <span v-else>{{ruleForm.ck}}</span>
      </el-form-item>
      <el-form-item label="登录账户" prop="name">
        <el-input v-model="ruleForm.name" clearable placeholder="请输入登录账户"></el-input>
      </el-form-item>
      <el-form-item label="账户名称" prop="account">
        <el-input v-model="ruleForm.account" clearable placeholder="请输入账户名称"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password" v-if="title == 1">
        <el-input v-model="ruleForm.password" clearable placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="账户角色" prop="role" v-if="ruleForm.type!=3">
        <el-select
          v-model="ruleForm.role"
          placeholder="请选择"
          @click.native="getRole"
          @change="roleChange"
          value-key="id"
        >
          <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织机构" prop="orz" v-if="ruleForm.type == 0&&isOrz">
        <tree-select
          v-model="ruleForm.organizationId"
          :options="treeData"
          placeholder="组织机构"
          :normalizer="normalizer"
          :default-expand-level="5"
        ></tree-select>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone" clearable placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" clearable placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <template v-if="ruleForm.type !=1">
        <!--   v-if="title=='编辑账户'?(ruleForm.type != 0&&ruleForm.type !=3?true:false):ruleForm.type !=3" -->
        <el-form-item label="提醒业务" prop="warn" v-if="ruleForm.type !=3">
          <el-checkbox v-model="ruleForm.warn" :label="ruleForm.type == 0?'发送开通账户短信':'发送审核通知邮件'"></el-checkbox>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="邮件提醒业务" prop="noticeType">
          <el-checkbox-group v-model="ruleForm.noticeType">
            <el-checkbox label="0" name="type">内容审核</el-checkbox>
            <el-checkbox label="1" name="type">合同审核</el-checkbox>
            <el-checkbox label="2" name="type">订单审核</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>
      <el-form-item v-if="ruleForm.type != 2" label="合同权限" prop="signContract">
        <el-checkbox
          v-if="ruleForm.type !=3"
          v-model="ruleForm.signContract"
          :label="ruleForm.type == 1?'签署合同':'发起合同'"
        ></el-checkbox>
        <template v-else>
          <el-radio v-model="ruleForm.signContract1" label="1">签署合同</el-radio>
          <el-radio v-model="ruleForm.signContract1" label="2">发起合同</el-radio>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formMinxin from "./minxins/formMinxin.js";
import treeSelect from "@riophae/vue-treeselect";
import { getRoleList, getOrgList, getListTree } from "@/api/role";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  mixins: [formMinxin],
  components: { treeSelect },
  props: {
    editData: {
      type: Object,
      default: {}
    },
    title: Number
  },
  data() {
    let validatorPhone = (rule, value, callback) => {
      let rex = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
      if (value == "") {
        callback(new Error("请输入联系人手机号"));
      } else if (!rex.test(value)) {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        type: 1,
        name: "",
        ck: "",
        account: "",
        password: "",
        role: "",
        phone: "",
        email: "",
        noticeType: [],
        signContract: "",
        signContract1: "1",
        organizationId:""
      },
      rules: {
        type: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "请输入2-10位数字、字母、汉字",
            trigger: "blur"
          },
          { validator: this.validatorName }
        ],
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "请输入3-16位数字、字母、汉字",
            trigger: "blur"
          },
          { validator: this.validatorAccount }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位数字、字母组合",
            trigger: "blur"
          },
          { validator: this.validatorPass }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: this.validatorPhone }
        ],
        role: [
          { required: true, message: "请选择账号角色", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位数字、字母组合",
            trigger: "blur"
          },
          { validator: this.validatorPass }
        ],
        ck: [{ required: true, message: "请输入企业代码", trigger: "blur" }]
      },
      types: [
        { val: 1, name: "A端账户" },
        { val: 0, name: "B端账户" },
        { val: 2, name: "CCTV账户" },
        { val: 3, name: "广告主账户" }
      ],
      roles: [],
      treeData: [],
      isOrz: true
    };
  },
  methods: {
    getRole() {
      let params = {
        type: this.ruleForm.type,
        ck: this.ruleForm.ck
      };
      getRoleList(params).then(res => {
        this.roles = res;
        if (this.title == 2) {
        }
      });
    },
    roleChange(val) {
      this.ruleForm.roleId = val.id;
      if (val.category == 2) {
        this.isOrz = true;
      } else {
        this.isOrz = false;
      }
    },
    blurOrz() {
      if (this.ruleForm.type == 0 && this.ruleForm.ck != "") {
        let params = {
          ck: this.ruleForm.ck
        };
        getListTree(params).then(res => {
          this.treeData = res;
        });
      }
    },
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    edit() {
      let row = this.editData;

      this.ruleForm.noticeType = [];

      if (row.type == 1) {
        // if (row.checkNotice == 1) {
        //   this.ruleForm.noticeType.push("0");
        // }
        // if (row.contractCheckNotice == 1) {
        //   this.ruleForm.noticeType.push("1");
        // }
        // if (row.orderCheckNotice == 1) {
        //   this.ruleForm.noticeType.push("2");
        // }
      } else if (row.type == 0) {
        if (this.editData.role.category == 2) {
          this.isOrz = true;
        } else {
          this.isOrz = false;
        }
      }
      if (this.ruleForm.type != 3) {
        if (this.title == 2) {
          this.ruleForm.role = row.role.name;
        } else {
          this.ruleForm.role = "";
        }
      }
      if (row.type == 1) {
        this.ruleForm.signContract = row.signContract == 1 ? true : false;
      }
    }
  },
  watch: {
    editData(val) {
      this.ruleForm = val;
      this.edit();
    }
  },
  mounted() {
    if (this.title == 2) {
      this.ruleForm = this.editData;
      this.edit();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>