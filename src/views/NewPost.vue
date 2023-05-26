<script lang="ts" setup>
import { DateTime } from 'luxon'
import PostWriter from '@/components/PostWriter.vue'
import type { TimelinePost } from '@/utils/posts'

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>'
}
</script>

<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">New Post</h2>
  <PostWriter :post="post" />
</template>
