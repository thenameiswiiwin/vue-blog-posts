<script lang="ts" setup>
import { DateTime } from 'luxon'
import PostWriter from '@/components/PostWriter.vue'
import type { TimelinePost } from '@/utils/posts'
import { useUsers } from '@/stores/usersStore'

const usersStore = useUsers()

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
</script>

<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">New Post</h2>
  <PostWriter :post="post" />
</template>
