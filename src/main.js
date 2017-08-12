// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require('../node_modules/bootstrap/less/bootstrap.less')
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
// // Vue.config.base_url = process.env.BASE_URL

// Vue.axios.defaults.baseURL = Vue.config.base_url
Vue.axios.defaults.baseURL = 'https://jobs-api-development-pr-1.herokuapp.com'
Vue.axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
