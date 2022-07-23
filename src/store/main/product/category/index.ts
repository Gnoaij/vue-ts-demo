import type { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { ICategoryModuleState } from './types'
import { CommonGetterTypes, CommonMutationTypes, CommonActionTypes } from '@/store/types'

import type { IPagination } from '@/service/types'
import type { ICategory } from '@/service/main/product/category/types'
import {
  api_queryCategoryList,
  api_createCategory,
  api_updateCategory,
  api_deleteCategory
} from '@/service/main/product/category'

import AppMessage from '@/components/common/app-message'

const categoryModule: Module<ICategoryModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryList: [],
      categoryCount: 0
    }
  },
  getters: {
    [CommonGetterTypes.PAGE_DATA](state) {
      return state.categoryList
    },
    [CommonGetterTypes.PAGE_DATA_TOTAL](state) {
      return state.categoryCount
    }
  },
  mutations: {
    [CommonMutationTypes.SET_PAGE_DATA](state, categoryList: ICategory[]) {
      state.categoryList = categoryList
    },
    [CommonMutationTypes.SET_PAGE_DATA_TOTAL](state, categoryCount: number) {
      state.categoryCount = categoryCount
    }
  },
  actions: {
    async [CommonActionTypes.QUERY_PAGE_DATA]({ commit }, queryInfo: IPagination & ICategory) {
      try {
        const { code, data } = await api_queryCategoryList(queryInfo)
        if (code === 0) {
          commit(CommonMutationTypes.SET_PAGE_DATA, data.list)
          commit(CommonMutationTypes.SET_PAGE_DATA_TOTAL, data.totalCount)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '检索类别列表失败')
        }
      } catch {
        return AppMessage.error('检索类别列表失败')
      }
    },
    async [CommonActionTypes.CREATE_PAGE_DATA](context, category: ICategory) {
      try {
        const { code, data } = await api_createCategory(category)
        if (code === 0) {
          return AppMessage.success('新建类别成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '新建类别失败')
        }
      } catch {
        return AppMessage.error('新建类别失败')
      }
    },
    async [CommonActionTypes.UPDATE_PAGE_DATA](context, category: ICategory) {
      try {
        const reqData = {
          name: category.name
        }
        const { code, data } = await api_updateCategory(category.id, reqData as ICategory)
        if (code === 0) {
          return AppMessage.success('编辑类别成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '编辑类别失败')
        }
      } catch {
        return AppMessage.error('编辑类别失败')
      }
    },
    async [CommonActionTypes.DELETE_PAGE_DATA](context, category: ICategory) {
      try {
        const { code, data } = await api_deleteCategory(category.id)
        if (code === 0) {
          return AppMessage.success('删除类别成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '删除类别失败')
        }
      } catch {
        return AppMessage.error('删除类别失败')
      }
    }
  }
}

export default categoryModule
