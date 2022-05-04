import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // page: "首页",
    userInfo:{}
  },
  mutations: {
    changeUserInfo(state,userInfo){
      state.userInfo = userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
