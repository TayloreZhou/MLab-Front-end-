import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  username: 'admin',
  token: 'sada',
  files: ['q', 'qq', 'qqq']
}

// getters
const getters = {
  getUsername () {
    return state.username
  },
  getToken () {
    return state.token
  },
  getFiles () {
    return state.files
  }
}

// mutations
const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUsername (state, username) {
    state.username = username
  },
  setupFiles (state, files) {
    state.files = files
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store
