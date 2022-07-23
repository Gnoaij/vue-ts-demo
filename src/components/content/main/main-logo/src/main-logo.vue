<template>
  <div class="main-logo align-left">
    <img class="img" src="~@/assets/img/logo.svg" alt="logo" @click="$router.push('/main')" />
    <h1 class="title" v-show="!isCollapse" @click="$router.push('/main')">Vue CMS</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLogo',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="less" scoped>
.main-logo {
  height: 28px;
  padding: 14px 18px 6px 18px;

  .img {
    height: 28px;
    cursor: pointer;
  }

  .title {
    margin-left: 12px;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
