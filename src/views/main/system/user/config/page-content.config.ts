import type { IPageContentConfig } from '@/components/content/page/page-content'

const pageContentConfig: IPageContentConfig = {
  title: '用户列表',
  createButtonText: '新建用户',
  baseTableConfig: {
    align: 'center',
    border: true,
    showOverflowTooltip: true,
    dataColumns: [
      {
        field: 'name',
        label: '用户名',
        minWidth: '120px'
      },
      {
        field: 'realname',
        label: '真实姓名',
        minWidth: '120px'
      },
      {
        field: 'cellphone',
        label: '手机号码',
        minWidth: '120px'
      },
      {
        field: 'enable',
        label: '状态',
        minWidth: '80px',
        slotName: 'enable-column'
      },
      {
        field: 'departmentId',
        label: '部门',
        minWidth: '120px',
        slotName: 'department-column'
      },
      {
        field: 'roleId',
        label: '角色',
        minWidth: '120px',
        slotName: 'role-column'
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
