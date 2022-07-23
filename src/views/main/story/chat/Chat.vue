<template>
  <div class="chat">
    <div class="chat-editor" v-loading="isPublishing">
      <el-input v-model="title" placeholder="起个标题吧" />
      <base-editor v-model="content" :config="{ placeholder: '随便说几句吧' }" />
    </div>
    <div class="chat-publish align-right">
      <el-button
        icon="el-icon-edit"
        type="primary"
        size="medium"
        :disabled="isPublishing"
        @click="handelPublishClick"
      >
        发表
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useStore } from '@/store'
import { ActionTypes } from '@/store/main/story/types'

import AppMessage from '@/components/common/app-message'
import BaseEditor from '@/components/common/base-editor'

export default defineComponent({
  name: 'Chat',
  components: {
    BaseEditor
  },
  setup() {
    const namespace = 'mainModule/storyModule'

    const store = useStore()

    const title = ref('')
    const content = ref('')
    const isPublishing = ref(false)

    const handelPublishClick = async () => {
      if (!isPublishing.value) {
        if (title.value === '') {
          return AppMessage.error('标题不能为空')
        }
        if (content.value === '') {
          return AppMessage.error('内容不能为空')
        }
        try {
          isPublishing.value = true
          const story = {
            title: title.value,
            content: content.value
          }
          await store.dispatch(`${namespace}/${ActionTypes.CREATE_STORY}`, story)
          title.value = ''
          content.value = ''
          isPublishing.value = false
        } catch {
          isPublishing.value = false
        }
      }
    }

    return {
      title,
      content,
      isPublishing,
      handelPublishClick
    }
  }
})
</script>

<style lang="less" scoped>
.chat {
  .chat-publish {
    margin-top: 2px;
  }
}
</style>
