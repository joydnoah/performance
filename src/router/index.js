import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Position from '@/components/Position'
import Positions from '@/components/Positions'
import Callback from '@/components/Callback'
import VerifyEmail from '@/components/VerifyEmail'
import { requireAuth } from '../../utils/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/position',
      name: 'Position',
      beforeEnter: requireAuth,
      component: Position
    },
    {
      path: '/positions',
      name: 'Positions',
      beforeEnter: requireAuth,
      component: Positions
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/verify-email',
      name: 'VerifyEmail',
      component: VerifyEmail
    }
  ]
})
