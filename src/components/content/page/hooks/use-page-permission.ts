import { reactive } from 'vue'
import { useRoute } from 'vue-router'

function usePagePermission() {
  const route = useRoute()
  const permission = (route.meta.permission as string[]) ?? []
  const raw = {
    query: permission.some((item) => item.indexOf('query') !== -1),
    create: permission.some((item) => item.indexOf('create') !== -1),
    update: permission.some((item) => item.indexOf('update') !== -1),
    delete: permission.some((item) => item.indexOf('delete') !== -1)
  }
  return reactive(raw)
}

export default usePagePermission
