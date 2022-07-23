import type {
  IGoodsCategoryCount,
  IGoodsCategorySale,
  IGoodsCategoryFavor,
  IGoodsAddressSale,
  IGoodsAmountList
} from '@/service/main/analysis/dashboard/types'

interface IDashboardModuleState {
  goodsCategoryCount: IGoodsCategoryCount[]
  goodsCategorySale: IGoodsCategorySale[]
  goodsCategoryFavor: IGoodsCategoryFavor[]
  goodsAddressSale: IGoodsAddressSale[]
  goodsAmountList: IGoodsAmountList[]
}

enum MutationTypes {
  SET_GOODS_CATEGORY_COUNT = 'SET_GOODS_CATEGORY_COUNT',
  SET_GOODS_CATEGORY_SALE = 'SET_GOODS_CATEGORY_SALE',
  SET_GOODS_CATEGORY_FAVOR = 'SET_GOODS_CATEGORY_FAVOR',
  SET_GOODS_ADDRESS_SALE = 'SET_GOODS_ADDRESS_SALE',
  SET_GOODS_AMOUNT_LIST = 'SET_GOODS_AMOUNT_LIST'
}

enum ActionTypes {
  GET_GOODS_CATEGORY_COUNT = 'GET_GOODS_CATEGORY_COUNT',
  GET_GOODS_CATEGORY_SALE = 'GET_GOODS_CATEGORY_SALE',
  GET_GOODS_CATEGORY_FAVOR = 'GET_GOODS_CATEGORY_FAVOR',
  GET_GOODS_ADDRESS_SALE = 'GET_GOODS_ADDRESS_SALE',
  GET_GOODS_AMOUNT_LIST = 'GET_GOODS_AMOUNT_LIST'
}

export { IDashboardModuleState, MutationTypes, ActionTypes }
