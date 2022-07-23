<template>
  <div class="base-echarts">
    <div ref="echartsRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref, onBeforeUnmount, onMounted, onUpdated } from 'vue'

import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'

export default defineComponent({
  name: 'BaseEcharts',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light'
    },
    renderer: {
      type: String as PropType<'canvas' | 'svg'>,
      default: 'svg'
    },
    option: {
      type: Object as PropType<EChartsOption>,
      required: true
    }
  },
  setup(props, { expose }) {
    /**
     * refs
     */
    const echartsRef = ref<HTMLDivElement>()

    /**
     * echarts instance
     */
    let echartsInstance: ECharts | null

    const update = () => {
      echartsInstance?.setOption(props.option)
    }

    const resize = () => {
      echartsInstance?.resize()
    }

    const clear = () => {
      echartsInstance?.clear()
    }

    const dispose = () => {
      echartsInstance?.dispose()
    }

    onMounted(() => {
      if (echartsRef.value) {
        echartsInstance = init(echartsRef.value, props.theme, {
          renderer: props.renderer
        })
        update()
      }
      window.addEventListener('resize', resize)
    })

    onUpdated(() => {
      update()
    })

    onBeforeUnmount(() => {
      clear()
      dispose()
      echartsInstance = null
      window.removeEventListener('resize', resize)
    })

    expose({
      update,
      resize,
      clear,
      dispose
    })

    return {
      echartsRef
    }
  }
})
</script>
