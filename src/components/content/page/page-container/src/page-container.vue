<template>
  <div class="page-container">
    <template v-if="pageSearchConfig && pagePermission.query">
      <page-search
        :config="pageSearchConfig"
        @page-search-query-click="handlePageSearchQueryClick"
        ref="pageSearchRef"
      >
        <template
          v-for="slotName in pageSearch_custom_slotNames"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <slot
            :name="slotName"
            :model-value="slotProps.modelValue"
            :set-model-value="slotProps.setModelValue"
          ></slot>
        </template>
      </page-search>
    </template>
    <template v-if="pageContentConfig && pagePermission.query">
      <page-content
        :config="pageContentConfig"
        :data="pageData"
        :data-total="pageDataTotal"
        :is-show-create-button="pagePermission.create"
        :is-show-update-button="pagePermission.update"
        :is-show-delete-button="pagePermission.delete"
        @page-content-create-click="handlePageContentCreateClick"
        @page-content-update-click="handlePageContentUpdateClick"
        @page-content-delete-click="handlePageContentDeleteClick"
        @page-content-page-size-change="handlePageContentPageSizeChange"
        @page-content-current-page-change="handlePageContentCurrentPageChange"
        ref="pageContentRef"
      >
        <template
          v-if="pageContentConfig?.baseTableConfig.expandColumn"
          #page-content-expand="slotProps"
        >
          <slot name="page-content-expand" :row="slotProps.row"></slot>
        </template>
        <template
          v-for="slotName in pageContent_data_slotNames"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <slot :name="slotName" :row="slotProps.row"></slot>
        </template>
      </page-content>
    </template>
    <template v-if="pageModalConfig_create && pagePermission.query && pagePermission.create">
      <page-modal
        :config="pageModalConfig_create"
        @page-modal-confirm-click="handlePageModalConfirmClick_create"
        ref="pageModalRef_create"
      >
        <template
          v-for="slotName in pageModal_create_custom_slotNames"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <slot
            :name="slotName"
            :model-value="slotProps.modelValue"
            :set-model-value="slotProps.setModelValue"
          ></slot>
        </template>
      </page-modal>
    </template>
    <template v-if="pageModalConfig_update && pagePermission.query && pagePermission.update">
      <page-modal
        :config="pageModalConfig_update"
        @page-modal-confirm-click="handlePageModalConfirmClick_update"
        ref="pageModalRef_update"
      >
        <template
          v-for="slotName in pageModal_update_custom_slotNames"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <slot
            :name="slotName"
            :model-value="slotProps.modelValue"
            :set-model-value="slotProps.setModelValue"
          ></slot>
        </template>
      </page-modal>
    </template>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted } from 'vue'

import type { IPageSearchConfig } from '../../page-search/src/page-search.type'
import type { IPageContentConfig } from '../../page-content/src/page-content.type'
import type { IPageModalConfig } from '../../page-modal/src/page-modal.type'
import { ItemTypes } from '../../page-search/src/page-search.type'

import PageSearch from '../../page-search'
import PageContent from '../../page-content'
import PageModal from '../../page-modal'

import usePageData from '../../hooks/use-page-data'
import usePageDataQuery from '../../hooks/use-page-data-query'
import usePageDataCreate from '../../hooks/use-page-data-create'
import usePageDataUpdate from '../../hooks/use-page-data-update'
import usePageDataDelete from '../../hooks/use-page-data-delete'
import usePagePermission from '../../hooks/use-page-permission'

export default defineComponent({
  name: 'PageContainer',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  props: {
    namespace: {
      type: String,
      required: true
    },
    pageSearchConfig: {
      type: Object as PropType<IPageSearchConfig>
    },
    pageContentConfig: {
      type: Object as PropType<IPageContentConfig>
    },
    pageModalConfig_create: {
      type: Object as PropType<IPageModalConfig>
    },
    pageModalConfig_update: {
      type: Object as PropType<IPageModalConfig>
    }
  },
  setup(props) {
    /**
     * page permission
     */
    const pagePermission = usePagePermission()

    /**
     * slots
     */
    const pageSearch_custom_slotNames =
      props.pageSearchConfig && pagePermission.query
        ? props.pageSearchConfig.baseFormConfig.items
            .filter((item) => item.type === ItemTypes.CUSTOM && item[ItemTypes.CUSTOM]?.slotName)
            .map((item) => item[ItemTypes.CUSTOM]?.slotName as string)
        : []

    const pageContent_data_slotNames =
      props.pageContentConfig && pagePermission.query
        ? props.pageContentConfig.baseTableConfig.dataColumns
            .filter((dataColumn) => dataColumn.slotName)
            .map((dataColumn) => dataColumn.slotName as string)
        : []

    const pageModal_create_custom_slotNames =
      props.pageModalConfig_create && pagePermission.create
        ? props.pageModalConfig_create.baseFormConfig.items
            .filter((item) => item.type === ItemTypes.CUSTOM && item[ItemTypes.CUSTOM]?.slotName)
            .map((item) => item[ItemTypes.CUSTOM]?.slotName as string)
        : []

    const pageModal_update_custom_slotNames =
      props.pageModalConfig_update && pagePermission.update
        ? props.pageModalConfig_update.baseFormConfig.items
            .filter((item) => item.type === ItemTypes.CUSTOM && item[ItemTypes.CUSTOM]?.slotName)
            .map((item) => item[ItemTypes.CUSTOM]?.slotName as string)
        : []

    /**
     * hooks
     */
    const { pageData, pageDataTotal } = usePageData<any[], number>(props.namespace)

    const { pageSearchRef, pageContentRef, queryPageData } = usePageDataQuery(props.namespace)

    const { pageModalRef_create, openPageModal_create, createPageData } = usePageDataCreate(
      props.namespace
    )

    const { pageModalRef_update, openPageModal_update, updatePageData } = usePageDataUpdate(
      props.namespace
    )

    const { deletePageData } = usePageDataDelete(props.namespace)

    /**
     * methods
     */
    const handlePageSearchQueryClick = () => {
      if (pagePermission.query) {
        queryPageData()
      }
    }

    const handlePageContentCreateClick = () => {
      if (pagePermission.create) {
        openPageModal_create()
      }
    }

    const handlePageContentUpdateClick = (row: any) => {
      if (pagePermission.update) {
        openPageModal_update(row)
      }
    }

    const handlePageContentDeleteClick = (row: any) => {
      if (pagePermission.delete) {
        deletePageData(row).then(() => queryPageData())
      }
    }

    const handlePageContentPageSizeChange = (newPageSize: number, oldPageSize: number) => {
      if (pagePermission.query) {
        queryPageData().catch(() => pageContentRef.value?.setPageSize(oldPageSize))
      }
    }

    const handlePageContentCurrentPageChange = (newCurrentPage: number, oldCurrentPage: number) => {
      if (pagePermission.query) {
        queryPageData().catch(() => pageContentRef.value?.setCurrentPage(oldCurrentPage))
      }
    }

    const handlePageModalConfirmClick_create = () => {
      if (pagePermission.create) {
        createPageData().then(() => queryPageData())
      }
    }

    const handlePageModalConfirmClick_update = () => {
      if (pagePermission.update) {
        updatePageData().then(() => queryPageData())
      }
    }

    onMounted(() => {
      if (pagePermission.query) {
        queryPageData()
      }
    })

    return {
      pageSearch_custom_slotNames,
      pageContent_data_slotNames,
      pageModal_create_custom_slotNames,
      pageModal_update_custom_slotNames,
      pageSearchRef,
      pageContentRef,
      pageModalRef_create,
      pageModalRef_update,
      pageData,
      pageDataTotal,
      pagePermission,
      handlePageSearchQueryClick,
      handlePageContentCreateClick,
      handlePageContentUpdateClick,
      handlePageContentDeleteClick,
      handlePageContentPageSizeChange,
      handlePageContentCurrentPageChange,
      handlePageModalConfirmClick_create,
      handlePageModalConfirmClick_update
    }
  }
})
</script>
