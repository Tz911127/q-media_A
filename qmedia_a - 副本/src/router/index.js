import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'


Vue.use(VueRouter)
Vue.use(Vuex)

// 配置routes
import routes from './routes'



// 路由配置
const router = new VueRouter({
  routes
})

export default router