type Align = 'center' | 'left' | 'right'
type Fixed = 'left' | 'right'
type layout = 'total' | 'sizes' | 'prev' | 'pager' | 'next' | 'jumper'

interface IBaseColumn {
  label?: string
  width?: string | number
  minWidth?: string | number
  align?: Align
  fixed?: Fixed
}

interface IDataColumn extends IBaseColumn {
  field: string
  showOverflowTooltip?: boolean
  slotName?: string
}

interface IPagination {
  layout?: layout[]
  pageSizes?: number[]
}

interface IChildrenProps {
  rowKey: string
  treeProps: {
    children: string
    hasChildren?: string
  }
}

interface IBaseTableConfig {
  align?: Align
  border?: boolean
  showOverflowTooltip?: boolean
  dataColumns: IDataColumn[]
  expandColumn?: IBaseColumn
  indexColumn?: IBaseColumn
  operationColumn?: IBaseColumn
  pagination?: IPagination
  childrenProps?: IChildrenProps
}

export { IBaseTableConfig }
