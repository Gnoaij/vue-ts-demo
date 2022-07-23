interface ICategory {
  id: number
  name: string
  createAt: string
  updateAt: string
}

interface IGoods {
  id: number
  name: string
  oldPrice: number
  newPrice: number
  desc: string
  status: number
  imgUrl: string
  inventoryCount: number
  saleCount: number
  favorCount: number
  address: string
  categoryId: number
  createAt: string
  updateAt: string
}

export { ICategory, IGoods }
