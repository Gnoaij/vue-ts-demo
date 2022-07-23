import type { IBaseFormConfig } from '@/components/common/base-form'
import { ItemTypes } from '@/components/common/base-form'

interface IPageSearchConfig {
  title?: string
  queryButtonText?: string
  resetButtonText?: string
  baseFormConfig: IBaseFormConfig
  defaultModel?: any
}

export { ItemTypes, IPageSearchConfig }
