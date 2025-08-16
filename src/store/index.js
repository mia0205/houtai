import { getUserInfoAPI } from '@/api'

import Vue from 'vue'
import Vuex from 'vuex'
// 引入插件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {}
  },
  getters: {
    // 定义三个变量
    nickname: state => state.userInfo.nickname,
    username: state => state.userInfo.username,
    user_pic: state => state.userInfo.user_pic
  },
  mutations: {
    // 更新token
    updateToken (state, value) {
      state.token = value
    },
    updateUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    async initUserInfo (store) {
      const res = await getUserInfoAPI()
      console.log(res)

      // 需要判断
      if (res.data.code === 0) {
        store.commit('updateUserInfo', res.data.data)
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})

// vuex默认保存在内存中,所以刷新刷新会回归初始化，无法持久化,保存到本地,插件vuex-persistedstate@3.2.1-vue2
