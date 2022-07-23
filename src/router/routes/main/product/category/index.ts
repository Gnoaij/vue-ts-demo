import type { RouteRecordRaw } from 'vue-router'

const Category = () => import('@/views/main/product/category/Category.vue')

const route: RouteRecordRaw = {
  path: '/main/product/category',
  name: '/main/product/category',
  meta: {
    title: '商品类别',
    requireAuth: true
  },
  component: Category
}

export default route
