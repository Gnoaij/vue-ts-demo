<template>
  <div class="main full-fill">
    <el-container class="full-fill">
      <el-aside class="main-aside" :width="isCollapse ? '64px' : '210px'">
        <main-logo :is-collapse="isCollapse" />
        <nav-menu :is-collapse="isCollapse" />
      </el-aside>
      <el-container class="main-section">
        <el-header class="main-header align-between">
          <div class="align-left">
            <menu-button :is-collapse="isCollapse" @collapse-toggle="isCollapse = !isCollapse" />
            <nav-breadcrumb />
          </div>
          <div class="align-right hidden-xs-only">
            <nav-message />
            <nav-dropdown />
          </div>
        </el-header>
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { useRouter } from 'vue-router'

import { useStore } from '@/store'
import { ActionTypes as LoginActionTypes } from '@/store/login/types'
import { ActionTypes as MainActionTypes } from '@/store/main/types'

import { ElLoading } from 'element-plus'

import MainLogo from '@/components/content/main/main-logo'
import NavMenu from '@/components/content/main/nav-menu'
import MenuButton from '@/components/content/main/menu-button'
import NavBreadcrumb from '@/components/content/main/nav-breadcrumb'
import NavMessage from '@/components/content/main/nav-message'
import NavDropdown from '@/components/content/main/nav-dropdown'

import { getLeafNodes } from '@/utils/recurser'

export default defineComponent({
  name: 'Main',
  components: {
    MainLogo,
    NavMenu,
    MenuButton,
    NavBreadcrumb,
    NavMessage,
    NavDropdown
  },
  setup() {
    /**
     * router
     */
    const router = useRouter()

    /**
     * store
     */
    const store = useStore()

    /**
     * states
     */
    const isCollapse = ref(false)

    /**
     * methods
     */
    const initRouteMenu = async () => {
      let loadingInstance = ElLoading.service({ text: '加载中' })
      try {
        await store.dispatch(`loginModule/${LoginActionTypes.AUTHORIZATION_TEST}`)
        try {
          await store.dispatch(`mainModule/${MainActionTypes.GET_USER}`)
          await store.dispatch(`mainModule/${MainActionTypes.GET_ROUTE_MENU}`)
          const allLeafRouteMenu = getLeafNodes(routeMenu.value)
          const firstRoute = allLeafRouteMenu?.[0]
          if (firstRoute) {
            router.push(firstRoute.url)
          }
          loadingInstance?.close()
        } catch {
          loadingInstance?.close()
        }
      } catch {
        router.push('/login')
        loadingInstance?.close()
      }
    }

    const routeMenu = computed(() => store.state.mainModule.routeMenu)

    if (!routeMenu.value || routeMenu.value.length === 0) {
      initRouteMenu()
    }

    return {
      isCollapse
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  .main-aside {
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .main-section {
    .main-header {
      height: 48px;
      background-color: var(--color-white);
    }

    .main-content {
      background-color: var(--color-grey);
    }
  }
}
</style>
