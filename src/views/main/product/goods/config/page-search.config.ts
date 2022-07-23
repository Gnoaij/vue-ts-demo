import type { IPageSearchConfig } from '@/components/content/page/page-search'
import { ItemTypes } from '@/components/content/page/page-search'

const pageSearchConfig: IPageSearchConfig = {
  title: '商品检索',
  baseFormConfig: {
    labelWidth: '80px',
    itemStyle: {
      margin: 0,
      padding: '10px'
    },
    itemLayout: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 6,
      xl: 6
    },
    items: [
      {
        type: ItemTypes.TEXT,
        field: 'name',
        label: '名称',
        layout: {
          xs: 24,
          sm: 24,
          md: 12,
          lg: 12,
          xl: 12
        },
        [ItemTypes.TEXT]: {
          placeholder: '请输入名称',
          clearable: true
        }
      },
      {
        type: ItemTypes.TEXT,
        field: 'address',
        label: '地址',
        layout: {
          xs: 24,
          sm: 24,
          md: 12,
          lg: 12,
          xl: 12
        },
        [ItemTypes.TEXT]: {
          placeholder: '请输入地址',
          clearable: true
        }
      },
      {
        type: ItemTypes.TEXT,
        field: 'desc',
        label: '简介',
        layout: {
          xs: 24,
          sm: 24,
          md: 24,
          lg: 12,
          xl: 12
        },
        [ItemTypes.TEXT]: {
          placeholder: '请输入简介',
          clearable: true
        }
      },
      {
        type: ItemTypes.CUSTOM,
        field: 'categoryId',
        label: '类别',
        [ItemTypes.CUSTOM]: {
          slotName: 'category-select'
        }
      },
      {
        type: ItemTypes.SELECT,
        field: 'status',
        label: '状态',
        [ItemTypes.SELECT]: {
          placeholder: '请选择状态',
          clearable: true,
          options: [
            {
              label: '上架',
              value: 1
            },
            {
              label: '下架',
              value: 0
            }
          ]
        }
      },
      {
        type: ItemTypes.NUMBER,
        field: 'oldPrice',
        label: '原价格',
        [ItemTypes.NUMBER]: {
          placeholder: '请输入原价格',
          clearable: true
        }
      },
      {
        type: ItemTypes.NUMBER,
        field: 'newPrice',
        label: '现价格',
        [ItemTypes.NUMBER]: {
          placeholder: '请输入现价格',
          clearable: true
        }
      },
      {
        type: ItemTypes.NUMBER,
        field: 'saleCount',
        label: '销售量',
        [ItemTypes.NUMBER]: {
          placeholder: '请输入销售量',
          clearable: true
        }
      },
      {
        type: ItemTypes.NUMBER,
        field: 'inventoryCount',
        label: '库存量',
        [ItemTypes.NUMBER]: {
          placeholder: '请输入库存量',
          clearable: true
        }
      },
      {
        type: ItemTypes.NUMBER,
        field: 'favorCount',
        label: '收藏量',
        [ItemTypes.NUMBER]: {
          placeholder: '请输入收藏量',
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
