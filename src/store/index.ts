import type { InjectionKey } from 'vue'

import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'

import type { IRootState } from './types'

import loginModule from './login'
import mainModule from './main'

const store = createStore<IRootState>({
  modules: {
    loginModule,
    mainModule
  }
})

const key: InjectionKey<Store<IRootState>> = Symbol('vuex-key')

function useStore() {
  return baseUseStore(key)
}

export { store, key, useStore }
