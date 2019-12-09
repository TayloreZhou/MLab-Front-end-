// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
import uploader from 'vue-simple-uploader'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// process.env.Mock && require('./mock.js')

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(uploader)
Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
