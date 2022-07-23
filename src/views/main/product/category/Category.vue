<template>
  <div class="category">
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
    </page-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageSearchConfig from './config/page-search.config'
import pageContentConfig from './config/page-content.config'
import pageModalConfig_create from './config/page-modal.create.config'
import pageModalConfig_update from './config/page-modal.update.config'

import PageContainer from '@/components/content/page/page-container'

export default defineComponent({
  name: 'Category',
  components: {
    PageContainer
  },
  setup() {
    const namespace = 'mainModule/productModule/categoryModule'

    return {
      namespace,
      pageSearchConfig,
      pageContentConfig,
      pageModalConfig_create,
      pageModalConfig_update
    }
  }
})
</script>
