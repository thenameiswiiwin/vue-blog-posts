import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import type { Period } from '@/constants'
import type { Post, TimelinePost } from '@/posts'

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

function delay() {
  return new Promise<void>((res) => {
    setTimeout(res, 1500)
  })
}

export const usePosts = defineStore('posts', {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: 'Today'
  }),

  actions: {
    setIsActive(period: Period) {
      return this.selectedPeriod === period
    },
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    },

    async fetchPosts() {
      const res = await window.fetch('http://localhost:8000/posts')
      const data = (await res.json()) as Post[]
      await delay()

      const ids: string[] = []
      const all = new Map<string, Post>()
      for (const post of data) {
        ids.push(post.id)
        all.set(post.id, post)
      }

      this.ids = ids
      this.all = all
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
