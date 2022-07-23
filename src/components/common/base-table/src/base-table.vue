<template>
  <div class="base-table">
    <!-- header -->
    <div class="base-table-header">
      <slot name="base-table-header"></slot>
    </div>
    <!-- content -->
    <div class="base-table-content">
      <el-table
        :data="data"
        :border="config.border"
        :row-key="config.childrenProps?.rowKey"
        :tree-props="config.childrenProps?.treeProps"
        :element-loading-text="loadingText"
        v-loading="isLoading"
      >
        <!-- expand -->
        <template v-if="config.expandColumn">
          <el-table-column
            type="expand"
            v-bind="{
              ...config.expandColumn,
              align: config.expandColumn?.align ?? config.align
            }"
          >
            <template #default="slotProps">
              <slot name="base-table-expand" :row="slotProps.row"></slot>
            </template>
          </el-table-column>
        </template>
        <!-- index -->
        <template v-if="config.indexColumn">
          <el-table-column
            type="index"
            v-bind="{
              ...config.indexColumn,
              align: config.indexColumn?.align ?? config.align
            }"
            :index="pageSize * (currentPage - 1) + 1"
          />
        </template>
        <!-- data -->
        <template v-for="dataColumn in config.dataColumns" :key="dataColumn.field">
          <el-table-column
            :label="dataColumn.label"
            :width="dataColumn.width"
            :minWidth="dataColumn.minWidth"
            :align="dataColumn.align ?? config.align"
            :fixed="dataColumn.fixed"
            :prop="dataColumn.field"
            :show-overflow-tooltip="dataColumn.showOverflowTooltip ?? config.showOverflowTooltip"
          >
            <template v-if="dataColumn.slotName" #default="slotProps">
              <slot :name="dataColumn.slotName" :row="slotProps.row">
                {{ slotProps.row[dataColumn.field] }}
              </slot>
            </template>
          </el-table-column>
        </template>
        <!-- operation -->
        <template v-if="config.operationColumn">
          <el-table-column
            v-bind="{
              ...config.operationColumn,
              align: config.operationColumn?.align ?? config.align
            }"
          >
            <template #default="slotProps">
              <slot name="base-table-operation" :row="slotProps.row"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- footer -->
    <div class="base-table-footer">
      <!-- pagination -->
      <template v-if="config.pagination">
        <el-pagination
          class="base-table-footer-pagination"
          :layout="config.pagination?.layout?.join(',')"
          :disabled="isLoading"
          :page-sizes="config.pagination?.pageSizes"
          :total="dataTotal"
          :page-size="pageSize"
          :current-page="currentPage"
          @update:page-size="$emit('update:page-size', $event)"
          @update:current-page="$emit('update:current-page', $event)"
        >
        </el-pagination>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import type { IBaseTableConfig } from './base-table.type'

export default defineComponent({
  name: 'BaseTable',
  props: {
    config: {
      type: Object as PropType<IBaseTableConfig>,
      required: true
    },
    loadingText: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true
    },
    dataTotal: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  emits: ['update:page-size', 'update:current-page']
})
</script>

<style lang="less" scoped>
.base-table {
  padding: 20px;
  background-color: #fff;

  .base-table-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .base-table-footer-pagination {
      margin-top: 10px;
    }
  }
}
</style>
