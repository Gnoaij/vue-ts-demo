import type { RouteRecordRaw } from 'vue-router'

const Goods = () => import('@/views/main/product/goods/Goods.vue')

const route: RouteRecordRaw = {
  path: '/main/product/goods',
  name: '/main/product/goods',
  meta: {
    title: '商品信息',
    requireAuth: true
  },
  component: Goods
}

export default route
