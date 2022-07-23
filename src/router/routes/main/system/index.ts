import type { RouteRecordRaw } from 'vue-router'

const System = () => import('@/views/main/system/System.vue')

const route: RouteRecordRaw = {
  path: '/main/system',
  name: '/main/system',
  meta: {
    title: '系统管理',
    requireAuth: true
  },
  component: System
}

export default route
