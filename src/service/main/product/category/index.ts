import request from '@/service'

import type { IResponse, IPagination, IList } from '@/service/types'
import type { ICategory } from './types'

function api_queryCategoryList(queryInfo: IPagination & ICategory) {
  return request.post<IResponse<IList<ICategory[]>>>('/category/list', { data: queryInfo })
}

function api_createCategory(category: ICategory) {
  return request.post<IResponse<string>>('/category', { data: category })
}

function api_updateCategory(categoryId: number, category: ICategory) {
  return request.patch<IResponse<string>>(`/category/${categoryId}`, { data: category })
}

function api_deleteCategory(categoryId: number) {
  return request.delete<IResponse<string>>(`/category/${categoryId}`)
}

export { api_queryCategoryList, api_createCategory, api_updateCategory, api_deleteCategory }
