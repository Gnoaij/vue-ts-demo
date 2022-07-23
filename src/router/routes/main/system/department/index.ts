import type { RouteRecordRaw } from 'vue-router'

const Department = () => import('@/views/main/system/department/Department.vue')

const route: RouteRecordRaw = {
  path: '/main/system/department',
  name: '/main/system/department',
  meta: {
    title: '部门管理',
    requireAuth: true
  },
  component: Department
}

export default route
