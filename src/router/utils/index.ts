import type { RouteRecordRaw } from 'vue-router'
import router from '../index'

import type { IMenu } from '@/service/main/types'

interface IRouteMap {
  [path: string]: RouteRecordRaw
}

const routeMap: IRouteMap = {}

const routeModules = require.context('../routes', true, /index\.ts$/)

routeModules.keys().forEach((id) => {
  const path = id.match(/^\.(\S*)\/index\.ts$/)?.[1]
  if (!path) {
    return
  }
  const route: RouteRecordRaw = routeModules(id).default
  route.path = path
  route.name = path
  routeMap[path] = route
})

function getPermission(roleMenu: IMenu[]) {
  const permission: string[] = []
  roleMenu.filter((item) => {
    if (item.type === 3 && item.permission) {
      permission.push(item.permission)
    }
  })
  return permission
}

function mapRoleMenuToRouteMenu(roleMenu: IMenu[]) {
  const routeMenu: IMenu[] = []
  roleMenu.forEach((item) => {
    if ((item.type === 1 || item.type === 2) && item.url && routeMap[item.url]) {
      if (item.children) {
        item.children = mapRoleMenuToRouteMenu(item.children)
      }
      routeMenu.push(item)
    } else if (item.type === 3) {
      routeMenu.push(item)
    }
  })
  return routeMenu
}

function mapRoleMenuToRoutes(roleMenu: IMenu[]) {
  const routes: RouteRecordRaw[] = []
  roleMenu.forEach((item) => {
    if ((item.type === 1 || item.type === 2) && item.url && routeMap[item.url]) {
      const route = routeMap[item.url]
      route.meta = {
        ...route.meta,
        title: item.name
      }
      if (item.children) {
        route.meta.permission = getPermission(item.children)
        route.children = mapRoleMenuToRoutes(item.children)
      }
      routes.push(route)
    }
  })
  return routes
}

function addRoutes(routes: RouteRecordRaw[], parentRouteName?: string) {
  if (parentRouteName) {
    routes.forEach((item) => router.addRoute(parentRouteName, item))
  } else {
    routes.forEach((item) => router.addRoute(item))
  }
  return router.getRoutes()
}

export { mapRoleMenuToRouteMenu, mapRoleMenuToRoutes, addRoutes }
