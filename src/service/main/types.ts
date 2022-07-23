interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updataAt: string
  role: {
    id: number
    name: string
    intro: string
    createAt: string
    updateAt: string
  }
  department: {
    id: number
    name: string
    parentId: number
    createAt: string
    updateAt: string
    leader: string
  }
}

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

export { IUser, IMenu }
