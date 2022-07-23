import type { IPageContentConfig } from '@/components/content/page/page-content'

const pageContentConfig: IPageContentConfig = {
  title: '类别列表',
  createButtonText: '新建类别',
  baseTableConfig: {
    align: 'center',
    border: true,
    showOverflowTooltip: true,
    dataColumns: [
      {
        field: 'name',
        label: '名称',
        minWidth: '120px'
      },
      {
        field: 'createAt',
        label: '创建时间',
        minWidth: '160px',
        slotName: 'createAt-column'
      },
      {
        field: 'updateAt',
        label: '更新时间',
        minWidth: '160px',
        slotName: 'updateAt-column'
      }
    ],
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
