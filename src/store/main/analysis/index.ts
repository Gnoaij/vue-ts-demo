import { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IAnalysisModuleState } from './types'

import dashboardModule from './dashboard'

const analysisModule: Module<IAnalysisModuleState, IRootState> = {
  namespaced: true,
  modules: {
    dashboardModule
  }
}

export default analysisModule
