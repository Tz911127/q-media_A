<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo animated fadeIn"
      :collapse="isCollapse"
      background-color="#0E1A21"
      text-color="#fff"
      active-text-color="#25d8ef"
      mode="vertical"
      unique-opened
    >
      <template v-for="(route,index) in permission_routes">
        <el-menu-item :key="route.path" :index="'a' + index" v-if="!route.children">
          <router-link class="title" active-class="active" tag="div" :to="{name: route.name}">
            <i :class="route.meta.icon"></i>
            <span>{{route.meta.title}}</span>
            <el-badge
              :value="value==0?'':value"
              :max="99"
              class="item"
              v-if="route.meta.title == '审核管理'"
            ></el-badge>
          </router-link>
          <span slot="title" v-show="isCollapse">{{route.meta.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="'a' + index" :key="route.path">
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span>{{route.meta.title}}</span>
          </template>
          <template v-for="child in route.item">
            <router-link
              :key="child.name"
              :to="route.path+'/'+child.path"
              class="title"
              active-class="active"
              tag="div"
            >
              <el-menu-item :index="child.path">
                <span>{{child.meta.title}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCheckPage } from "@/api/audit.js";
export default {
  data() {
    return {
      isCollapse: false,
      value: 0
    };
  },
  props: {
    opened: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(["permission_routes"])
  },
  watch: {
    opened: function(val) {
      this.isCollapse = val;
    }
  },
  created() {
    this.$root.eventHub.$on("extraTotal", num => {
      this.value = num;
    });
  },
  methods: {
    getData() {
      let params = {};
      getCheckPage(params).then(res => {
        this.value = res.extra.platformLv1
          ? res.extra.platformLv1
          : 0 + res.extra.platformLv2
          ? res.extra.platformLv2
          : 0 + res.extra.platformLv3
          ? res.extra.platformLv3
          : 0 + res.extra.platformLv4
          ? res.extra.platformLv4
          : 0;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style  scoped>
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.app-siderbar .el-menu-item {
  padding: 0;
}

.app-siderbar .el-tooltip {
  padding: 0 !important;
}
.app-siderbar .el-submenu .title .el-menu-item {
  padding-left: 0 !important;
  text-align: center;
}
.item {
  margin-left: 20px;
}
</style>