<template>
  <div class="base-card">
    <el-card :shadow="shadow">
      <template #header>
        <div class="base-card-header">
          <span>{{ title }}</span>
          <el-button
            v-if="refresh"
            class="el-icon-refresh-right refresh-button"
            type="text"
            title="刷新"
            @click="$emit('refresh-click')"
          />
        </div>
      </template>
      <div class="base-card-content">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    shadow: {
      type: String as PropType<'always' | 'hover' | 'never'>,
      default: 'never'
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  emits: ['refresh-click']
})
</script>

<style lang="less" scoped>
.base-card {
  .el-card {
    :deep(.el-card__header) {
      padding: 10px 20px;
    }
  }

  .base-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;

    .refresh-button {
      font-size: 16px;
      color: #909399;

      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
