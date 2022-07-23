import request from '@/service'

import type { IResponse, IPagination, IList } from '@/service/types'
import type { IMenu, IRole } from './types'

function api_getEntireMenuList() {
  return request.post<IResponse<IList<IMenu[]>>>('/menu/list')
}

function api_queryRoleList(queryInfo: IPagination & IRole) {
  return request.post<IResponse<IList<IRole[]>>>('/role/list', { data: queryInfo })
}

function api_createRole(role: IRole) {
  return request.post<IResponse<string>>('/role', { data: role })
}

function api_updateRole(roleId: number, role: IRole) {
  return request.patch<IResponse<string>>(`/role/${roleId}`, { data: role })
}

function api_deleteRole(roleId: number) {
  return request.delete<IResponse<string>>(`/role/${roleId}`)
}

export { api_getEntireMenuList, api_queryRoleList, api_createRole, api_updateRole, api_deleteRole }
