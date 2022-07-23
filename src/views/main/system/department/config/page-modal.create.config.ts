import type { IPageModalConfig } from '@/components/content/page/page-modal'
import { ItemTypes } from '@/components/content/page/page-modal'

import _rules from '@/constants/rules'

const pageModalConfig_create: IPageModalConfig = {
  title: '新建部门',
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
        label: '名称',
        [ItemTypes.TEXT]: {
          placeholder: '请输入名称',
          clearable: true
        }
      },
      {
        type: ItemTypes.TEXT,
        field: 'leader',
        label: '领导',
        [ItemTypes.TEXT]: {
          placeholder: '请输入领导',
          clearable: true
        }
      }
    ],
    rules: {
      name: _rules.required('名称不能为空'),
      leader: _rules.required('领导不能为空')
    }
  }
}

export default pageModalConfig_create
