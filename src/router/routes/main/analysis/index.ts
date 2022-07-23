import type { RouteRecordRaw } from 'vue-router'

const Analysis = () => import('@/views/main/analysis/Analysis.vue')

const route: RouteRecordRaw = {
  path: '/main/analysis',
  name: '/main/analysis',
  meta: {
    title: '系统总览',
    requireAuth: true
  },
  component: Analysis
}

export default route
