import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
  },
  mutations: {
    increment (state) {
      state.count++
    },
    set_token (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    del_token (state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    set_username (state, username) {
      state.username = username
      localStorage.setItem('username', username)
    },
    del_username (state) {
      state.username = ''
      localStorage.removeItem('username')
    }
  }
})

export default store
