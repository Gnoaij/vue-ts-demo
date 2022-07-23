<template>
  <div class="nav-dropdown">
    <el-dropdown :hide-on-click="false">
      <div class="align-center">
        <el-avatar
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          size="small"
        ></el-avatar>
        <span class="username">{{ user.name }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="handlLogoutBtnClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useRouter } from 'vue-router'

import { useStore } from '@/store'
import { MutationTypes } from '@/store/main/types'

import storage from '@/utils/storage'

export default defineComponent({
  name: 'NavDropdown',
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
     * state
     */
    const user = computed(() => store.state.mainModule.user)

    /**
     * methods
     */
    const handlLogoutBtnClick = () => {
      store.commit(`mainModule/${MutationTypes.SET_USER}`, {})
      store.commit(`mainModule/${MutationTypes.SET_ROUTE_MENU}`, [])
      storage.removeItem('userId')
      storage.removeItem('token')
      router.push('/login')
    }

    return {
      user,
      handlLogoutBtnClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-dropdown {
  margin-left: 18px;
  margin-right: 15px;

  .el-avatar {
    cursor: pointer;
  }

  .username {
    margin-left: 8px;
    cursor: pointer;
  }
}
</style>
