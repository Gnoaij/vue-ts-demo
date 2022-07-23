<template>
  <div class="nav-menu full-fill">
    <el-menu
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#0c2135"
      :collapse="isCollapse"
      :default-active="$route.path"
    >
      <nav-submenu :menu-list="routeMenu" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useStore } from '@/store'

import NavSubmenu from './nav-submenu.vue'

export default defineComponent({
  name: 'NavMenu',
  components: {
    NavSubmenu
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    /**
     * store
     */
    const store = useStore()

    /**
     * state
     */
    const routeMenu = computed(() => store.state.mainModule.routeMenu)

    return {
      routeMenu
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  .el-menu {
    border-right: none;
  }
}
</style>
