import { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IRoleModuleState } from './types'
import { CommonGetterTypes, CommonMutationTypes, CommonActionTypes } from '@/store/types'
import { MutationTypes, ActionTypes } from './types'

import type { IPagination } from '@/service/types'
import type { IMenu, IRole } from '@/service/main/system/role/types'
import {
  api_getEntireMenuList,
  api_queryRoleList,
  api_createRole,
  api_updateRole,
  api_deleteRole
} from '@/service/main/system/role'

import AppMessage from '@/components/common/app-message'

import { getAllNodes } from '@/utils/recurser'

const roleModule: Module<IRoleModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      entireMenuList: [],
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    [CommonGetterTypes.PAGE_DATA](state) {
      return state.roleList
    },
    [CommonGetterTypes.PAGE_DATA_TOTAL](state) {
      return state.roleCount
    }
  },
  mutations: {
    [MutationTypes.SET_ENTIRE_MENU_LIST](state, entireMenuList: IMenu[]) {
      state.entireMenuList = entireMenuList
    },
    [CommonMutationTypes.SET_PAGE_DATA](state, roleList: IRole[]) {
      state.roleList = roleList
    },
    [CommonMutationTypes.SET_PAGE_DATA_TOTAL](state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  actions: {
    async [ActionTypes.GET_ENTIRE_MENU_LIST]({ commit }) {
      try {
        const { code, data } = await api_getEntireMenuList()
        if (code === 0) {
          commit(MutationTypes.SET_ENTIRE_MENU_LIST, data.list)
        } else {
          return Promise.reject(typeof data === 'string' ? data : '获取菜单列表失败')
        }
      } catch {
        return Promise.reject('获取菜单列表失败')
      }
    },
    async [CommonActionTypes.QUERY_PAGE_DATA]({ commit }, queryInfo: IPagination & IRole) {
      try {
        const { code, data } = await api_queryRoleList(queryInfo)
        if (code === 0) {
          data.list.forEach((item) => {
            item.tiledMenuIdList = getAllNodes(item.menuList).map((_item) => _item.id)
          })
          commit(CommonMutationTypes.SET_PAGE_DATA, data.list)
          commit(CommonMutationTypes.SET_PAGE_DATA_TOTAL, data.totalCount)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '检索角色列表失败')
        }
      } catch {
        return AppMessage.error('检索角色列表失败')
      }
    },
    async [CommonActionTypes.CREATE_PAGE_DATA](context, role: IRole) {
      try {
        const reqData = {
          name: role.name,
          intro: role.intro,
          menuList: role.tiledMenuIdList
        }
        const { code, data } = await api_createRole(reqData as any)
        if (code === 0) {
          return AppMessage.success('新建角色成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '新建角色失败')
        }
      } catch {
        return AppMessage.error('新建角色失败')
      }
    },
    async [CommonActionTypes.UPDATE_PAGE_DATA](context, role: IRole) {
      try {
        const reqData = {
          name: role.name,
          intro: role.intro,
          menuList: role.tiledMenuIdList
        }
        const { code, data } = await api_updateRole(role.id, reqData as any)
        if (code === 0) {
          return AppMessage.success('编辑角色成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '编辑角色失败')
        }
      } catch {
        return AppMessage.error('编辑角色失败')
      }
    },
    async [CommonActionTypes.DELETE_PAGE_DATA](context, role: IRole) {
      try {
        const { code, data } = await api_deleteRole(role.id)
        if (code === 0) {
          return AppMessage.success('删除角色成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '删除角色失败')
        }
      } catch {
        return AppMessage.error('删除角色失败')
      }
    }
  }
}

export default roleModule
