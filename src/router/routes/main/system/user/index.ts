import type { RouteRecordRaw } from 'vue-router'

const User = () => import('@/views/main/system/user/User.vue')

const route: RouteRecordRaw = {
  path: '/main/system/user',
  name: '/main/system/user',
  meta: {
    title: '用户管理',
    requireAuth: true
  },
  component: User
}

export default route
