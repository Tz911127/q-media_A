<template>
  <div v-loading="loading">
    <!-- 查询 -->
    <div style="margin:15px 0 ">
      <v-select :placeholder="`素材类型`" @optionChange="typeChange" :options="types"></v-select>
      <v-select :placeholder="`素材状态`" @optionChange="statusChange" :options="statuses"></v-select>
      <v-select :placeholder="`删除状态`" @optionChange="delChange" :options="deletes"></v-select>
      <v-select :placeholder="`停用状态`" @optionChange="enabledChange" :options="enableds"></v-select>
      <el-button style="float:right" type="warning" icon="el-icon-search" @click="search">查询</el-button>

      <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
        <el-input placeholder="素材名称" v-model.trim="name" @keyup.enter.native="search" clearable></el-input>
      </div>
      <div class="select-wraper" style="width:160px;float:right;margin-right:15px">
        <el-input placeholder="企业代码" v-model.trim="ck" @keyup.enter.native="search" clearable></el-input>
      </div>
    </div>
    <div style="margin:15px 0">
      <el-button type="primary" v-if="!disabled" @click="check">批量操作</el-button>
      <div v-if="disabled">
        <el-button @click="check">取消批量</el-button>
        <el-button type="primary" @click="checkEnable(1)">素材启用</el-button>
        <el-button type="danger" @click="checkEnable(0)">素材停用</el-button>
      </div>
    </div>
    <el-row style="margin:-7.5px">
      <el-col class="cardBox" v-for="(o, index) in cardData" :key="index">
        <el-card shadow="hover" style="height:200px;position:relative">
          <div
            style="position:relative;height:150px"
            @mouseenter="mouseenter(o,index)"
            @mouseleave="mouseLeave(o)"
          >
            <img
              style="width: 100%; height: 150px"
              :src="o.type == 1?getVideoPoster(o.path):imgPathFormate(o.path)"
            />
            <span
              class="status baseStatus"
              :class="statusStyle[o.status][0]"
            >{{o.status |filterStatus(o.currentLevelName)}}</span>
            <span class="del_1 delStyle" v-if="o.enabled==0">已停用</span>
            <span class="del delStyle" v-if="o.del==1">已删除</span>

            <el-checkbox
              v-if="disabled"
              :disabled="!disabled"
              class="check"
              @change="handleCheckedCitiesChange(o)"
            ></el-checkbox>
            <div class="review" v-show="active == index">
              <div class="review_flex">
                <span @click.stop="reviewDetail(1,o)">预览</span>
              </div>
            </div>
          </div>

          <div class="card_name">
            <el-tooltip effect="dark" :content="o.name" placement="top">
              <el-col style="overflow:hidden;text-overflow: ellipsis">
                <span>{{o.name}}</span>
              </el-col>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div
      v-if="cardData.length==0"
      style="margin-top:20px;text-align:center;color:rgb(144, 147, 153);font-size:14px"
    >暂无素材数据！</div>
    <el-pagination
      style="margin-top:10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
    ></el-pagination>

    <!-- 弹窗 -->
    <v-dialog ref="meterialDialog" :width="`50%`" @closed="closed" :showFooter="false" title="素材预览">
      <meterial-form :data="meterialForm" @click="click"></meterial-form>
    </v-dialog>
    <div class="image-view" v-if="flag" @click="click">
      <div class="img-box">
        <img :src="imgPathFormate(meterialForm.path)" width="100%" height="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMeterialPage,
  patchMaterial,
  getMaterialDetail
} from "@/api/meterial";
import meterialForm from "@/components/form/meterialForm";
import screenfull from "screenfull";
export default {
  components: { meterialForm },
  data() {
    return {
      cardData: [],
      active: -1,
      statusStyle: {
        0: ["blue"], //待提交审核
        1: ["green"], //审核成功
        2: ["gray"], //内部审核中
        3: ["gray"], //平台审核中
        4: ["red"], //内部审核失败
        5: ["red"], //审核失败（平台）
        6: ["red"], //转码中
        7: ["red"] //转码失败
      },
      tableParams: {
        limit: 10,
        page: 0
      },
      currentPage: 1,
      total: 0,
      loading: true,
      types: [
        { name: "视频", val: 1 },
        { name: "图片", val: 0 }
      ],
      statuses: [
        { name: "待提交审核", val: 0 },
        { name: "审核成功", val: 1 },
        { name: "内部审核中", val: 2 },
        { name: "平台审核中", val: 3 },
        { name: "内部审核失败", val: 4 },
        { name: "平台审核失败", val: 5 },
        { name: "转码中", val: 6 },
        { name: "转码失败", val: 7 }
      ],
      deletes: [
        { name: "未删除", val: 0 },
        { name: "已删除", val: 1 }
      ],
      enableds: [
        { name: "已停用", val: 0 },
        { name: "未停用", val: 1 }
      ],
      name: "",
      ck: "",
      disabled: false,
      checked: "false",
      ids: [],
      meterialForm: {},
      flag: false
    };
  },

  methods: {
    getData() {
      let params = this.tableParams;
      this.loading = true;
      getMeterialPage(params).then(res => {
        this.loading = false;
        this.cardData = res.data;
        this.total = res.total;
      });
    },
    mouseenter(val, index) {
      this.active = index;
    },
    mouseLeave() {
      this.active = -1;
    },
    reviewDetail(i, val) {
      getMaterialDetail(val).then(res => {
        this.$refs.meterialDialog.dialogVisible = true;
        this.meterialForm = res;
      });
    },
    closed() {
      this.meterialForm.path = "";
    },
    handleSizeChange(val) {
      this.tableParams.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.tableParams.page = val - 1;
      this.getData();
    },
    //筛选
    typeChange(val) {
      this.tableParams.type = val;
      this.search();
    },
    statusChange(val) {
      this.tableParams.status = val;
      this.search();
    },
    delChange(val) {
      this.tableParams.del = val;
      this.search();
    },
    enabledChange(val) {
      this.tableParams.enabled = val;
      this.search();
    },
    search() {
      this.tableParams.name = this.name;
      this.tableParams.ck = this.ck;
      this.getData();
    },
    check() {
      this.disabled = !this.disabled;
      if (this.disabled) {
        this.ids = [];
      }
    },
    handleCheckedCitiesChange(value) {
      if (this.ids.indexOf(value.id) == -1) {
        this.ids.push(value.id);
      } else {
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] == value.id) {
            this.ids.splice(i, 1);
            break;
          }
        }
      }
    },
    checkEnable(val) {
      if (this.ids.length == 0) {
        this.toast("请选择素材", "error");
        return;
      }
      let params = {
        idList: this.ids,
        enable: val
      };
      patchMaterial(params).then(res => {
        this.getData();
        this.toast("操作成功", "success");
        this.ids = [];
        this.disabled = false;
      });
    },
    click() {
      screenfull.toggle();
      screenfull.on("change", () => {
        if (screenfull.isFullscreen) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style >
@import "../../style/card.css";
</style>