import type { RouteRecordRaw } from 'vue-router'

const List = () => import('@/views/main/story/list/List.vue')

const route: RouteRecordRaw = {
  path: '/main/story/list',
  name: '/main/story/list',
  meta: {
    title: '故事列表',
    requireAuth: true
  },
  component: List
}

export default route
