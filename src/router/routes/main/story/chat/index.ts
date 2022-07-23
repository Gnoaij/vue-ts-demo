import type { RouteRecordRaw } from 'vue-router'

const Chat = () => import('@/views/main/story/chat/Chat.vue')

const route: RouteRecordRaw = {
  path: '/main/story/chat',
  name: '/main/story/chat',
  meta: {
    title: '你的故事',
    requireAuth: true
  },
  component: Chat
}

export default route
