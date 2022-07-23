<template>
  <div class="base-countup">
    <span ref="countupRef"></span>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref, onBeforeUnmount, onMounted, onUpdated } from 'vue'

import type { CountUpOptions } from 'countup.js'
import { CountUp } from 'countup.js'

export default defineComponent({
  name: 'BaseCountup',
  props: {
    number: {
      type: Number,
      default: 0
    },
    option: {
      type: Object as PropType<CountUpOptions>,
      default: () => ({
        decimalPlaces: 2, // 保留两位
        duration: 2, // 动画时长
        separator: ',', // 千位分割
        decimal: '.', // 小数分割
        prefix: '', // 前缀
        suffix: '' // 后缀
      })
    }
  },
  setup(props, { expose }) {
    /**
     * refs
     */
    const countupRef = ref<HTMLSpanElement>()

    /**
     * countup instance
     */
    let countupInstance: CountUp | null

    const start = () => {
      countupInstance?.start()
    }

    const update = () => {
      countupInstance?.update(props.number)
    }

    onMounted(() => {
      if (countupRef.value) {
        countupInstance = new CountUp(countupRef.value, props.number, props.option)
        start()
      }
    })

    onUpdated(() => {
      update()
    })

    onBeforeUnmount(() => {
      countupInstance = null
    })

    expose({
      start,
      update
    })

    return {
      countupRef
    }
  }
})
</script>
