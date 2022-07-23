import type { IStory } from '@/service/main/story/types'

interface IStoryModuleState {
  storyList: IStory[]
  storyCount: number
}

enum MutationTypes {
  SET_STORY_LIST = 'SET_STORY_LIST',
  SET_STORY_COUNT = 'SET_STORY_COUNT'
}

enum ActionTypes {
  QUERY_STORY_LIST = 'QUERY_STORY_LIST',
  CREATE_STORY = 'CREATE_STORY'
}

export { IStoryModuleState, MutationTypes, ActionTypes }
