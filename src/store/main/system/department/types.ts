import type { IDepartment } from '@/service/main/system/department/types'

interface IDepartmentModuleState {
  departmentList: IDepartment[]
  departmentCount: number
}

export { IDepartmentModuleState }
