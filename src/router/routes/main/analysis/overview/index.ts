import type { RouteRecordRaw } from 'vue-router'

const Overview = () => import('@/views/main/analysis/overview/Overview.vue')

const route: RouteRecordRaw = {
  path: '/main/analysis/overview',
  name: '/main/analysis/overview',
  meta: {
    title: '核心技术',
    requireAuth: true
  },
  component: Overview
}

export default route
