import { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IMainModuleState } from './types'
import { MutationTypes, ActionTypes } from './types'

import type { IUser, IMenu } from '@/service/main/types'
import { api_getUser, api_getRoleMenu } from '@/service/main'

import { mapRoleMenuToRoutes, mapRoleMenuToRouteMenu, addRoutes } from '@/router/utils'

import analysisModule from './analysis'
import productModule from './product'
import systemModule from './system'
import storyModule from './story'

import storage from '@/utils/storage'

import AppMessage from '@/components/common/app-message'

const mainModule: Module<IMainModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      user: {} as IUser,
      routeMenu: []
    }
  },
  mutations: {
    [MutationTypes.SET_USER](state, user: IUser) {
      state.user = user
    },
    [MutationTypes.SET_ROUTE_MENU](state, routeMenu: IMenu[]) {
      state.routeMenu = routeMenu
    }
  },
  actions: {
    async [ActionTypes.GET_USER]({ commit }) {
      try {
        const userId = storage.getItem('userId')
        const { code, data } = await api_getUser(userId)
        if (code === 0) {
          commit(MutationTypes.SET_USER, data)
        } else {
          return AppMessage.error('获取用户信息失败，请刷新重试或重新登录')
        }
      } catch (error) {
        return AppMessage.error('获取用户信息失败，请刷新重试或重新登录')
      }
    },
    async [ActionTypes.GET_ROUTE_MENU]({ state, commit }) {
      try {
        const roleId = state.user?.role?.id
        const { code, data } = await api_getRoleMenu(roleId)
        if (code === 0) {
          const routeMenu = mapRoleMenuToRouteMenu(data ?? [])
          const routes = mapRoleMenuToRoutes(data ?? [])
          commit(MutationTypes.SET_ROUTE_MENU, routeMenu)
          addRoutes(routes, '/main')
        } else {
          return AppMessage.error('获取路由菜单失败，请刷新重试或重新登录')
        }
      } catch (error) {
        return AppMessage.error('获取路由菜单失败，请刷新重试或重新登录')
      }
    }
  },
  modules: {
    analysisModule,
    productModule,
    systemModule,
    storyModule
  }
}

export default mainModule
