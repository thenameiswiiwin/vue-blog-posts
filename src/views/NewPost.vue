<script lang="ts" setup>
import { DateTime } from 'luxon'
import { useRouter } from 'vue-router'
import PostWriter from '@/components/PostWriter.vue'
import type { Post, TimelinePost } from '@/utils/posts'
import { useUsers } from '@/stores/usersStore'
import { usePostsStores } from '@/stores/postsStores'

const usersStore = useUsers()
const router = useRouter()
const postsStore = usePostsStores()

if (!usersStore.currentUserId) {
  throw Error('User is not logged in')
}

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  authorId: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>'
}

async function handleSubmit(post: Post) {
  await postsStore.createPost(post)
  router.push('/')
}
</script>

<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">New Post</h2>
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
