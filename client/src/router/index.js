import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Apply from '@/components/Apply'
import CreateBlog from '@/components/CreateBlog'
import Admin from '@/components/Admin'
import DKP from '@/components/DKP'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HomePage
    },
    {
      path: '/createBlog',
      name: 'createBlog',
      component: CreateBlog
    },
    {
      path: '/dkp',
      name: 'dkp',
      component: DKP
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/apply',
      name: 'apply',
      component: Apply
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
