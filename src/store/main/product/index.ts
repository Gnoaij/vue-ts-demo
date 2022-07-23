import { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IProductModuleState } from './types'

import categoryModule from './category'
import goodsModule from './goods'

const productModule: Module<IProductModuleState, IRootState> = {
  namespaced: true,
  modules: {
    categoryModule,
    goodsModule
  }
}

export default productModule
