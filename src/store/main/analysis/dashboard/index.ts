import { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IDashboardModuleState } from './types'
import { MutationTypes, ActionTypes } from './types'

import type {
  IGoodsCategoryCount,
  IGoodsCategorySale,
  IGoodsCategoryFavor,
  IGoodsAddressSale,
  IGoodsAmountList
} from '@/service/main/analysis/dashboard/types'
import {
  api_getGoodsCategoryCount,
  api_getGoodsCategorySale,
  api_getGoodsCategoryFavor,
  api_getGoodsAddressSale,
  api_getGoodsAmountList
} from '@/service/main/analysis/dashboard'

import AppMessage from '@/components/common/app-message'

const dashboardModule: Module<IDashboardModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      goodsAddressSale: [],
      goodsAmountList: []
    }
  },
  mutations: {
    [MutationTypes.SET_GOODS_CATEGORY_COUNT](state, goodsCategoryCount: IGoodsCategoryCount[]) {
      state.goodsCategoryCount = goodsCategoryCount
    },
    [MutationTypes.SET_GOODS_CATEGORY_SALE](state, goodsCategorySale: IGoodsCategorySale[]) {
      state.goodsCategorySale = goodsCategorySale
    },
    [MutationTypes.SET_GOODS_CATEGORY_FAVOR](state, goodsCategoryFavor: IGoodsCategoryFavor[]) {
      state.goodsCategoryFavor = goodsCategoryFavor
    },
    [MutationTypes.SET_GOODS_ADDRESS_SALE](state, goodsAddressSale: IGoodsAddressSale[]) {
      state.goodsAddressSale = goodsAddressSale
    },
    [MutationTypes.SET_GOODS_AMOUNT_LIST](state, goodsAmountList: IGoodsAmountList[]) {
      state.goodsAmountList = goodsAmountList
    }
  },
  actions: {
    async [ActionTypes.GET_GOODS_CATEGORY_COUNT]({ commit }) {
      try {
        const { code, data } = await api_getGoodsCategoryCount()
        if (code === 0) {
          commit(MutationTypes.SET_GOODS_CATEGORY_COUNT, data)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '获取商品分类数量失败')
        }
      } catch {
        return AppMessage.error('获取商品分类数量失败')
      }
    },
    async [ActionTypes.GET_GOODS_CATEGORY_SALE]({ commit }) {
      try {
        const { code, data } = await api_getGoodsCategorySale()
        if (code === 0) {
          commit(MutationTypes.SET_GOODS_CATEGORY_SALE, data)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '获取商品分类销量失败')
        }
      } catch {
        return AppMessage.error('获取商品分类销量失败')
      }
    },
    async [ActionTypes.GET_GOODS_CATEGORY_FAVOR]({ commit }) {
      try {
        const { code, data } = await api_getGoodsCategoryFavor()
        if (code === 0) {
          commit(MutationTypes.SET_GOODS_CATEGORY_FAVOR, data)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '获取商品分类收藏失败')
        }
      } catch {
        return AppMessage.error('获取商品分类收藏失败')
      }
    },
    async [ActionTypes.GET_GOODS_ADDRESS_SALE]({ commit }) {
      try {
        const { code, data } = await api_getGoodsAddressSale()
        if (code === 0) {
          commit(MutationTypes.SET_GOODS_ADDRESS_SALE, data)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '获取商品城市销量失败')
        }
      } catch {
        return AppMessage.error('获取商品城市销量失败')
      }
    },
    async [ActionTypes.GET_GOODS_AMOUNT_LIST]({ commit }) {
      try {
        const { code, data } = await api_getGoodsAmountList()
        if (code === 0) {
          commit(MutationTypes.SET_GOODS_AMOUNT_LIST, data)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '获取商品数据统计失败')
        }
      } catch {
        return AppMessage.error('获取商品数据统计失败')
      }
    }
  }
}

export default dashboardModule
