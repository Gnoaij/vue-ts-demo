import type { IPageContentConfig } from '@/components/content/page/page-content'

const pageContentConfig: IPageContentConfig = {
  title: '菜单列表',
  createButtonText: '新建菜单',
  baseTableConfig: {
    align: 'center',
    border: true,
    showOverflowTooltip: true,
    dataColumns: [
      {
        field: 'name',
        label: '名称',
        minWidth: '140px'
      },
      {
        field: 'type',
        label: '类型',
        minWidth: '80px',
        slotName: 'type-column'
      },
      {
        field: 'url',
        label: '路径',
        minWidth: '180px'
      },
      {
        field: 'icon',
        label: '图标',
        minWidth: '160px'
      },
      {
        field: 'permission',
        label: '权限',
        minWidth: '180px'
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
    childrenProps: {
      rowKey: 'id',
      treeProps: {
        children: 'children'
      }
    }
  }
}

export default pageContentConfig
