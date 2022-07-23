interface IMenu {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  parentId: number
  permission: string
  children: IMenu[]
}

interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: IMenu[]
  tiledMenuIdList: number[]
}

export { IMenu, IRole }
