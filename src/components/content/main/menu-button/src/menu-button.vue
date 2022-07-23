<template>
  <div class="menu-button">
    <i
      class="btn-icon"
      :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      :title="isCollapse ? '展开' : '折叠'"
      @click="$emit('collapse-toggle')"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuButton',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['collapse-toggle']
})
</script>

<style lang="less" scoped>
.menu-button {
  .btn-icon {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
