<template>
  <div class="page-search background-white">
    <base-form :config="config.baseFormConfig" v-model="model" ref="baseFormRef">
      <template #base-form-header>
        <div class="base-form-header-slot align-left">
          <h4 class="title-level-4">{{ config.title ?? '高级检索' }}</h4>
        </div>
      </template>
      <template #base-form-footer>
        <div class="base-form-footer-slot align-right">
          <el-button class="el-icon-search" size="small" type="primary" @click="handleQueryClick">
            {{ config.queryButtonText ?? '检索' }}
          </el-button>
          <el-button class="el-icon-refresh" size="small" @click="handleResetClick">
            {{ config.resetButtonText ?? '重置' }}
          </el-button>
        </div>
      </template>
      <template
        v-for="slotName in baseForm_custom_slotNames"
        :key="slotName"
        #[slotName]="slotProps"
      >
        <slot
          :name="slotName"
          :model-value="slotProps.modelValue"
          :set-model-value="slotProps.setModelValue"
        ></slot>
      </template>
    </base-form>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

import type { IPageSearchConfig } from './page-search.type'
import { ItemTypes } from './page-search.type'

import BaseForm from '@/components/common/base-form'

export default defineComponent({
  name: 'PageSearch',
  components: {
    BaseForm
  },
  props: {
    config: {
      type: Object as PropType<IPageSearchConfig>,
      required: true
    }
  },
  emits: ['page-search-query-click'],
  setup(props, { emit, expose }) {
    /**
     * base-form custom slots
     */
    const baseForm_custom_slotNames = props.config.baseFormConfig.items
      .filter((item) => item.type === ItemTypes.CUSTOM && item[ItemTypes.CUSTOM]?.slotName)
      .map((item) => item[ItemTypes.CUSTOM]?.slotName as string)

    /**
     * refs
     */
    const baseFormRef = ref<InstanceType<typeof BaseForm>>()

    /**
     * states
     */
    const model = ref({ ...props.config.defaultModel })

    /**
     * methods
     */
    const handleQueryClick = () => {
      baseFormRef.value?.validate()?.then((valid) => {
        if (valid) {
          emit('page-search-query-click', model)
        }
      })
    }

    const handleResetClick = () => {
      model.value = { ...props.config.defaultModel }
      baseFormRef.value?.clearValidate()
    }

    /**
     * expose
     */
    const getModel = () => {
      return model.value
    }

    expose({
      getModel
    })

    return {
      baseForm_custom_slotNames,
      baseFormRef,
      model,
      handleQueryClick,
      handleResetClick,
      getModel
    }
  }
})
</script>

<style lang="less" scoped>
.page-search {
  margin-bottom: 10px;

  .base-form-header-slot {
    padding: 10px;
  }

  .base-form-footer-slot {
    padding: 0 10px;
  }
}
</style>
