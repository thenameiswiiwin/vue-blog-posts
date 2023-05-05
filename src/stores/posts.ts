import { defineStore } from 'pinia'

interface PostsState {
  foo: string
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    foo: 'foo'
  }),

  actions: {
    updateFoo(foo: string) {
      this.foo = foo
    }
  }
})
