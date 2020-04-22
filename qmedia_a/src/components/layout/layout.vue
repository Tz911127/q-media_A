<template>
  <div>
    <el-container>
      <el-header>
        <header-Bar class="app-hearderbar" @together="together"></header-Bar>
      </el-header>
      <el-container>
        <el-aside style="width:''">
          <sider-Bar class="app-siderbar" :opened="opened"></sider-Bar>
        </el-aside>
        <el-main>
          <div v-if="isDetail">
            <el-breadcrumb separator="/" v-if="title=='组织机构'||title=='企业'">
              <el-breadcrumb-item :to="{ path: '/business' }" v-if="title=='组织机构'||title=='企业'">企业管理</el-breadcrumb-item>
              <el-breadcrumb-item>
                <span v-if="title=='企业'">{{isEdit?'编辑':'添加'}}</span>
                <span>{{title}}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>

            <div class="page-title" v-else>{{title}}</div>
          </div>
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerBar from "../headerBar/index";
import siderBar from "../siderBar/index";
import { mapActions } from "vuex";
export default {
  components: {
    headerBar,
    siderBar
  },
  data() {
    return {
      transitionName: "el-zoom-in-center",
      title: "",
      isDetail: true,
      isEdit: true
    };
  },
  computed: {
    opened() {
      return this.$store.state.user.isCollapse;
    }
  },
  created() {
    this.$root.eventHub.$on("isDetail", isDetail => {
      this.isDetail = isDetail;
    });
    this.$root.eventHub.$on("isEdit", isEdit => {
      this.isEdit = isEdit;
    });
  },
  watch: {
    $route() {
      // let isBack = this.$router.isBack;
      // if (isBack) {
      //   this.transitionName = "fade";
      // } else {
      //   this.transitionName = "fade";
      // }
      // this.$router.isBack = false;
      this.title = this.$route.meta.title;
      this.isDetail = true;
    }
  },
  mounted() {
    this.title = this.$route.meta.title;
  },
  methods: {
    ...mapActions(["isOpen", "getUserInfo"]),
    together() {
      if (!this.opened) {
        this.isOpen(true);
      } else {
        this.isOpen(false);
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getUserInfo().then(() => {});
    });
  }
};
</script>

<style  scoped>
.app-hearderbar {
  box-shadow: 0 1px 2px #999;
  height: 60px;
  z-index: 2000;
  width: 100%;
  background: #fff;
}
.app-siderbar {
  transition: width 0.28s;
  background-color: "#545c64";
  height: 100%;
  z-index: 1001;
}

.el-menu {
  border-right: 0;
  background-color: "#545c64";
}
.el-aside,
.el-main {
  height: calc(100vh - 60px);
}
.el-header {
  z-index: 111;
  padding: 0;
}
.el-breadcrumb {
  border-bottom: 1px solid #000;
}
.el-breadcrumb__item {
  font-size: 24px;
  padding-bottom: 20px;
}
</style>