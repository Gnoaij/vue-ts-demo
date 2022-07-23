import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import storage from '@/utils/storage'

const Login = () => import('@/views/login/Login.vue')
const Main = () => import('@/views/main/Main.vue')
const NotFound = () => import('@/views/not-found/NotFound.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: '/login',
    meta: {
      title: '登录',
      requireAuth: false
    },
    component: Login
  },
  {
    path: '/main',
    name: '/main',
    meta: {
      title: '首页',
      requireAuth: true
    },
    component: Main
  },
  {
    path: '/:pathMatch(.*)*',
    name: '/not-found',
    meta: {
      title: '404',
      requireAuth: false
    },
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requireAuth) {
    const userId = storage.getItem('userId')
    const token = storage.getItem('token')
    if (!userId || !token) {
      return '/login'
    }
  }
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) ?? 'Vue CMS'
})

export default router
