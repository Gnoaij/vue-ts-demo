import type { RouteRecordRaw } from 'vue-router'

const Menu = () => import('@/views/main/system/menu/Menu.vue')

const route: RouteRecordRaw = {
  path: '/main/system/menu',
  name: '/main/system/menu',
  meta: {
    title: '菜单管理',
    requireAuth: true
  },
  component: Menu
}

export default route
