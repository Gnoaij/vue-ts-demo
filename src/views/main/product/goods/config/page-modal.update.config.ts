import type { IPageModalConfig } from '@/components/content/page/page-modal'
import { ItemTypes } from '@/components/content/page/page-modal'

import _rules from '@/constants/rules'

const pageModalConfig_update: IPageModalConfig = {
  title: '编辑商品',
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
        field: 'desc',
        label: '简介',
        [ItemTypes.TEXT]: {
          placeholder: '请输入简介',
          clearable: true
        }
      },
      {
        type: ItemTypes.TEXT,
        field: 'address',
        label: '地址',
        [ItemTypes.TEXT]: {
          placeholder: '请输入地址',
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
        type: ItemTypes.TEXT,
        field: 'imgUrl',
        label: '图片链接',
        [ItemTypes.TEXT]: {
          placeholder: '请输入图片链接',
          clearable: true
        }
      }
    ],
    rules: {
      name: _rules.required('名称不能为空'),
      desc: _rules.required('简介不能为空'),
      address: _rules.required('地址不能为空'),
      categoryId: _rules.required('类别不能为空'),
      status: _rules.required('状态不能为空'),
      oldPrice: _rules.required('原价格不能为空'),
      newPrice: _rules.required('现价格不能为空'),
      saleCount: _rules.required('销售量不能为空'),
      inventoryCount: _rules.required('库存量不能为空'),
      favorCount: _rules.required('收藏量不能为空'),
      imgUrl: _rules.required('图片链接不能为空')
    }
  }
}

export default pageModalConfig_update
