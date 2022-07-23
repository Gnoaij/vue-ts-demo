<template>
  <div class="user">
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
      <template #enable-column="slotProps">
        <el-tag v-if="slotProps.row?.enable === 1" type="success">启用</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
      <template #department-column="slotProps">
        <base-cell
          :config="{ key: 'id', value: 'name' }"
          :empty-text="emptyText_d"
          :is-loading="isLoading_d"
          :data-list="entireDepartmentList"
          :target-key="slotProps.row?.departmentId"
          @empty-click="loadEntireDepartmentList"
        />
      </template>
      <template #role-column="slotProps">
        <base-cell
          :config="{ key: 'id', value: 'name' }"
          :empty-text="emptyText_r"
          :is-loading="isLoading_r"
          :data-list="entireRoleList"
          :target-key="slotProps.row?.roleId"
          @empty-click="loadEntireRoleList"
        />
      </template>
      <!-- page-search slots -->
      <!-- page-modal-create slots -->
      <!-- page-modal-update slots -->
      <template #department-select="slotProps">
        <base-select
          :config="{
            key: 'id',
            label: 'name',
            value: 'id',
            placeholder: '请选择部门',
            clearable: true
          }"
          :empty-text="emptyText_d"
          :is-loading="isLoading_d"
          :options="entireDepartmentList"
          :model-value="slotProps.modelValue ?? ''"
          @change="slotProps.setModelValue"
          @empty-click="loadEntireDepartmentList"
        />
      </template>
      <template #role-select="slotProps">
        <base-select
          :config="{
            key: 'id',
            label: 'name',
            value: 'id',
            placeholder: '请选择角色',
            clearable: true
          }"
          :empty-text="emptyText_r"
          :is-loading="isLoading_r"
          :options="entireRoleList"
          :model-value="slotProps.modelValue ?? ''"
          @change="slotProps.setModelValue"
          @empty-click="loadEntireRoleList"
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
import { ActionTypes } from '@/store/main/system/user/types'

import type { IPagination } from '@/service/types'

import usePagePermission from '@/components/content/page/hooks/use-page-permission'

import BaseSelect from '@/components/common/base-select'
import BaseCell from '@/components/common/base-cell'

export default defineComponent({
  name: 'User',
  components: {
    PageContainer,
    BaseSelect,
    BaseCell
  },
  setup() {
    const namespace = 'mainModule/systemModule/userModule'

    const store = useStore()

    const entireDepartmentList = computed(
      () => store.state.mainModule.systemModule.userModule.entireDepartmentList
    )

    const entireRoleList = computed(
      () => store.state.mainModule.systemModule.userModule.entireRoleList
    )

    const emptyText_d = ref('点击加载')
    const isLoading_d = ref(false)

    const emptyText_r = ref('点击加载')
    const isLoading_r = ref(false)

    const queryInfo: IPagination = {
      offset: 0,
      size: 1000
    }

    const loadEntireDepartmentList = async () => {
      if (!isLoading_d.value) {
        try {
          emptyText_d.value = '加载中'
          isLoading_d.value = true
          await store.dispatch(`${namespace}/${ActionTypes.GET_ENTIRE_DEPARTMENT_LIST}`, queryInfo)
          emptyText_d.value = '无数据，点击重新加载'
          isLoading_d.value = false
        } catch {
          emptyText_d.value = '加载失败，点击重新加载'
          isLoading_d.value = false
        }
      }
    }

    const loadEntireRoleList = async () => {
      if (!isLoading_r.value) {
        try {
          emptyText_r.value = '加载中'
          isLoading_r.value = true
          await store.dispatch(`${namespace}/${ActionTypes.GET_ENTIRE_ROLE_LIST}`, queryInfo)
          emptyText_r.value = '无数据，点击重新加载'
          isLoading_r.value = false
        } catch {
          emptyText_r.value = '加载失败，点击重新加载'
          isLoading_r.value = false
        }
      }
    }

    const permission = usePagePermission()

    if (permission.query) {
      loadEntireDepartmentList()
      loadEntireRoleList()
    }

    return {
      namespace,
      pageSearchConfig,
      pageContentConfig,
      pageModalConfig_create,
      pageModalConfig_update,
      entireDepartmentList,
      entireRoleList,
      emptyText_d,
      isLoading_d,
      emptyText_r,
      isLoading_r,
      loadEntireDepartmentList,
      loadEntireRoleList
    }
  }
})
</script>
