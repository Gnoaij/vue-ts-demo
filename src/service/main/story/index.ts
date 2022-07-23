import request from '@/service/index'

import type { IResponse, IPagination, IList } from '@/service/types'
import type { IStory } from './types'

function api_queryStoryList(pagination: IPagination) {
  return request.post<IResponse<IList<IStory[]>>>('/story/list', { data: pagination })
}

function api_createStory(story: IStory) {
  return request.post<IResponse<string>>('/story', { data: story })
}

export { api_queryStoryList, api_createStory }
