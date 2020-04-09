<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demoRuleForm"
      size="mini"
    >
      <el-form-item label="标题" prop="tit">
        <el-input placeholder="请输入" v-model="ruleForm.tit"></el-input>
      </el-form-item>
      <el-form-item label="通知内容" prop="content">
        <el-input
          type="textarea"
          v-model="ruleForm.content"
          @blur="blur"
          placeholder="请输入（限制2-100个汉字长度）"
        ></el-input>
      </el-form-item>
      <el-form-item label="播放日期" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyyMMdd"
          :picker-options="startDateOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="播放时间" prop="time">
        <el-time-picker
          is-range
          v-model="ruleForm.time"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm"
          value-format="HH:mm"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formMinxin from "./minxins/formMinxin.js";
import wordData from "../../libs/sensitiveWord";
export default {
  mixins: [formMinxin],
  data() {
    return {
      ruleForm: {
        date: "",
        time: "",
        tit: "",
        content: ""
      },
      rules: {
        tit: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { validator: this.validatorTit }
        ],
        content: [
          { required: true, message: "请输入通知内容", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "请输入2-100位数字、字母、汉字",
            trigger: "blur"
          },
          { validator: this.validatorNav }
        ],
        date: [
          {
            required: true,
            message: "请选择播放日期",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            message: "请选择播放时间",
            trigger: "change"
          }
        ]
      },
      startDateOptions: {
        disabledDate: time => {
          return (
            time.getTime() < Date.now(this.endDate) - 8.64e7 ||
            time.getTime() < new Date(this.endDate).getTime()
          );
        }
      }
    };
  },
  methods: {
    blur() {
      let text = this.ruleForm.content;
      console.log(text);
      let word = this.getFirstSensitiveWord(text.replace(/\s+/g, ""));
      if (word) {
        this.$message.error("含有敏感词汇，请重新输入！");
        return;
      }
    },
    getFirstSensitiveWord(text) {
      var word = null;
      let data = wordData.data;
      for (var i = 0, len = data.length; i < len; i++) {
        if (text.indexOf(data[i]) !== -1) {
          word = data[i];
          break;
        }
      }
      return word;
    }
  }
};
</script>

<style scoped>
</style>