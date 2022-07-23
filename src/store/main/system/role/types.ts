import type { IMenu, IRole } from '@/service/main/system/role/types'

interface IRoleModuleState {
  entireMenuList: IMenu[]
  roleList: IRole[]
  roleCount: number
}

enum MutationTypes {
  SET_ENTIRE_MENU_LIST = 'SET_ENTIRE_MENU_LIST'
}

enum ActionTypes {
  GET_ENTIRE_MENU_LIST = 'GET_ENTIRE_MENU_LIST'
}

export { IRoleModuleState, MutationTypes, ActionTypes }
