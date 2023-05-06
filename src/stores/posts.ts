import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import {
  thisMonth,
  thisWeek,
  today,
  type Post,
  type TimelinePost
} from '@/posts'
import type { Period } from '@/constants'

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

export const usePosts = defineStore('posts', {
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth]
    ]),
    selectedPeriod: 'Today'
  }),

  actions: {
    setIsActive(period: Period) {
      return this.selectedPeriod === period
    },
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    }
  },

  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id)
          if (!post) {
            throw Error(`Post with id of ${id} was expected but not found.`)
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created)
          }
        })
        .filter((post) => {
          if (state.selectedPeriod === 'Today') {
            return post.created >= DateTime.now().minus({ days: 1 })
          }

          if (state.selectedPeriod === 'This Week') {
            return post.created >= DateTime.now().minus({ week: 1 })
          }

          return post
        })
    }
  }
})
