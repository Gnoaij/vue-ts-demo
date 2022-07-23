import { computed, ref } from 'vue'

import { useStore } from '@/store'
import { CommonActionTypes } from '@/store/types'

import type PageSearch from '../page-search'
import type PageContent from '../page-content'

function usePageDataQuery(namespace: string) {
  const store = useStore()

  const pageSearchRef = ref<InstanceType<typeof PageSearch>>()
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const queryInfo = computed(() => {
    const model = pageSearchRef.value?.getModel()
    const pageSize = pageContentRef.value?.getPageSize()
    const currentPage = pageContentRef.value?.getCurrentPage()
    const _queryInfo = { ...model }
    if (pageSize && currentPage) {
      _queryInfo.offset = pageSize * (currentPage - 1)
      _queryInfo.size = pageSize
    }
    return _queryInfo
  })

  const queryPageData = async () => {
    try {
      pageContentRef.value?.setIsLoading(true)
      await store.dispatch(`${namespace}/${CommonActionTypes.QUERY_PAGE_DATA}`, {
        ...queryInfo.value
      })
      pageContentRef.value?.setIsLoading(false)
      return Promise.resolve()
    } catch {
      pageContentRef.value?.setIsLoading(false)
      return Promise.reject()
    }
  }

  return { pageSearchRef, pageContentRef, queryPageData }
}

export default usePageDataQuery
