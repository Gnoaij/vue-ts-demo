import request from '@/service'

import type { IResponse, IPagination, IList } from '@/service/types'
import type { IDepartment, IRole, IUser } from './types'

function api_getEntireDepartmentList(queryInfo: IPagination) {
  return request.post<IResponse<IList<IDepartment[]>>>('/department/list', { data: queryInfo })
}

function api_getEntireRoleList(queryInfo: IPagination) {
  return request.post<IResponse<IList<IRole[]>>>('/role/list', { data: queryInfo })
}

function api_queryUserList(queryInfo: IPagination & IUser) {
  return request.post<IResponse<IList<IUser[]>>>('/users/list', { data: queryInfo })
}

function api_createUser(user: IUser) {
  return request.post<IResponse<string>>('/users', { data: user })
}

function api_updateUser(userId: number, user: IUser) {
  return request.patch<IResponse<string>>(`/users/${userId}`, { data: user })
}

function api_deleteUser(userId: number) {
  return request.delete<IResponse<string>>(`/users/${userId}`)
}

export {
  api_getEntireDepartmentList,
  api_getEntireRoleList,
  api_queryUserList,
  api_createUser,
  api_updateUser,
  api_deleteUser
}
