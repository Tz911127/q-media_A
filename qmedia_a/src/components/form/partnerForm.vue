<template>
  <div>
    <el-form
      :rules="rulesForm"
      :model="baseForm"
      class="demo-form-inline"
      size="mini"
      ref="baseForm"
      label-position="top"
      :inline="true"
    >
      <el-form-item label="企业代码" prop="key">
        <template v-if="!isEdit">
          <el-input v-model.trim="baseForm.key" placeholder="企业代码" clearable></el-input>
          <br />
          <span style="color:rgba(130, 141, 177, 1);font-size:12px">温馨提示：企业代码填写后不能修改</span>
        </template>
        <span v-else>{{editRow.key}}</span>
      </el-form-item>
      <el-form-item label="企业简称" prop="name">
        <el-input v-model.trim="baseForm.name" placeholder="企业简称" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model.trim="baseForm.contact" placeholder="联系人" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model.trim="baseForm.phone" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <template v-if="value==0">
        <el-form-item label="抽成比例" prop="percent">
          <el-col :span="22">
            <el-input v-model.number="baseForm.percent" placeholder="填写范围0-100之间的整数" clearable></el-input>
          </el-col>
          <el-col :span="2" style="text-align:center">
            <span>%</span>
          </el-col>
        </el-form-item>
        <el-form-item label="合同日期" prop="dateValue">
          <el-date-picker
            v-model="baseForm.dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:100%"
            format="yyyy 年 MM 月 dd 日"
            @input="datetimeChange"
            value-format="yyyyMMdd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="baseForm.email" placeholder="邮箱" clearable></el-input>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import formMinxin from "./minxins/formMinxin";
export default {
  mixins: [formMinxin],
  props: {
    value: Number,
    isEdit: Boolean,
    editRow: {
      type: Object,
      default: {}
    }
  },
  data() {
    let validatorEmail = (rule, value, callback) => {
      let rex = this.regAccount.rexEmail;
      if (value == "") {
        callback(new Error("请输入联系人邮箱"));
      } else if (!rex.test(value)) {
        callback(new Error("请输入正确格式邮箱"));
      } else {
        callback();
      }
    };
    return {
      baseForm: {
        key: "",
        name: "",
        contact: "",
        phone: "",
        percent: "",
        dateValue: "",
        email: ""
      },
      rulesForm: {
        key: [
          { required: true, message: "请输入企业代码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "请输入3-16位小写字母",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入企业简称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "请输入2-20位字母、数字、汉字",
            trigger: "blur"
          }
        ],
        contact: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "请输入1-20位字母、数字、汉字",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入联系人手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        percent: [
          {
            type: "number",
            required: true,
            message: "输入0-100的整数",
            trigger: "blur"
          }
        ],
        dateValue: [
          {
            required: true,
            message: "请选择合同日期",
            trigger: "change"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: validatorEmail
          }
        ]
      }
    };
  },
  methods: {
    edit() {
      this.baseForm = Object.assign({}, this.editRow);
      this.baseForm.dateValue = [
        String(this.editRow.contractStart),
        String(this.editRow.contractEnd)
      ];
    },
    datetimeChange(e) {
      let _this = this;
      _this.baseForm.dateValue = e;
      _this.$forceUpdate();
    }
  },
  mounted() {
    if (this.isEdit) {
      this.edit();
    }
  }
};
</script>

<style  scoped>
.demo-form-inline .el-form-item {
  width: 30%;
}
</style>