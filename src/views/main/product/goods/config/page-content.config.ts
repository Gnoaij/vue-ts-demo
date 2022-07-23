import type { IPageContentConfig } from '@/components/content/page/page-content'

const pageContentConfig: IPageContentConfig = {
  title: '商品列表',
  createButtonText: '新建商品',
  baseTableConfig: {
    align: 'center',
    border: true,
    showOverflowTooltip: true,
    dataColumns: [
      {
        field: 'name',
        label: '名称',
        minWidth: '300px'
      },
      {
        field: 'categoryId',
        label: '类别',
        minWidth: '120px',
        slotName: 'category-column'
      },
      {
        field: 'status',
        label: '状态',
        minWidth: '80px',
        slotName: 'status-column'
      },
      {
        field: 'oldPrice',
        label: '原价格',
        minWidth: '80px',
        slotName: 'oldPrice-column'
      },
      {
        field: 'newPrice',
        label: '现价格',
        minWidth: '80px',
        slotName: 'newPrice-column'
      },
      {
        field: 'saleCount',
        label: '销售量',
        minWidth: '80px'
      },
      {
        field: 'inventoryCount',
        label: '库存量',
        minWidth: '80px'
      },
      {
        field: 'favorCount',
        label: '收藏量',
        minWidth: '80px'
      },
      {
        field: 'imgUrl',
        label: '图片',
        minWidth: '100px',
        slotName: 'image-column'
      }
    ],
    expandColumn: {
      minWidth: '60px'
    },
    indexColumn: {
      minWidth: '60px'
    },
    operationColumn: {
      label: '操作',
      minWidth: '120px'
    },
    pagination: {
      layout: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
      pageSizes: [10, 20, 30, 40, 50]
    }
  }
}

export default pageContentConfig
