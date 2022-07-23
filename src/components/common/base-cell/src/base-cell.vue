<template>
  <div class="base-cell">
    <template v-if="dataList.length === 0">
      <div style="color: #999; cursor: pointer" @click="$emit('empty-click')">
        <i class="el-icon-loading" v-show="isLoading"></i>
        <span>{{ emptyText }}</span>
      </div>
    </template>
    <template v-else>
      {{ targetValue }}
    </template>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import type { IConfig } from './base-cell.type'

export default defineComponent({
  name: 'BaseCell',
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
    dataList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    targetKey: null
  },
  setup(props) {
    /**
     * states
     */
    const targetValue = computed(() => {
      const target = props.dataList.find((item) => item[props.config.key] === props.targetKey)
      if (target) {
        return target[props.config.value ?? props.config.key]
      } else {
        return props.targetKey
      }
    })

    return {
      targetValue
    }
  }
})
</script>
