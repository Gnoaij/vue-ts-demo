import type { RouteRecordRaw } from 'vue-router'

const Story = () => import('@/views/main/story/Story.vue')

const route: RouteRecordRaw = {
  path: '/main/story',
  name: '/main/story',
  meta: {
    title: '随便聊聊',
    requireAuth: true
  },
  component: Story
}

export default route
