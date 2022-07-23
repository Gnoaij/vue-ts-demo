import type { IUser, IMenu } from '@/service/main/types'

interface IMainModuleState {
  user: IUser
  routeMenu: IMenu[]
}

enum MutationTypes {
  SET_USER = 'SET_USER',
  SET_ROUTE_MENU = 'SET_ROUTE_MENU'
}

enum ActionTypes {
  GET_USER = 'GET_USER',
  GET_ROUTE_MENU = 'GET_ROUTE_MENU'
}

export { IMainModuleState, MutationTypes, ActionTypes }
