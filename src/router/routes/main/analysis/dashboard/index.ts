import type { RouteRecordRaw } from 'vue-router'

const Dashboard = () => import('@/views/main/analysis/dashboard/Dashboard.vue')

const route: RouteRecordRaw = {
  path: '/main/analysis/dashboard',
  name: '/main/analysis/dashboard',
  meta: {
    title: '商品统计',
    requireAuth: true
  },
  component: Dashboard
}

export default route
