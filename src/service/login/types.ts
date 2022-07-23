interface IAccount {
  name: string
  password: string
}

interface ICertificate {
  id: number
  name: string
  token: string
}

export { IAccount, ICertificate }
