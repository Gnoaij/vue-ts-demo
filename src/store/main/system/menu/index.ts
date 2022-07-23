import { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IMenuModuleState } from './types'
import { CommonGetterTypes, CommonMutationTypes, CommonActionTypes } from '@/store/types'

import type { IMenu } from '@/service/main/system/menu/types'
import {
  api_queryMenuList,
  api_createMenu,
  api_updateMenu,
  api_deleteMenu
} from '@/service/main/system/menu'

import AppMessage from '@/components/common/app-message'

const menuModule: Module<IMenuModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      menuList: [] as IMenu[]
    }
  },
  getters: {
    [CommonGetterTypes.PAGE_DATA](state) {
      return state.menuList
    }
  },
  mutations: {
    [CommonMutationTypes.SET_PAGE_DATA](state, menuList: IMenu[]) {
      state.menuList = menuList
    }
  },
  actions: {
    async [CommonActionTypes.QUERY_PAGE_DATA]({ commit }) {
      try {
        const { code, data } = await api_queryMenuList()
        if (code === 0) {
          commit(CommonMutationTypes.SET_PAGE_DATA, data.list)
        } else {
          return AppMessage.error('检索菜单列表失败')
        }
      } catch {
        return AppMessage.error('检索菜单列表失败')
      }
    },
    async [CommonActionTypes.CREATE_PAGE_DATA](context, menu: IMenu) {
      try {
        const { code, data } = await api_createMenu(menu)
        if (code === 0) {
          return AppMessage.success('新建菜单成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '新建菜单失败')
        }
      } catch {
        return AppMessage.error('新建菜单失败')
      }
    },
    async [CommonActionTypes.UPDATE_PAGE_DATA](context, menu: IMenu) {
      try {
        const reqData = {
          name: menu.name,
          type: menu.type,
          url: menu.url,
          icon: menu.icon,
          sort: menu.sort,
          parentId: menu.sort,
          permission: menu.permission
        }
        const { code, data } = await api_updateMenu(menu.id, reqData as IMenu)
        if (code === 0) {
          return AppMessage.success('编辑菜单成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '编辑菜单失败')
        }
      } catch {
        return AppMessage.error('编辑菜单失败')
      }
    },
    async [CommonActionTypes.DELETE_PAGE_DATA](context, menu: IMenu) {
      try {
        const { code, data } = await api_deleteMenu(menu.id)
        if (code === 0) {
          return AppMessage.success('删除菜单成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '删除菜单失败')
        }
      } catch {
        return AppMessage.error('删除菜单失败')
      }
    }
  }
}

export default menuModule
