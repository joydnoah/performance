// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require('../node_modules/bootstrap/less/bootstrap.less')

// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')

import Vue from 'vue'
import App from './App'
import axios from 'axios'
import * as uiv from 'uiv'
import router from './router'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import VueClipboard from 'vue-clipboard2'
import Multiselect from 'vue-multiselect'
import VueFroala from 'vue-froala-wysiwyg'
import FBSignInButton from 'vue-facebook-signin-button'
import VModal from 'vue-js-modal'
import VueHead from 'vue-head'
import Router from 'vue-router'
import KsVueScrollMagic from 'ks-vue-scrollmagic'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(uiv)
Vue.use(Vuelidate)
Vue.use(VueFroala)
Vue.use(VueClipboard)
Vue.use(VueAxios, axios)
Vue.component(Multiselect)
Vue.use(FBSignInButton)
Vue.use(VModal, { dialog: true })
Vue.use(Router)
Vue.use(VueHead)
Vue.use(VueQuillEditor, { theme: 'snow', placeholder: 'Digite su texto aqui...' })
Vue.use(KsVueScrollMagic)

Vue.config.productionTip = false

Vue.axios.defaults.baseURL = process.env.JOBS_API_URL
Vue.axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
Vue.axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
