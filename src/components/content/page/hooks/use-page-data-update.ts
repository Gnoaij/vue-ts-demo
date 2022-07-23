import { ref } from 'vue'

import { useStore } from '@/store'
import { CommonActionTypes } from '@/store/types'

import type PageModal from '../page-modal'

import AppLoading from '@/components/common/app-loading'

function usePageDataUpdate(namespace: string) {
  const store = useStore()

  const pageModalRef_update = ref<InstanceType<typeof PageModal>>()

  const openPageModal_update = (row: any) => {
    pageModalRef_update.value?.setIsActive(true)
    pageModalRef_update.value?.setModel(row)
  }

  const updatePageData = async () => {
    try {
      const model = pageModalRef_update.value?.getModel()
      await AppLoading(() =>
        store.dispatch(`${namespace}/${CommonActionTypes.UPDATE_PAGE_DATA}`, { ...model })
      )
      pageModalRef_update.value?.setIsActive(false)
      pageModalRef_update.value?.resetModel()
      return Promise.resolve()
    } catch {
      return Promise.reject()
    }
  }

  return { pageModalRef_update, openPageModal_update, updatePageData }
}

export default usePageDataUpdate
