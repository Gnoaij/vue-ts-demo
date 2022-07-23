<template>
  <div class="page-content background-white">
    <base-table
      :config="config.baseTableConfig"
      :loading-text="config.loadingText ?? '加载中'"
      :is-loading="isLoading"
      :data="data"
      :data-total="dataTotal"
      :page-size="pageSize"
      :current-page="currentPage"
      @update:page-size="handlePageSizeUpdate"
      @update:current-page="handleCurrentPageUpdate"
    >
      <template #base-table-header>
        <div class="base-table-header-slot align-between">
          <h4 class="title-level-4">{{ config.title }}</h4>
          <el-button
            v-if="isShowCreateButton"
            class="el-icon-plus"
            type="primary"
            size="small"
            @click="handleCreateClick"
          >
            {{ config.createButtonText ?? '新建数据' }}
          </el-button>
        </div>
      </template>
      <template v-if="config.baseTableConfig.expandColumn" #base-table-expand="slotProps">
        <slot name="page-content-expand" :row="slotProps.row"></slot>
      </template>
      <template v-if="config.baseTableConfig.operationColumn" #base-table-operation="slotProps">
        <el-button
          v-if="isShowUpdateButton"
          class="el-icon-edit"
          type="text"
          size="mini"
          @click="handleUpdateClick(slotProps.row)"
        >
          {{ config.updateButtonText ?? '编辑' }}
        </el-button>
        <el-popconfirm
          v-if="isShowDeleteButton"
          icon="el-icon-info"
          iconColor="red"
          :title="config.deletePopconfirmText ?? '确定删除该行数据吗？'"
          :confirmButtonText="config.deleteConfirmButtonText ?? '确定'"
          :cancelButtonText="config.deleteCancelButtonText ?? '取消'"
          @confirm="handleDeleteClick(slotProps.row)"
        >
          <template #reference>
            <el-button class="el-icon-delete button-red" type="text" size="mini">
              {{ config.deleteButtonText ?? '删除' }}
            </el-button>
          </template>
        </el-popconfirm>
      </template>
      <template
        v-for="slotName in baseTable_data_slotNames"
        :key="slotName"
        #[slotName]="slotProps"
      >
        <slot :name="slotName" :row="slotProps.row"></slot>
      </template>
    </base-table>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

import type { IPageContentConfig } from './page-content.type'

import BaseTable from '@/components/common/base-table'

export default defineComponent({
  name: 'PageContent',
  components: {
    BaseTable
  },
  props: {
    config: {
      type: Object as PropType<IPageContentConfig>,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    dataTotal: {
      type: Number,
      default: 0
    },
    isShowCreateButton: {
      type: Boolean,
      default: true
    },
    isShowUpdateButton: {
      type: Boolean,
      default: true
    },
    isShowDeleteButton: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'page-content-create-click',
    'page-content-update-click',
    'page-content-delete-click',
    'page-content-page-size-change',
    'page-content-current-page-change'
  ],
  setup(props, { emit, expose }) {
    /**
     * base-table data slots
     */
    const baseTable_data_slotNames = props.config.baseTableConfig.dataColumns
      .filter((dataColumn) => dataColumn.slotName)
      .map((dataColumn) => dataColumn.slotName as string)

    /**
     * states
     */
    const isLoading = ref(false)
    const pageSize = ref(props.config.defaultPageSize ?? 10)
    const currentPage = ref(props.config.defaultCurrentPage ?? 1)

    /**
     * methods
     */
    const handleCreateClick = () => {
      emit('page-content-create-click')
    }

    const handleUpdateClick = (row: any) => {
      emit('page-content-update-click', row)
    }

    const handleDeleteClick = (row: any) => {
      emit('page-content-delete-click', row)
    }

    const handlePageSizeUpdate = (newPageSize: number) => {
      const oldPageSize = pageSize.value
      pageSize.value = newPageSize
      emit('page-content-page-size-change', newPageSize, oldPageSize)
    }

    const handleCurrentPageUpdate = (newCurrentPage: number) => {
      const oldCurrentPage = currentPage.value
      currentPage.value = newCurrentPage
      emit('page-content-current-page-change', newCurrentPage, oldCurrentPage)
    }

    /**
     * expose
     */
    const setIsLoading = (newStatus: boolean) => {
      isLoading.value = newStatus
    }

    const getPageSize = () => {
      return pageSize.value
    }

    const getCurrentPage = () => {
      return currentPage.value
    }

    const setPageSize = (newPageSize: number) => {
      pageSize.value = newPageSize
    }

    const setCurrentPage = (newCurrentPage: number) => {
      currentPage.value = newCurrentPage
    }

    expose({
      setIsLoading,
      getPageSize,
      getCurrentPage,
      setPageSize,
      setCurrentPage
    })

    return {
      baseTable_data_slotNames,
      isLoading,
      pageSize,
      currentPage,
      handleCreateClick,
      handleUpdateClick,
      handleDeleteClick,
      handlePageSizeUpdate,
      handleCurrentPageUpdate,
      setIsLoading,
      getPageSize,
      getCurrentPage,
      setPageSize,
      setCurrentPage
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  .base-table-header-slot {
    margin-bottom: 10px;
  }
}
</style>
