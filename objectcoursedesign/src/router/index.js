import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Student from '../views/Student.vue'

Vue.use(VueRouter)

const routes = [
  {
    //路径为空时跳到index(默认)
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/student',
    component: Student,
  },
  {
    path: '/admin',
    component: Admin
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
