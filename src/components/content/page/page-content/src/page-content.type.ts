import type { IBaseTableConfig } from '@/components/common/base-table'

interface IPageContentConfig {
  title?: string
  loadingText?: string
  createButtonText?: string
  updateButtonText?: string
  deleteButtonText?: string
  deletePopconfirmText?: string
  deleteConfirmButtonText?: string
  deleteCancelButtonText?: string
  baseTableConfig: IBaseTableConfig
  defaultPageSize?: number
  defaultCurrentPage?: number
}

export { IPageContentConfig }
