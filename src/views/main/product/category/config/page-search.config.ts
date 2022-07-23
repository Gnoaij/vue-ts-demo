import type { IPageSearchConfig } from '@/components/content/page/page-search'
import { ItemTypes } from '@/components/content/page/page-search'

const pageSearchConfig: IPageSearchConfig = {
  title: '类别检索',
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
        label: '名称',
        [ItemTypes.TEXT]: {
          placeholder: '请输入名称',
          clearable: true
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
