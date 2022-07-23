import type { IBaseFormConfig } from '@/components/common/base-form'
import { ItemTypes } from '@/components/common/base-form'

interface IPageModalConfig {
  title?: string
  width?: string | number
  center?: boolean
  destroyOnClose?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  baseFormConfig: IBaseFormConfig
  defaultModel?: any
}

export { ItemTypes, IPageModalConfig }
