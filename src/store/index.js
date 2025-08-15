import Vue from 'vue'
import Vuex from 'vuex'
// 引入插件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
  },
  mutations: {
    // 更新token
    updateToken (state, value) {
      state.token = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})

// vuex默认保存在内存中,所以刷新刷新会回归初始化，无法持久化,保存到本地,插件vuex-persistedstate@3.2.1-vue2
