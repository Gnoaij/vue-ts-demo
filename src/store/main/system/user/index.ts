import { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IUserModuleState } from './types'
import { CommonGetterTypes, CommonMutationTypes, CommonActionTypes } from '@/store/types'
import { MutationTypes, ActionTypes } from './types'

import type { IPagination } from '@/service/types'
import type { IDepartment, IRole, IUser } from '@/service/main/system/user/types'
import {
  api_getEntireDepartmentList,
  api_getEntireRoleList,
  api_queryUserList,
  api_createUser,
  api_updateUser,
  api_deleteUser
} from '@/service/main/system/user'

import AppMessage from '@/components/common/app-message'

const userModule: Module<IUserModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      entireDepartmentList: [],
      entireRoleList: [],
      userList: [],
      userCount: 0
    }
  },
  getters: {
    [CommonGetterTypes.PAGE_DATA](state) {
      return state.userList
    },
    [CommonGetterTypes.PAGE_DATA_TOTAL](state) {
      return state.userCount
    }
  },
  mutations: {
    [MutationTypes.SET_ENTIRE_DEPARTMENT_LIST](state, entireDepartmentList: IDepartment[]) {
      state.entireDepartmentList = entireDepartmentList
    },
    [MutationTypes.SET_ENTIRE_ROLE_LIST](state, entireRoleList: IRole[]) {
      state.entireRoleList = entireRoleList
    },
    [CommonMutationTypes.SET_PAGE_DATA](state, userList: IUser[]) {
      state.userList = userList
    },
    [CommonMutationTypes.SET_PAGE_DATA_TOTAL](state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async [ActionTypes.GET_ENTIRE_DEPARTMENT_LIST]({ commit }, queryInfo: IPagination) {
      try {
        const { code, data } = await api_getEntireDepartmentList(queryInfo)
        if (code === 0) {
          commit(MutationTypes.SET_ENTIRE_DEPARTMENT_LIST, data.list)
        } else {
          return Promise.reject(typeof data === 'string' ? data : '获取部门列表失败')
        }
      } catch {
        return Promise.reject('获取部门列表失败')
      }
    },
    async [ActionTypes.GET_ENTIRE_ROLE_LIST]({ commit }, queryInfo: IPagination) {
      try {
        const { code, data } = await api_getEntireRoleList(queryInfo)
        if (code === 0) {
          commit(MutationTypes.SET_ENTIRE_ROLE_LIST, data.list)
        } else {
          return Promise.reject(typeof data === 'string' ? data : '获取角色列表失败')
        }
      } catch {
        return Promise.reject('获取角色列表失败')
      }
    },
    async [CommonActionTypes.QUERY_PAGE_DATA]({ commit }, queryInfo: IPagination & IUser) {
      try {
        const { code, data } = await api_queryUserList(queryInfo)
        if (code === 0) {
          commit(CommonMutationTypes.SET_PAGE_DATA, data.list)
          commit(CommonMutationTypes.SET_PAGE_DATA_TOTAL, data.totalCount)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '检索用户列表失败')
        }
      } catch {
        return AppMessage.error('检索用户列表失败')
      }
    },
    async [CommonActionTypes.CREATE_PAGE_DATA](context, user: IUser) {
      try {
        const { code, data } = await api_createUser(user)
        if (code === 0) {
          return AppMessage.success('新建用户成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '新建用户失败')
        }
      } catch {
        return AppMessage.error('新建用户失败')
      }
    },
    async [CommonActionTypes.UPDATE_PAGE_DATA](context, user: IUser) {
      try {
        const reqData = {
          name: user.name,
          realname: user.realname,
          cellphone: user.cellphone,
          enable: user.enable,
          departmentId: user.departmentId,
          roleId: user.roleId
        }
        const { code, data } = await api_updateUser(user.id, reqData as IUser)
        if (code === 0) {
          return AppMessage.success('编辑用户成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '编辑用户失败')
        }
      } catch {
        return AppMessage.error('编辑用户失败')
      }
    },
    async [CommonActionTypes.DELETE_PAGE_DATA](context, user: IUser) {
      try {
        const { code, data } = await api_deleteUser(user.id)
        if (code === 0) {
          return AppMessage.success('删除用户成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '删除用户失败')
        }
      } catch {
        return AppMessage.error('删除用户失败')
      }
    }
  }
}

export default userModule
