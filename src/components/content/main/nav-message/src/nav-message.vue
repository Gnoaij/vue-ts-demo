<template>
  <div class="nav-message">
    <el-badge type="danger" is-dot :hidden="isHiddenColl">
      <i class="icon el-icon-collection-tag" @click="isHiddenColl = !isHiddenColl"></i>
    </el-badge>
    <el-badge type="danger" is-dot :hidden="isHiddenBell">
      <i class="icon el-icon-bell" @click="isHiddenBell = !isHiddenBell"></i>
    </el-badge>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NavMessage',
  setup() {
    /**
     * states
     */
    const isHiddenColl = ref(true)
    const isHiddenBell = ref(true)

    return {
      isHiddenColl,
      isHiddenBell
    }
  }
})
</script>

<style lang="less" scoped>
.nav-message {
  .icon {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
