import { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { ISystemModuleState } from './types'

import departmentModule from './department'
import menuModule from './menu'
import roleModule from './role'
import userModule from './user'

const systemModule: Module<ISystemModuleState, IRootState> = {
  namespaced: true,
  modules: {
    departmentModule,
    menuModule,
    roleModule,
    userModule
  }
}

export default systemModule
