import { useStore } from '@/store'
import { CommonActionTypes } from '@/store/types'

import AppLoading from '@/components/common/app-loading'

function usePageDataDelete(namespace: string) {
  const store = useStore()

  const deletePageData = async (row: any) => {
    try {
      await AppLoading(() =>
        store.dispatch(`${namespace}/${CommonActionTypes.DELETE_PAGE_DATA}`, { ...row })
      )
      return Promise.resolve()
    } catch {
      return Promise.reject()
    }
  }

  return { deletePageData }
}

export default usePageDataDelete
