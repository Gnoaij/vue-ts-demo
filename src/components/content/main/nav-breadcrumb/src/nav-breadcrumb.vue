<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="item in $route.matched" :key="item.name">
        <el-breadcrumb-item>{{ item.meta?.title }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBreadcrumb'
})
</script>

<style lang="less" scoped>
.nav-breadcrumb {
  margin-left: 10px;
}
</style>
