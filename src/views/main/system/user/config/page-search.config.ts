import type { IPageSearchConfig } from '@/components/content/page/page-search'
import { ItemTypes } from '@/components/content/page/page-search'

const pageSearchConfig: IPageSearchConfig = {
  title: '用户检索',
  baseFormConfig: {
    labelWidth: '80px',
    itemStyle: {
      margin: 0,
      padding: '10px'
    },
    itemLayout: {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 8,
      xl: 6
    },
    items: [
      {
        type: ItemTypes.TEXT,
        field: 'name',
        label: '用户名',
        [ItemTypes.TEXT]: {
          placeholder: '请输入用户名',
          clearable: true
        }
      },
      {
        type: ItemTypes.TEXT,
        field: 'realname',
        label: '真实姓名',
        [ItemTypes.TEXT]: {
          placeholder: '请输入真实姓名',
          clearable: true
        }
      },
      {
        type: ItemTypes.NUMBER,
        field: 'cellphone',
        label: '手机号',
        [ItemTypes.NUMBER]: {
          placeholder: '请输入手机号',
          clearable: true
        }
      },
      {
        type: ItemTypes.SELECT,
        field: 'enable',
        label: '状态',
        [ItemTypes.SELECT]: {
          placeholder: '请选择状态',
          clearable: true,
          options: [
            {
              label: '启用',
              value: 1
            },
            {
              label: '禁用',
              value: 0
            }
          ]
        }
      },
      {
        type: ItemTypes.CUSTOM,
        field: 'departmentId',
        label: '部门',
        [ItemTypes.CUSTOM]: {
          slotName: 'department-select'
        }
      },
      {
        type: ItemTypes.CUSTOM,
        field: 'roleId',
        label: '角色',
        [ItemTypes.CUSTOM]: {
          slotName: 'role-select'
        }
      },
      {
        field: 'createAt',
        label: '创建时间',
        type: ItemTypes.DATE_PICKER,
        [ItemTypes.DATE_PICKER]: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          unlinkPanels: true,
          clearable: true
        }
      }
    ]
  }
}

export default pageSearchConfig
