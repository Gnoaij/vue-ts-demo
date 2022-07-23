import request from '@/service'

import type { IResponse } from '@/service/types'
import type { IAccount, ICertificate } from './types'

function api_accountLogin(account: IAccount) {
  return request.post<IResponse<ICertificate>>('/login', { data: account })
}

function api_authorizationTest() {
  return request.get<string>('/test')
}

export { api_accountLogin, api_authorizationTest }
