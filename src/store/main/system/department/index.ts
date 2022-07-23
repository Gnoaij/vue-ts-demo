import type { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IDepartmentModuleState } from './types'
import { CommonGetterTypes, CommonMutationTypes, CommonActionTypes } from '@/store/types'

import type { IPagination } from '@/service/types'
import type { IDepartment } from '@/service/main/system/department/types'
import {
  api_queryDepartmentList,
  api_createDepartment,
  api_updateDepartment,
  api_deleteDepartment
} from '@/service/main/system/department'

import AppMessage from '@/components/common/app-message'

const departmentModule: Module<IDepartmentModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      departmentList: [],
      departmentCount: 0
    }
  },
  getters: {
    [CommonGetterTypes.PAGE_DATA](state) {
      return state.departmentList
    },
    [CommonGetterTypes.PAGE_DATA_TOTAL](state) {
      return state.departmentCount
    }
  },
  mutations: {
    [CommonMutationTypes.SET_PAGE_DATA](state, departmentList: IDepartment[]) {
      state.departmentList = departmentList
    },
    [CommonMutationTypes.SET_PAGE_DATA_TOTAL](state, departmentCount: number) {
      state.departmentCount = departmentCount
    }
  },
  actions: {
    async [CommonActionTypes.QUERY_PAGE_DATA]({ commit }, queryInfo: IPagination & IDepartment) {
      try {
        const { code, data } = await api_queryDepartmentList(queryInfo)
        if (code === 0) {
          commit(CommonMutationTypes.SET_PAGE_DATA, data.list)
          commit(CommonMutationTypes.SET_PAGE_DATA_TOTAL, data.totalCount)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '检索部门列表失败')
        }
      } catch {
        return AppMessage.error('检索部门列表失败')
      }
    },
    async [CommonActionTypes.CREATE_PAGE_DATA](context, department: IDepartment) {
      try {
        const { code, data } = await api_createDepartment(department)
        if (code === 0) {
          return AppMessage.success('新建部门成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '新建部门失败')
        }
      } catch {
        return AppMessage.error('新建部门失败')
      }
    },
    async [CommonActionTypes.UPDATE_PAGE_DATA](context, department: IDepartment) {
      try {
        const reqData = {
          name: department.name,
          parentId: department.parentId,
          leader: department.leader
        }
        const { code, data } = await api_updateDepartment(department.id, reqData as IDepartment)
        if (code === 0) {
          return AppMessage.success('编辑部门成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '编辑部门失败')
        }
      } catch {
        return AppMessage.error('编辑部门失败')
      }
    },
    async [CommonActionTypes.DELETE_PAGE_DATA](context, department: IDepartment) {
      try {
        const { code, data } = await api_deleteDepartment(department.id)
        if (code === 0) {
          return AppMessage.success('删除部门成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '删除部门失败')
        }
      } catch {
        return AppMessage.error('删除部门失败')
      }
    }
  }
}

export default departmentModule
