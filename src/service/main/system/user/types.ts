interface IDepartment {
  id: number
  name: string
  parentId: number
  createAt: string
  updateAt: string
  leader: string
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

interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: IMenu[]
}

interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updataAt: string
}

export { IDepartment, IRole, IUser }
