<template>
  <div class="page-modal background-white">
    <el-dialog
      :title="config.title"
      :width="config.width ?? '30%'"
      :center="config.center ?? true"
      :destroy-on-close="config.destroyOnClose ?? true"
      v-model="isActive"
    >
      <template #default>
        <base-form :config="config.baseFormConfig" v-model="model" ref="baseFormRef">
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
      </template>
      <template #footer>
        <div class="el-dialog-footer-slot">
          <el-button size="medium" @click="handleCancelClick">
            {{ config.cancelButtonText ?? '取 消' }}
          </el-button>
          <el-button type="primary" size="medium" @click="handleComfirmClick">
            {{ config.confirmButtonText ?? '确 定' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

import type { IPageModalConfig } from './page-modal.type'
import { ItemTypes } from './page-modal.type'

import BaseForm from '@/components/common/base-form'

export default defineComponent({
  name: 'PageModal',
  components: {
    BaseForm
  },
  props: {
    config: {
      type: Object as PropType<IPageModalConfig>,
      required: true
    }
  },
  emits: ['page-modal-confirm-click', 'page-modal-cancel-click'],
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
    const isActive = ref(false)
    const model = ref({ ...props.config.defaultModel })

    /**
     * methods
     */
    const handleComfirmClick = () => {
      baseFormRef.value?.validate()?.then((valid) => {
        if (valid) {
          emit('page-modal-confirm-click', model)
        }
      })
    }

    const handleCancelClick = () => {
      isActive.value = false
      emit('page-modal-cancel-click', model)
    }

    /**
     * expose
     */
    const setIsActive = (newStatus: boolean) => {
      isActive.value = newStatus
    }

    const getModel = () => {
      return model.value
    }

    const setModel = (newModel: any) => {
      model.value = newModel
    }

    const resetModel = () => {
      model.value = { ...props.config.defaultModel }
    }

    expose({
      setIsActive,
      getModel,
      setModel,
      resetModel
    })

    return {
      baseForm_custom_slotNames,
      baseFormRef,
      isActive,
      model,
      handleComfirmClick,
      handleCancelClick,
      setIsActive,
      getModel,
      setModel,
      resetModel
    }
  }
})
</script>

<style lang="less" scoped>
.page-modal {
  :deep(.el-dialog__body) {
    padding-top: 10px;
    padding-bottom: 10px;

    .base-form {
      padding: 0;
    }
  }
}
</style>
