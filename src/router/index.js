import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Auth from '@/components/Auth'
import Callback from '@/components/Callback'
import { requireAuth } from '../../utils/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/required',
      name: 'Hello',
      beforeEnter: requireAuth,
      component: Hello
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    }
  ]
})
