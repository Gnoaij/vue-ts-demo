import request from '@/service'

import type { IResponse } from '@/service/types'
import type {
  IGoodsCategoryCount,
  IGoodsCategorySale,
  IGoodsCategoryFavor,
  IGoodsAddressSale,
  IGoodsAmountList
} from './types'

function api_getGoodsCategoryCount() {
  return request.get<IResponse<IGoodsCategoryCount>>('/goods/category/count')
}

function api_getGoodsCategorySale() {
  return request.get<IResponse<IGoodsCategorySale>>('/goods/category/sale')
}

function api_getGoodsCategoryFavor() {
  return request.get<IResponse<IGoodsCategoryFavor>>('/goods/category/favor')
}

function api_getGoodsAddressSale() {
  return request.get<IResponse<IGoodsAddressSale>>('/goods/address/sale')
}

function api_getGoodsAmountList() {
  return request.get<IResponse<IGoodsAmountList>>('/goods/amount/list')
}

export {
  api_getGoodsCategoryCount,
  api_getGoodsCategorySale,
  api_getGoodsCategoryFavor,
  api_getGoodsAddressSale,
  api_getGoodsAmountList
}
