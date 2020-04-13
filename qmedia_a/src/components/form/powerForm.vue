<template>
  <div>
    <el-form :model="baseForm" class="power-form-inline" size="mini" ref="baseForm">
      <el-form-item label="素材内部审核">
        <el-checkbox-group v-model="baseForm.materialCheck" @change="matChange">
          <el-checkbox
            v-for="item in options"
            :key="item"
            :label="item == 1?'一级审核':item == 2?'二级审核':item == 3?'三级审核':'四级审核'"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <br />
      <el-form-item label="节目内部审核">
        <el-checkbox-group v-model="baseForm.programCheck" @change="proChange">
          <el-checkbox
            v-for="item in options"
            :key="item"
            :label="item == 1?'一级审核':item == 2?'二级审核':item == 3?'三级审核':'四级审核'"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <br />
      <el-form-item label="内部审核重命名">
        <el-input v-model.trim="baseForm.checkName1" placeholder="一级审核" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="baseForm.checkName2" placeholder="二级审核" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="baseForm.checkName3" placeholder="三级审核" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="baseForm.checkName4" placeholder="四级审核" clearable></el-input>
      </el-form-item>
      <br />
      <el-form-item label="平台审核类型">
        <el-radio-group v-model="resource">
          <el-radio :label="0">公司审核</el-radio>
          <el-radio :label="1">CCTV审核</el-radio>
        </el-radio-group>
      </el-form-item>
      <br />
      <el-form-item label="素材平台审核">
        <el-checkbox-group v-model="baseForm.materialPlatformCheckLevels">
          <el-checkbox
            v-for="item in options"
            :key="item"
            :label="item == 1?'一级审核':item == 2?'二级审核':item == 3?'三级审核':'四级审核'"
            name="materialPlatformCheckLevels"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <br />
      <el-form-item label="节目平台审核">
        <el-checkbox-group v-model="baseForm.programPlatformCheckLevels">
          <el-checkbox
            v-for="item in options"
            :key="item"
            :label="item == 1?'一级审核':item == 2?'二级审核':item == 3?'三级审核':'四级审核'"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <br />
      <el-form-item label="央视素材">
        <el-switch v-model="baseForm.cctvShow"></el-switch>
      </el-form-item>
      <br />
      <el-form-item label="央视日志">
        <el-switch v-model="baseForm.cctvLog"></el-switch>
      </el-form-item>

      <br />
      <el-form-item
        label="视频大小上限"
        prop="videoSizeLimit"
        :rules="[
      { required: true, message: '请输入视频大小上限', trigger: 'blur' }
    ]"
      >
        <el-col :span="20">
          <el-input v-model.number="baseForm.videoSizeLimit" maxlength="4" clearable></el-input>
        </el-col>
        <el-col :span="4" style="text-align:center">
          <span>M</span>
        </el-col>
      </el-form-item>
      <br />
      <el-form-item
        label="视频转码"
        prop="transcodeTemplate"
        :rules="[
      { required: true, message: '视频转码', trigger: 'blur' }
    ]"
      >
        <el-select v-model="baseForm.transcodeTemplate">
          <el-option
            v-for="item in transcodeTemplates"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: Boolean,
    editRow: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      resource: 1,
      baseForm: {
        materialCheck: [],
        programCheck: [],
        materialPlatformCheckLevels: [],
        programPlatformCheckLevels: [],
        cctvLog: false,
        cctvShow: false,
        videoSizeLimit: 500,
        transcodeTemplate: 1,
        checkName1: "",
        checkName2: "",
        checkName3: "",
        checkName4: ""
      },
      options: [1, 2, 3, 4],
      transcodeTemplates: [
        { label: "4000kb/s", value: 1 },
        { label: "6000kb/s", value: 2 },
        { label: "8000kb/s", value: 3 }
      ]
    };
  },
  methods: {
    matChange(val) {
     
    },
    proChange(val) {},
    edit() {
      this.baseForm = Object.assign({}, this.editRow);
      this.resource = this.editRow.platformCheckType;
      this.baseForm.videoSizeLimit = this.baseForm.videoSizeLimit / 1024 / 1024;
      this.$filters.filterReCheck(this.baseForm.materialCheck);
      this.$filters.filterReCheck(this.baseForm.programCheck);
      this.$filters.filterReCheck(this.baseForm.materialPlatformCheckLevels);
      this.$filters.filterReCheck(this.baseForm.programPlatformCheckLevels);
      this.baseForm.cctvShow = this.baseForm.cctvShow == 1 ? true : false;
      this.baseForm.cctvLog = this.baseForm.cctvLog == 1 ? true : false;
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
</style>