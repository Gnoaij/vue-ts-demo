<template>
  <template v-for="item_1 in menuList" :key="item_1.id">
    <template v-if="item_1.type === 1">
      <el-submenu :index="item_1.url">
        <template #title>
          <i v-if="item_1.icon" :class="item_1.icon"></i>
          <span>{{ item_1.name }}</span>
        </template>
        <template v-if="item_1.children">
          <nav-submenu :menuList="item_1.children" />
        </template>
      </el-submenu>
    </template>
    <template v-else-if="item_1.type === 2">
      <nav-menu-item :menu-item="item_1" />
    </template>
  </template>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import type { IMenu } from '@/service/main/types'

import NavMenuItem from './nav-menu-item.vue'

export default defineComponent({
  name: 'NavSubmenu',
  components: {
    NavMenuItem
  },
  props: {
    menuList: {
      type: Array as PropType<IMenu[]>,
      default: () => []
    }
  }
})
</script>

<style lang="less" scoped>
.el-submenu {
  :deep(.el-submenu__title) {
    background-color: #001529 !important;
  }
}
</style>
