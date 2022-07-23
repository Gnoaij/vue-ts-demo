import request from '@/service'

import type { IResponse } from '@/service/types'
import type { IUser, IMenu } from './types'

function api_getUser(userId: number) {
  return request.get<IResponse<IUser>>(`/users/${userId}`)
}

function api_getRoleMenu(roleId: number) {
  return request.get<IResponse<IMenu[]>>(`/role/${roleId}/menu`)
}

export { api_getUser, api_getRoleMenu }
