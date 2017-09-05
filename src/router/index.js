import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Position from '@/components/Position'
import PositionPreview from '@/components/PositionPreview'
import PositionApply from '@/components/PositionApply'
import Positions from '@/components/Positions'
import Applicants from '@/components/Applicants'
import Applicant from '@/components/Applicant'
import Callback from '@/components/Callback'
import VerifyEmail from '@/components/VerifyEmail'
import CreateCompany from '@/components/CreateCompany'
import CompanyJobs from '@/components/CompanyJobs'
import Dashboard from '@/components/Dashboard'
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
      path: '/position-preview/:id',
      name: 'PositionPreview',
      beforeEnter: requireAuth,
      component: PositionPreview
    },
    {
      path: '/position-apply/:id',
      name: 'PositionApply',
      component: PositionApply
    },
    {
      path: '/applicants/:position_id',
      name: 'Applicants',
      beforeEnter: requireAuth,
      component: Applicants
    },
    {
      path: '/applicant/:id',
      name: 'Applicant',
      beforeEnter: requireAuth,
      component: Applicant
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
    },
    {
      path: '/create-company',
      name: 'CreateCompany',
      component: CreateCompany
    },
    {
      path: '/company-jobs',
      name: 'CompanyJobs',
      component: CompanyJobs
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
