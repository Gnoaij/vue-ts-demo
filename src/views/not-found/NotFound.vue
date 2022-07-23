<template>
  <div class="not-found full-fill align-center">
    <el-empty v-show="isShowNotFound" :image-size="200" description="您访问的页面出错了！">
      <el-button size="mini" type="primary" @click="$router.push('/main')">首页</el-button>
      <el-button size="mini" @click="$router.push('/login')">登录</el-button>
    </el-empty>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import { useStore } from '@/store'
import { ActionTypes as LoginActionTypes } from '@/store/login/types'
import { ActionTypes as MainActionTypes } from '@/store/main/types'

import { getAllNodes } from '@/utils/recurser'

import { ElLoading } from 'element-plus'

export default defineComponent({
  name: 'NotFound',
  setup() {
    const router = useRouter()

    const route = useRoute()

    const store = useStore()

    const routeMenu = computed(() => store.state.mainModule.routeMenu)

    const isShowNotFound = ref(false)

    const initRouteMenu = async () => {
      let loadingInstance = ElLoading.service({ text: '加载中' })
      isShowNotFound.value = false
      try {
        await store.dispatch(`loginModule/${LoginActionTypes.AUTHORIZATION_TEST}`)
        await store.dispatch(`mainModule/${MainActionTypes.GET_USER}`)
        await store.dispatch(`mainModule/${MainActionTypes.GET_ROUTE_MENU}`)
        const allRouteMenu = getAllNodes(routeMenu.value)
        const targetRoute = allRouteMenu.find((item) => {
          return item.url === route.path
        })
        if (targetRoute) {
          router.push(route.path)
        } else {
          isShowNotFound.value = true
        }
        loadingInstance?.close()
      } catch {
        isShowNotFound.value = true
        loadingInstance?.close()
      }
    }

    if (!routeMenu.value || routeMenu.value.length === 0) {
      initRouteMenu()
    } else {
      isShowNotFound.value = true
    }

    return {
      isShowNotFound
    }
  }
})
</script>

<style lang="less" scoped>
.not-found {
  .el-empty {
    margin-top: -150px;
  }
}
</style>
