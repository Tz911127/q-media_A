import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user.js'
import editor from './modules/editor.js'

export default new Vuex.Store({
  modules: {
    user,
    editor
  }
})