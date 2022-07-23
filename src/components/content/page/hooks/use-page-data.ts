import { computed } from 'vue'

import { useStore } from '@/store'
import { CommonGetterTypes } from '@/store/types'

function usePageData<T = any, S = any>(namespace: string) {
  const store = useStore()

  const pageData = computed<T>(
    () => store.getters[`${namespace}/${CommonGetterTypes.PAGE_DATA}`] ?? []
  )

  const pageDataTotal = computed<S>(
    () => store.getters[`${namespace}/${CommonGetterTypes.PAGE_DATA_TOTAL}`] ?? 0
  )

  return { pageData, pageDataTotal }
}

export default usePageData
