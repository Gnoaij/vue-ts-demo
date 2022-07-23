import type { IDepartment, IRole, IUser } from '@/service/main/system/user/types'

interface IUserModuleState {
  entireDepartmentList: IDepartment[]
  entireRoleList: IRole[]
  userList: IUser[]
  userCount: number
}

enum MutationTypes {
  SET_ENTIRE_DEPARTMENT_LIST = 'SET_ENTIRE_DEPARTMENT_LIST',
  SET_ENTIRE_ROLE_LIST = 'SET_ENTIRE_ROLE_LIST'
}

enum ActionTypes {
  GET_ENTIRE_DEPARTMENT_LIST = 'GET_ENTIRE_DEPARTMENT_LIST',
  GET_ENTIRE_ROLE_LIST = 'GET_ENTIRE_ROLE_LIST'
}

export { IUserModuleState, MutationTypes, ActionTypes }
