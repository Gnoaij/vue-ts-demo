interface IGoodsCategoryCount {
  id: number
  name: string
  goodsCount: number
}

interface IGoodsCategorySale {
  id: number
  name: string
  goodsCount: number
}

interface IGoodsCategoryFavor {
  id: number
  name: string
  goodsFavor: number
}

interface IGoodsAddressSale {
  address: string
  count: number
}

interface IGoodsAmountList {
  amount: string
  title: string
  tips: string
  subtitle: string
  number1: number
  number2: number
}

export {
  IGoodsCategoryCount,
  IGoodsCategorySale,
  IGoodsCategoryFavor,
  IGoodsAddressSale,
  IGoodsAmountList
}
