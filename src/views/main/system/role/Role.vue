<template>
  <div class="role">
    <page-container
      :namespace="namespace"
      :page-search-config="pageSearchConfig"
      :page-content-config="pageContentConfig"
      :page-modal-config_create="pageModalConfig_create"
      :page-modal-config_update="pageModalConfig_update"
    >
      <!-- page-content slots -->
      <template #createAt-column="slotProps">
        <span v-utc-to-local>{{ slotProps.row?.createAt }}</span>
      </template>
      <template #updateAt-column="slotProps">
        <span v-utc-to-local>{{ slotProps.row?.updateAt }}</span>
      </template>
      <template #page-content-expand="slotProps">
        <div class="page-content-expand-slot align-left">
          <span class="label">权限</span>
          <el-tree
            :data="slotProps.row?.menuList"
            :props="{ label: 'name', children: 'children' }"
          />
        </div>
      </template>
      <!-- page-modal-create slots -->
      <!-- page-modal-update slots -->
      <template #menu-tree="slotProps">
        <base-tree
          :config="{ key: 'id', label: 'name', children: 'children' }"
          :empty-text="emptyText"
          :is-loading="isLoading"
          :dataList="entireMenuList"
          :checkedKeys="slotProps.modelValue"
          @check="slotProps.setModelValue"
          @empty-click="loadEntireMenuList"
        />
      </template>
    </page-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import pageSearchConfig from './config/page-search.config'
import pageContentConfig from './config/page-content.config'
import pageModalConfig_create from './config/page-modal.create.config'
import pageModalConfig_update from './config/page-modal.update.config'

import PageContainer from '@/components/content/page/page-container'

import { useStore } from '@/store'
import { ActionTypes } from '@/store/main/system/role/types'

import usePagePermission from '@/components/content/page/hooks/use-page-permission'

import BaseTree from '@/components/common/base-tree'

export default defineComponent({
  name: 'Role',
  components: {
    PageContainer,
    BaseTree
  },
  setup() {
    const namespace = 'mainModule/systemModule/roleModule'

    const store = useStore()

    const entireMenuList = computed(
      () => store.state.mainModule.systemModule.roleModule.entireMenuList
    )

    const emptyText = ref('点击加载')
    const isLoading = ref(false)

    const loadEntireMenuList = async () => {
      if (!isLoading.value) {
        try {
          emptyText.value = '加载中'
          isLoading.value = true
          await store.dispatch(`${namespace}/${ActionTypes.GET_ENTIRE_MENU_LIST}`)
          emptyText.value = '无数据，点击重新加载'
          isLoading.value = false
        } catch {
          emptyText.value = '加载失败，点击重新加载'
          isLoading.value = false
        }
      }
    }

    const permission = usePagePermission()

    if (permission.query) {
      loadEntireMenuList()
    }

    return {
      namespace,
      pageSearchConfig,
      pageContentConfig,
      pageModalConfig_create,
      pageModalConfig_update,
      entireMenuList,
      emptyText,
      isLoading,
      loadEntireMenuList
    }
  }
})
</script>

<style lang="less" scoped>
.role {
  .page-content-expand-slot {
    .label {
      margin-right: 10px;
      font-size: 16px;
      font-weight: 600;
      color: #99a9bf;
    }

    .el-tree {
      :deep(.el-tree__empty-block) {
        min-height: 0;

        .el-tree__empty-text {
          position: static;
          left: 0;
          top: 0;
          transform: none;
        }
      }
    }
  }
}
</style>
