import request from '@/service'

import type { IResponse, IPagination, IList } from '@/service/types'
import type { IDepartment } from './types'

function api_queryDepartmentList(queryInfo: IPagination & IDepartment) {
  return request.post<IResponse<IList<IDepartment[]>>>('/department/list', { data: queryInfo })
}

function api_createDepartment(department: IDepartment) {
  return request.post<IResponse<string>>('/department', { data: department })
}

function api_updateDepartment(departmentId: number, department: IDepartment) {
  return request.patch<IResponse<string>>(`/department/${departmentId}`, { data: department })
}

function api_deleteDepartment(departmentId: number) {
  return request.delete<IResponse<string>>(`/department/${departmentId}`)
}

export { api_queryDepartmentList, api_createDepartment, api_updateDepartment, api_deleteDepartment }
