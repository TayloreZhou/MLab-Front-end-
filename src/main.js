// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
import uploader from 'vue-simple-uploader'
import moment from 'moment'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// process.env.Mock && require('./mock/index')

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

Vue.use(ElementUI, { locale })
Vue.use(uploader)
Vue.use(mavonEditor)

axios.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.log('err')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token')
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
