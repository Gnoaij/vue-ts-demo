import type { RouteRecordRaw } from 'vue-router'

const Product = () => import('@/views/main/product/Product.vue')

const route: RouteRecordRaw = {
  path: '/main/product',
  name: '/main/product',
  meta: {
    title: '商品中心',
    requireAuth: true
  },
  component: Product
}

export default route
