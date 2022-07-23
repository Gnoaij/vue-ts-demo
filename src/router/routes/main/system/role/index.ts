import type { RouteRecordRaw } from 'vue-router'

const Role = () => import('@/views/main/system/role/Role.vue')

const route: RouteRecordRaw = {
  path: '/main/system/role',
  name: '/main/system/role',
  meta: {
    title: '角色管理',
    requireAuth: true
  },
  component: Role
}

export default route
