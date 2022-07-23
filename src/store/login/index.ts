import type { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { ILoginModuleState } from './types'
import { ActionTypes } from './types'

import type { IAccount } from '@/service/login/types'
import { api_accountLogin, api_authorizationTest } from '@/service/login'

import storage from '@/utils/storage'

import AppMessage from '@/components/common/app-message'

const loginModule: Module<ILoginModuleState, IRootState> = {
  namespaced: true,
  actions: {
    async [ActionTypes.ACCOUNT_LOGIN](context, account: IAccount) {
      try {
        const { code, data } = await api_accountLogin(account)
        if (code === 0) {
          storage.setItem('userId', data.id)
          storage.setItem('token', data.token)
        } else {
          return AppMessage.error('登录失败，请重新登录')
        }
      } catch (error) {
        return AppMessage.error(error.response?.data ?? '登录失败，请重新登录')
      }
    },
    async [ActionTypes.AUTHORIZATION_TEST]() {
      try {
        const userId = storage.getItem('userId')
        const token = storage.getItem('token')
        if (userId && token) {
          await api_authorizationTest()
        } else {
          throw new Error()
        }
      } catch (error) {
        storage.removeItem('userId')
        storage.removeItem('token')
        return AppMessage.error('登录状态失效，请重新登录')
      }
    }
  }
}

export default loginModule
