<template>
  <el-menu-item :index="menuItem.url" @click="handleMenuItemClick(menuItem.url)">
    <i v-if="menuItem.icon" :class="menuItem.icon"></i>
    <span>{{ menuItem.name }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import { useRouter } from 'vue-router'

import type { IMenu } from '@/service/main/types'

import AppLoading from '@/components/common/app-loading'

export default defineComponent({
  name: 'NavMenuItem',
  props: {
    menuItem: {
      type: Object as PropType<IMenu>,
      default: () => ({})
    }
  },
  setup() {
    /**
     * router
     */
    const router = useRouter()

    /**
     * methods
     */
    const handleMenuItemClick = (url: string) => {
      AppLoading(() => router.push(url), '跳转中')
    }
    return {
      handleMenuItemClick
    }
  }
})
</script>

<style lang="less" scoped>
.el-menu-item {
  &.is-active,
  &:hover {
    background-color: #0a60bd !important;
  }
}
</style>
