import type { ILoginModuleState } from './login/types'

import type { IMainModuleState } from './main/types'

import type { IAnalysisModuleState } from './main/analysis/types'
import type { IDashboardModuleState } from './main/analysis/dashboard/types'

import type { IProductModuleState } from './main/product/types'
import type { ICategoryModuleState } from './main/product/category/types'
import type { IGoodsModuleState } from './main/product/goods/types'

import type { ISystemModuleState } from './main/system/types'
import type { IDepartmentModuleState } from './main/system/department/types'
import type { IMenuModuleState } from './main/system/menu/types'
import type { IRoleModuleState } from './main/system/role/types'
import type { IUserModuleState } from './main/system/user/types'

import type { IStoryModuleState } from './main/story/types'

interface IRootState {
  loginModule: ILoginModuleState
  mainModule: IMainModuleState & {
    analysisModule: IAnalysisModuleState & {
      dashboardModule: IDashboardModuleState
    }
    productModule: IProductModuleState & {
      categoryModule: ICategoryModuleState
      goodsModule: IGoodsModuleState
    }
    systemModule: ISystemModuleState & {
      departmentModule: IDepartmentModuleState
      menuModule: IMenuModuleState
      roleModule: IRoleModuleState
      userModule: IUserModuleState
    }
    storyModule: IStoryModuleState
  }
}

enum CommonGetterTypes {
  PAGE_DATA = 'PAGE_DATA',
  PAGE_DATA_TOTAL = 'PAGE_DATA_TOTAL'
}

enum CommonMutationTypes {
  SET_PAGE_DATA = 'SET_PAGE_DATA',
  SET_PAGE_DATA_TOTAL = 'SET_PAGE_DATA_TOTAL'
}

enum CommonActionTypes {
  QUERY_PAGE_DATA = 'QUERY_PAGE_DATA',
  CREATE_PAGE_DATA = 'CREATE_PAGE_DATA',
  UPDATE_PAGE_DATA = 'UPDATE_PAGE_DATA',
  DELETE_PAGE_DATA = 'DELETE_PAGE_DATA'
}

export { IRootState, CommonGetterTypes, CommonMutationTypes, CommonActionTypes }
