import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import installPlugin from '@/plugins'


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(installPlugin);
new Vue({
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  render: h => h(App)
}).$mount('#app')