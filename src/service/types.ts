interface IResponse<T = any> {
  code: number
  data: T
}

interface IPagination {
  offset: number
  size: number
}

interface IList<T = any> {
  list: T
  totalCount: number
}

export { IResponse, IPagination, IList }
