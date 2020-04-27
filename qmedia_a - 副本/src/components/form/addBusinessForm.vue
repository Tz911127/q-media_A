<template>
  <div>
    <el-form :inline="true" size="mini" class="demo-form-inline">
      <el-form-item>
        <span>基本信息</span>
      </el-form-item>
      <br />
      <el-form-item label="企业类型">
        <el-select v-model="value" @change="changeType" v-if="!isEdit">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div v-else>{{editRow.type==0?'合伙人':'广告主'}}</div>
      </el-form-item>

      <template>
        <div>
          <partner-form ref="partnerForm" :value="value" :isEdit="isEdit" :editRow="editRow"></partner-form>
        </div>
      </template>
      <template v-if="value==0">
        <el-form-item>
          <span>权限配置</span>
        </el-form-item>
        <div>
          <power-form ref="powerForm" :isEdit="isEdit" :editRow="editRow"></power-form>
        </div>
      </template>
    </el-form>

    <div style="width:100%;text-align:center">
      <el-button type="success" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">取消</el-button>
    </div>
  </div>
</template>

<script>
import partnerForm from "./partnerForm";
import powerForm from "./powerForm";
import { postCompany, patchCompany } from "@/api/business";
export default {
  components: { partnerForm, powerForm },
  data() {
    return {
      value: 0,
      types: [
        { label: "合伙人", value: 0 },
        { label: "广告主", value: 1 }
      ],

      editRow: {},
      isEdit: false
    };
  },
  methods: {
    changeType(val) {},
    submitForm() {
      this.$refs.partnerForm.$refs.baseForm.validate(valid => {
        if (valid) {
          let partnerForm = this.$refs.partnerForm.baseForm;
          let params = {};
          if (this.value == 0) {
            let powerForm = this.$refs.powerForm.baseForm;
            params = {
              type: this.value,
              key: partnerForm.key,
              name: partnerForm.name,
              contact: partnerForm.contact,
              phone: partnerForm.phone,
              percent: partnerForm.percent,
              contractStart: partnerForm.dateValue[0],
              contractEnd: partnerForm.dateValue[1],
              email: partnerForm.email,
              materialCheck: this.$filters.filterCheck(powerForm.materialCheck),
              materialPlatformCheckLevels: this.$filters.filterCheck(
                powerForm.materialPlatformCheckLevels
              ),
              programCheck: this.$filters.filterCheck(powerForm.programCheck),
              programPlatformCheckLevels: this.$filters.filterCheck(
                powerForm.programPlatformCheckLevels
              ),
              platformCheckType: this.$refs.powerForm.resource,
              videoSizeLimit: powerForm.videoSizeLimit * 1024 * 1024,
              cctvLog: powerForm.cctvLog == false ? 0 : 1,
              cctvShow: powerForm.cctvShow == false ? 0 : 1,
              transcodeTemplate: powerForm.transcodeTemplate,
              checkName1: powerForm.checkName1,
              checkName2: powerForm.checkName2,
              checkName3: powerForm.checkName3,
              checkName4: powerForm.checkName4
            };
          } else {
            params = {
              type: this.value,
              key: partnerForm.key,
              name: partnerForm.name,
              contact: partnerForm.contact,
              phone: partnerForm.phone
            };
          }
          if (this.isEdit) {
            params.id = this.editRow.id;
            patchCompany(params).then(res => {
              this.toast("创建成功", "success");
              this.$router.go(-1);
            });
            return;
          } else {
            postCompany(params).then(res => {
              this.toast("创建成功", "success");
              this.$router.go(-1);
            });
          }
        }
      });
    },
    resetForm() {
      this.$router.go(-1);
    }
  },
  created() {
    if (this.$route.query.type == 1) {
      this.editRow = JSON.parse(this.$route.query.data);
      this.value = this.editRow.type;
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }
};
</script>

<style  scoped>
</style>