<template>
  <div class="base-select">
    <el-select
      :placeholder="config.placeholder"
      :clearable="config.clearable"
      :model-value="modelValue"
      @update:model-value="$emit('update:model-value', $event)"
      @change="$emit('change', $event)"
    >
      <template v-for="item in options" :key="item[config.key]">
        <el-option
          :label="item[config.label ?? config.key]"
          :value="item[config.value ?? config.key]"
          :disabled="item.disabled"
        />
      </template>
      <template #empty>
        <div
          style="padding: 10px; text-align: center; font-size: 14px; color: #999; cursor: pointer"
          @click="$emit('empty-click')"
        >
          <i class="el-icon-loading" v-show="isLoading"></i>
          <span>{{ emptyText }}</span>
        </div>
      </template>
    </el-select>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import type { IConfig } from './base-select.type'

export default defineComponent({
  name: 'BaseSelect',
  props: {
    config: {
      type: Object as PropType<IConfig>,
      default: () => ({
        key: 'id'
      })
    },
    emptyText: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    modelValue: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['update:model-value', 'change', 'empty-click']
})
</script>

<style lang="less" scoped>
.base-select {
  .el-select {
    width: 100%;
  }
}
</style>
