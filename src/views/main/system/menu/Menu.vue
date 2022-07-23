<template>
  <div class="menu">
    <page-container :namespace="namespace" :page-content-config="pageContentConfig">
      <!-- page-content slots -->
      <template #type-column="slotProps">
        <el-tag v-if="slotProps.row?.type === 1">一级</el-tag>
        <el-tag v-else-if="slotProps.row?.type === 2" type="success">二级</el-tag>
        <el-tag v-else-if="slotProps.row?.type === 3" type="warning">三级</el-tag>
      </template>
      <template #createAt-column="slotProps">
        <span v-utc-to-local>{{ slotProps.row?.createAt }}</span>
      </template>
      <template #updateAt-column="slotProps">
        <span v-utc-to-local>{{ slotProps.row?.updateAt }}</span>
      </template>
    </page-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageContentConfig from './config/page-content.config'

import PageContainer from '@/components/content/page/page-container'

import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Menu',
  components: {
    PageContainer
  },
  setup() {
    const namespace = 'mainModule/systemModule/menuModule'

    const route = useRoute()

    if (route.meta?.permission) {
      route.meta.permission = ['system:menu:query']
    }

    return {
      namespace,
      pageContentConfig
    }
  }
})
</script>
