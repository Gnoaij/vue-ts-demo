<template>
  <div class="base-tree">
    <template v-if="dataList.length === 0">
      <div style="color: #999; cursor: pointer" @click="$emit('empty-click')">
        <i class="el-icon-loading" v-show="isLoading"></i>
        <span>{{ emptyText }}</span>
      </div>
    </template>
    <template v-else>
      <el-tree
        :node-key="config.key"
        :props="{ label: config.label ?? config.key, children: config.children ?? 'children' }"
        :data="dataList"
        show-checkbox
        @check="handleCheck"
        ref="elTreeRef"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'

import type { ElTree } from 'element-plus'

import type { IConfig } from './base-tree.type'

export default defineComponent({
  name: 'BaseTree',
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
    checkedKeys: {
      type: Array,
      default: () => []
    }
  },
  emits: ['check', 'empty-click'],
  setup(props, { emit }) {
    /**
     * refs
     */
    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    /**
     * methods
     */
    const handleCheck = (data: any, checkedInfo: any) => {
      emit('check', [...checkedInfo.checkedKeys, ...checkedInfo.halfCheckedKeys])
    }

    const initChecked = () => {
      props.checkedKeys.forEach((item: any) => {
        elTreeRef.value?.setChecked(item, true, false)
      })
    }

    /**
     * watcher
     */
    watch(
      () => props.dataList,
      () => {
        if (props.dataList.length > 0) {
          nextTick(() => {
            initChecked()
          })
        }
      }
    )

    onMounted(() => {
      initChecked()
    })

    return {
      elTreeRef,
      handleCheck
    }
  }
})
</script>
