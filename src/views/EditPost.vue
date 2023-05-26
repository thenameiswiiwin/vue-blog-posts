<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import PostWriter from '@/components/PostWriter.vue'

import { usePostsStores } from '@/stores/postsStores'
import type { Post } from '@/utils/posts'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStores()

const id = route.params.id as string
const post = postsStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} not found`)
}

async function handleSubmit(post: Post) {
  await postsStore.updatePost(post)
  router.push('/')
}
</script>

<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">Edit Post</h2>
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
