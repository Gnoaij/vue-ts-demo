import request from '@/service'

import type { IResponse, IPagination, IList } from '@/service/types'
import type { ICategory, IGoods } from './types'

function api_getEntireCategoryList(queryInfo: IPagination) {
  return request.post<IResponse<IList<ICategory[]>>>('/category/list', { data: queryInfo })
}

function api_queryGoodsList(queryInfo: IPagination & IGoods) {
  return request.post<IResponse<IList<IGoods[]>>>('/goods/list', { data: queryInfo })
}

function api_createGoods(goods: IGoods) {
  return request.post<IResponse<string>>('/goods', { data: goods })
}

function api_updateGoods(goodsId: number, goods: IGoods) {
  return request.patch<IResponse<string>>(`/goods/${goodsId}`, { data: goods })
}

function api_deleteGoods(goodsId: number) {
  return request.delete<IResponse<string>>(`/goods/${goodsId}`)
}

export {
  api_getEntireCategoryList,
  api_queryGoodsList,
  api_createGoods,
  api_updateGoods,
  api_deleteGoods
}
