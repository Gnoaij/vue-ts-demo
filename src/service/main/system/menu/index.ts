import request from '@/service'

import type { IResponse, IList } from '@/service/types'
import type { IMenu } from './types'

function api_queryMenuList() {
  return request.post<IResponse<IList<IMenu[]>>>('/menu/list')
}

function api_createMenu(menu: IMenu) {
  return request.post<IResponse<string>>('/menu', { data: menu })
}

function api_updateMenu(menuId: number, menu: IMenu) {
  return request.patch<IResponse<string>>(`/menu/${menuId}`, { data: menu })
}

function api_deleteMenu(menuId: number) {
  return request.delete<IResponse<string>>(`/menu/${menuId}`)
}

export { api_queryMenuList, api_createMenu, api_updateMenu, api_deleteMenu }
