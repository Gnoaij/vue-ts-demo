import type { Module } from 'vuex'

import type { IRootState } from '@/store/types'
import type { IStoryModuleState } from './types'
import { MutationTypes, ActionTypes } from './types'

import type { IPagination } from '@/service/types'
import type { IStory } from '@/service/main/story/types'
import { api_queryStoryList, api_createStory } from '@/service/main/story'

import xss from 'xss'

import AppMessage from '@/components/common/app-message'

const storyModule: Module<IStoryModuleState, IRootState> = {
  namespaced: true,
  state() {
    return {
      storyList: [],
      storyCount: 0
    }
  },
  mutations: {
    [MutationTypes.SET_STORY_LIST](state, storyList: IStory[]) {
      state.storyList = storyList
    },
    [MutationTypes.SET_STORY_COUNT](state, storyCount: number) {
      state.storyCount = storyCount
    }
  },
  actions: {
    async [ActionTypes.QUERY_STORY_LIST]({ commit }, pagination: IPagination) {
      try {
        const { code, data } = await api_queryStoryList(pagination)
        if (code === 0) {
          data.list.forEach((item) => {
            item.content = xss(item.content)
          })
          commit(MutationTypes.SET_STORY_LIST, data.list)
          commit(MutationTypes.SET_STORY_COUNT, data.totalCount)
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '获取故事列表失败')
        }
      } catch {
        return AppMessage.error('获取故事列表失败')
      }
    },
    async [ActionTypes.CREATE_STORY](context, story: IStory) {
      try {
        const reqData = {
          title: story.title,
          content: xss(story.content)
        }
        const { code, data } = await api_createStory(reqData as IStory)
        if (code === 0) {
          return AppMessage.success('发表故事成功')
        } else {
          return AppMessage.error(typeof data === 'string' ? data : '发表故事失败')
        }
      } catch {
        return AppMessage.error('发表故事失败')
      }
    }
  }
}

export default storyModule
