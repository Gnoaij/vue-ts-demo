<template>
  <div class="list">
    <div class="content" v-loading="isLoading">
      <base-collapse title="故事列表" :data-list="storyList" />
    </div>
    <div class="footer align-right">
      <el-pagination
        layout="total,sizes,prev,pager,next,jumper"
        :disabled="isLoading"
        :page-sizes="[10, 20, 30, 40, 50]"
        :total="storyCount"
        :page-size="pageSize"
        :current-page="currentPage"
        @update:page-size="handlePageSizeUpdate"
        @update:current-page="handleCurrentPageUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { useStore } from '@/store'
import { ActionTypes } from '@/store/main/story/types'

import { utcToLocal } from '@/utils/formatter'

import BaseCollapse from '@/components/common/base-collapse'

export default defineComponent({
  name: 'List',
  components: {
    BaseCollapse
  },
  setup() {
    const namespace = 'mainModule/storyModule'

    const store = useStore()

    const storyList = computed(() =>
      store.state.mainModule.storyModule.storyList.map((item) => ({
        key: item.id,
        title: item.title,
        content: item.content,
        time: utcToLocal(item.createAt)
      }))
    )
    const storyCount = computed(() => store.state.mainModule.storyModule.storyCount)

    const isLoading = ref(false)
    const pageSize = ref(10)
    const currentPage = ref(1)

    const loadStoryList = async () => {
      try {
        isLoading.value = true
        await store.dispatch(`${namespace}/${ActionTypes.QUERY_STORY_LIST}`, {
          offset: pageSize.value * (currentPage.value - 1),
          size: pageSize.value
        })
        isLoading.value = false
        return Promise.resolve()
      } catch {
        isLoading.value = false
        return Promise.reject()
      }
    }

    const handlePageSizeUpdate = (newPageSize: number) => {
      if (!isLoading.value) {
        const oldPageSize = pageSize.value
        pageSize.value = newPageSize
        loadStoryList().catch(() => (pageSize.value = oldPageSize))
      }
    }

    const handleCurrentPageUpdate = (newCurrentPage: number) => {
      if (!isLoading.value) {
        const oldCurrentPage = currentPage.value
        currentPage.value = newCurrentPage
        loadStoryList().catch(() => (currentPage.value = oldCurrentPage))
      }
    }

    loadStoryList()

    return {
      storyList,
      storyCount,
      isLoading,
      pageSize,
      currentPage,
      handlePageSizeUpdate,
      handleCurrentPageUpdate
    }
  }
})
</script>

<style lang="less" scoped>
.list {
  background-color: #fff;
  padding: 0 10px 10px 10px;
}
</style>
