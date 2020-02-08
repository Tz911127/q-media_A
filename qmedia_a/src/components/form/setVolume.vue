<template>
  <div>
    <el-form
      label-position="right"
      label-width="100px"
      :model="timeForm"
      ref="ruleForm"
      :rules="rules"
      @submit.native.prevent
    >
      <el-form-item label="音量设置" prop="voice">
        <el-col :span="20">
          <el-input placeholder="输入0-100的整数" v-model.number="timeForm.voice" clearable></el-input>
        </el-col>
        <el-col :span="4" style="text-align:center ">
          <i
            class="el-icon-circle-plus-outline"
            style="font-size:20px;vertical-align:middle"
            @click="addDomain"
          ></i>
        </el-col>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in timeForm.domains"
        :label="'时间'"
        :key="domain.index"
        :prop="'domains.' + index + '.time'"
        :rules="{
                required: true, message: '时间，音量不能为空', trigger: 'change'
                }"
      >
        <el-col :span="20">
          <el-time-picker
            is-range
            v-model="domain.time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm"
            format="HH:mm"
            style="width:100%"
          ></el-time-picker>
        </el-col>
        <el-col :span="4" style="text-align:center ">
          <i
            class="el-icon-circle-close"
            style="font-size:20px;vertical-align:middle"
            @click="removeDomain(domain)"
          ></i>
        </el-col>
        <el-col :span="20" style="margin-top:5px">
          <el-input v-model="domain.voice" placeholder="输入0-100的整数"></el-input>
        </el-col>
        <el-col :span="4" class="volice">音量</el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import setTimes from "./setTimes";
import formMinxin from "./minxins/formMinxin";
export default {
  mixins: [formMinxin],
  components: { setTimes },
  data() {
    let validatorVolice = (rule, value, callback) => {
      if (value > 100 || value < 0) {
        callback(new Error("请输入0-100整数"));
      } else {
        callback();
      }
    };
    return {
      timeForm: {
        voice: "",
        domains: []
      },
      rules: {
        voice: [
          {
            type: "number",
            required: true,
            message: "输入0-100的整数",
            trigger: "blur"
          },
          { validator: validatorVolice }
        ]
      }
    };
  },
  methods: {
    addDomain() {
      if (this.timeForm.domains.length < 2) {
        this.timeForm.domains.push({
          //   value: "",
          key: Date.now()
        });
      }
    },
    removeDomain(item) {
      var index = this.timeForm.domains.indexOf(item);
      if (index !== -1) {
        this.timeForm.domains.splice(index, 1);
      }
    },
    startTime(e) {
      console.log(e);
    },
    endTime(e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
.volice {
  position: absolute;
  left: -50px;
  top: 45px;
}
.volice::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>