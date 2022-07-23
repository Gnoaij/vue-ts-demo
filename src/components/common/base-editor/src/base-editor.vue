<template>
  <div class="base-editor">
    <div ref="editorRef"></div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'

import type { IConfig } from './base-editor.type'

import E from 'wangeditor'

const defaultConfig: IConfig = {
  placeholder: '',
  height: 500,
  zIndex: 1000,
  focus: false,
  onchangeTimeout: 500,
  menuTooltipPosition: 'up',
  menus: [
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    'todo',
    'justify',
    'quote',
    'emoticon',
    'image',
    'video',
    'table',
    'code',
    'splitLine',
    'undo',
    'redo'
  ]
}

export default defineComponent({
  name: 'BaseEditor',
  props: {
    config: {
      type: Object as PropType<IConfig>,
      default: () => ({})
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    /**
     * refs
     */
    const editorRef = ref<HTMLDivElement | null>()

    let editorInstance: E | null

    onMounted(() => {
      if (editorRef.value) {
        editorInstance = new E(editorRef.value)
        editorInstance.config = Object.assign(editorInstance.config, defaultConfig, props.config)
        editorInstance.config.onchange = (newHTML: string) => {
          emit('update:model-value', newHTML)
        }
        editorInstance.create()
      }
    })

    onUpdated(() => {
      if (props.modelValue !== editorInstance?.txt.html()) {
        editorInstance?.txt.html(props.modelValue)
      }
    })

    onBeforeUnmount(() => {
      editorInstance?.destroy()
      editorInstance = null
    })

    return {
      editorRef
    }
  }
})
</script>
