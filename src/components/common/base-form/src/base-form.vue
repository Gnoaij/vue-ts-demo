<template>
  <div class="base-form">
    <!-- header -->
    <div class="base-form-header">
      <slot name="base-form-header"></slot>
    </div>
    <!-- content -->
    <div class="base-form-content">
      <el-form
        :model="modelValue"
        :rules="config.rules"
        :label-width="config.labelWidth"
        :label-position="config.labelPosition"
        :hide-required-asterisk="config.hideRequiredAsterisk"
        :size="config.itemSize"
        ref="elFormRef"
      >
        <el-row>
          <template v-for="item in config.items" :key="item.field">
            <el-col v-bind="item.layout ?? config.itemLayout">
              <el-form-item
                :prop="item.field"
                :label="item.label"
                :label-width="item.labelWidth ?? config.labelWidth"
                :size="item.size ?? config.itemSize"
                :style="item.style ?? config.itemStyle"
              >
                <!-- text -->
                <template v-if="item.type === ItemTypes.TEXT">
                  <el-input
                    type="text"
                    style="width: 100%"
                    v-bind="item[ItemTypes.TEXT]"
                    :model-value="modelValue[item.field]"
                    @update:model-value="handleModelValueUpdate(item.type, item.field, $event)"
                  />
                </template>
                <!-- number -->
                <template v-else-if="item.type === ItemTypes.NUMBER">
                  <el-input
                    type="text"
                    style="width: 100%"
                    v-bind="item[ItemTypes.NUMBER]"
                    :model-value="modelValue[item.field]"
                    @update:model-value="handleModelValueUpdate(item.type, item.field, $event)"
                  />
                </template>
                <!-- password -->
                <template v-else-if="item.type === ItemTypes.PASSWORD">
                  <el-input
                    type="password"
                    style="width: 100%"
                    v-bind="item[ItemTypes.PASSWORD]"
                    :model-value="modelValue[item.field]"
                    @update:model-value="handleModelValueUpdate(item.type, item.field, $event)"
                  />
                </template>
                <!-- date-picker -->
                <template v-else-if="item.type === ItemTypes.DATE_PICKER">
                  <el-date-picker
                    type="daterange"
                    style="width: 100%"
                    v-bind="item[ItemTypes.DATE_PICKER]"
                    :model-value="modelValue[item.field]"
                    @update:model-value="handleModelValueUpdate(item.type, item.field, $event)"
                  />
                </template>
                <!-- select -->
                <template v-else-if="item.type === ItemTypes.SELECT">
                  <el-select
                    style="width: 100%"
                    :placeholder="item[ItemTypes.SELECT]?.placeholder"
                    :clearable="item[ItemTypes.SELECT]?.clearable"
                    :disabled="item[ItemTypes.SELECT]?.disabled"
                    :model-value="modelValue[item.field]"
                    @update:model-value="handleModelValueUpdate(item.type, item.field, $event)"
                  >
                    <el-option
                      v-for="option in item[ItemTypes.SELECT]?.options"
                      :key="option.value"
                      v-bind="option"
                    />
                  </el-select>
                </template>
                <!-- custom -->
                <template
                  v-else-if="item.type === ItemTypes.CUSTOM && item[ItemTypes.CUSTOM]?.slotName"
                >
                  <slot
                    :name="item[ItemTypes.CUSTOM]?.slotName"
                    :model-value="modelValue[item.field]"
                    :set-model-value="setModelValue(item.field)"
                  ></slot>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <!-- footer -->
    <div class="base-form-footer">
      <slot name="base-form-footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

import type { IBaseFormConfig } from './base-form.type'
import { ItemTypes } from './base-form.type'

import type { ElForm } from 'element-plus'

export default defineComponent({
  name: 'BaseForm',
  props: {
    config: {
      type: Object as PropType<IBaseFormConfig>,
      required: true
    },
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:model-value'],
  setup(props, { emit, expose }) {
    /**
     * refs
     */
    const elFormRef = ref<InstanceType<typeof ElForm>>()

    /**
     * methods
     */
    const setModelValue = (field: string) => {
      return (newValue: any) => {
        emit('update:model-value', { ...props.modelValue, [field]: newValue })
      }
    }

    const handleModelValueUpdate = (type: ItemTypes, field: string, newValue: any) => {
      if (type === ItemTypes.NUMBER) {
        if (typeof newValue === 'number' || newValue === '') {
          emit('update:model-value', { ...props.modelValue, [field]: newValue })
        } else if (typeof newValue === 'string') {
          const target = Number(newValue)
          if (!isNaN(target)) {
            emit('update:model-value', { ...props.modelValue, [field]: target })
          }
        }
      } else {
        emit('update:model-value', { ...props.modelValue, [field]: newValue })
      }
    }

    /**
     * expose
     */
    const validate = () => {
      return elFormRef.value?.validate()
    }

    const clearValidate = () => {
      elFormRef.value?.clearValidate()
    }

    expose({
      validate,
      clearValidate
    })

    return {
      ItemTypes,
      elFormRef,
      validate,
      clearValidate,
      setModelValue,
      handleModelValueUpdate
    }
  }
})
</script>

<style lang="less" scoped>
.base-form {
  padding: 10px;
  background-color: #fff;
}
</style>
