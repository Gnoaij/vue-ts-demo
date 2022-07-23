import type { ICategory, IGoods } from '@/service/main/product/goods/types'

interface IGoodsModuleState {
  entireCategoryList: ICategory[]
  goodsList: IGoods[]
  goodsCount: number
}

enum MutationTypes {
  SET_ENTIRE_CATEGORY_LIST = 'SET_ENTIRE_CATEGORY_LIST'
}

enum ActionTypes {
  GET_ENTIRE_CATEGORY_LIST = 'GET_ENTIRE_CATEGORY_LIST'
}

export { IGoodsModuleState, MutationTypes, ActionTypes }
