import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  //全局的userId
  state: {
    username: ''
  },
  mutations: {
    setUsername(state,data) {
      console.log("给username赋值："+data);
      state.username = data;
    }
  },
  actions: {
  },
  getters: {
    getUsername(state) {
      console.log("获取username的值："+state.username)
      return state.username
    }
  }
})
