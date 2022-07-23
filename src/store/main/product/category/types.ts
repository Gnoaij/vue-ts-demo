import type { ICategory } from '@/service/main/product/category/types'

interface ICategoryModuleState {
  categoryList: ICategory[]
  categoryCount: number
}

export { ICategoryModuleState }
