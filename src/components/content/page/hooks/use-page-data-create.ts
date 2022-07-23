import { ref } from 'vue'

import { useStore } from '@/store'
import { CommonActionTypes } from '@/store/types'

import type PageModal from '../page-modal'

import AppLoading from '@/components/common/app-loading'

function usePageDataCreate(namespace: string) {
  const store = useStore()

  const pageModalRef_create = ref<InstanceType<typeof PageModal>>()

  const openPageModal_create = () => {
    pageModalRef_create.value?.setIsActive(true)
  }

  const createPageData = async () => {
    try {
      const model = pageModalRef_create.value?.getModel()
      await AppLoading(() =>
        store.dispatch(`${namespace}/${CommonActionTypes.CREATE_PAGE_DATA}`, { ...model })
      )
      pageModalRef_create.value?.setIsActive(false)
      pageModalRef_create.value?.resetModel()
      return Promise.resolve()
    } catch {
      return Promise.reject()
    }
  }

  return { pageModalRef_create, openPageModal_create, createPageData }
}

export default usePageDataCreate
