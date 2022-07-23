import type { IPageModalConfig } from '@/components/content/page/page-modal'
import { ItemTypes } from '@/components/content/page/page-modal'

import _rules from '@/constants/rules'

const pageModalConfig_create: IPageModalConfig = {
  title: '新建用户',
  baseFormConfig: {
    labelWidth: '80px',
    itemStyle: {
      margin: 0,
      padding: '10px 0'
    },
    itemLayout: {
      span: 24
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
        type: ItemTypes.PASSWORD,
        field: 'password',
        label: '密码',
        [ItemTypes.PASSWORD]: {
          placeholder: '请输入密码',
          showPassword: true,
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
      }
    ],
    rules: {
      name: [..._rules.username, ..._rules.required('用户名不能为空')],
      password: [..._rules.password, ..._rules.required('密码不能为空')],
      cellphone: [..._rules.cellphone, ..._rules.required('手机号不能为空')],
      enable: _rules.required('状态不能为空'),
      departmentId: _rules.required('部门不能为空'),
      roleId: _rules.required('角色不能为空')
    }
  }
}

export default pageModalConfig_create
