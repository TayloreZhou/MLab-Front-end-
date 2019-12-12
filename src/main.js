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

// process.env.Mock && require('./mock.js')

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

Vue.use(ElementUI, { locale })
Vue.use(uploader)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
