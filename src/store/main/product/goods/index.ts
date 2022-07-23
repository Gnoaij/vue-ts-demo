import type { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IGoodsModuleState } from './types'
import { CommonGetterTypes, CommonMutationTypes, CommonActionTypes } from '@/store/types'
import { MutationTypes, ActionTypes } from './types'

import type { IPagination } from '@/service/types'
import type { ICategory, IGoods } from '@/service/main/product/goods/types'
import {
  api_getEntireCategoryList,
  api_queryGoodsList,
  api_createGoods,
  api_updateGoods,
  api_deleteGoods
} from '@/service/main/product/goods'

import AppMessage from '@/components/common/app-message'

const goodsModule: Module<IGoodsModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      entireCategoryList: [],
      goodsList: [],
      goodsCount: 0
    }
  },
  getters: {
    [CommonGetterTypes.PAGE_DATA](state) {
      return state.goodsList
    },
    [CommonGetterTypes.PAGE_DATA_TOTAL](state) {
      return state.goodsCount
    }
  },
  mutations: {
    [MutationTypes.SET_ENTIRE_CATEGORY_LIST](state, entireCategoryList: ICategory[]) {
      state.entireCategoryList = entireCategoryList
    },
    [CommonMutationTypes.SET_PAGE_DATA](state, goodsList: IGoods[]) {
      state.goodsList = goodsList
    },
    [CommonMutationTypes.SET_PAGE_DATA_TOTAL](state, goodsCount: number) {
      state.goodsCount = goodsCount
    }
  },
  actions: {
    async [ActionTypes.GET_ENTIRE_CATEGORY_LIST]({ commit }, queryInfo: IPagination) {
      try {
        const { code, data } = await api_getEntireCategoryList(queryInfo)
        if (code === 0) {
          commit(MutationTypes.SET_ENTIRE_CATEGORY_LIST, data.list)
        } else {
          return Promise.reject(typeof data === 'string' ? data : '获取类别列表失败')
        }
      } catch {
        return Promise.reject('获取类别列表失败')
      }
    },
    async [CommonActionTypes.QUERY_PAGE_DATA]({ commit }, queryInfo: IPagination & IGoods) {
      try {
        const { code, data } = await api_queryGoodsList(queryInfo)
        if (code === 0) {
          commit(CommonMutationTypes.SET_PAGE_DATA, data.list)
          commit(CommonMutationTypes.SET_PAGE_DATA_TOTAL, data.totalCount)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '检索商品列表失败')
        }
      } catch {
        return AppMessage.error('检索商品列表失败')
      }
    },
    async [CommonActionTypes.CREATE_PAGE_DATA](context, goods: IGoods) {
      try {
        const { code, data } = await api_createGoods(goods)
        if (code === 0) {
          return AppMessage.success('新建商品成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '新建商品失败')
        }
      } catch {
        return AppMessage.error('新建商品失败')
      }
    },
    async [CommonActionTypes.UPDATE_PAGE_DATA](context, goods: IGoods) {
      try {
        const reqData = {
          name: goods.name,
          oldPrice: goods.oldPrice,
          newPrice: goods.newPrice,
          desc: goods.desc,
          status: goods.status,
          imgUrl: goods.imgUrl,
          inventoryCount: goods.inventoryCount,
          saleCount: goods.saleCount,
          favorCount: goods.favorCount,
          address: goods.address,
          categoryId: goods.categoryId
        }
        const { code, data } = await api_updateGoods(goods.id, reqData as IGoods)
        if (code === 0) {
          return AppMessage.success('编辑商品成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '编辑商品失败')
        }
      } catch {
        return AppMessage.error('编辑商品失败')
      }
    },
    async [CommonActionTypes.DELETE_PAGE_DATA](context, goods: IGoods) {
      try {
        const { code, data } = await api_deleteGoods(goods.id)
        if (code === 0) {
          return AppMessage.success('删除商品成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '删除商品失败')
        }
      } catch {
        return AppMessage.error('删除商品失败')
      }
    }
  }
}

export default goodsModule
