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

export { IMenu }
