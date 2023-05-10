<script lang="ts" setup>
import { DateTime } from 'luxon'
import PostWriter from '@/components/PostWriter.vue'
import type { TimelinePost } from '@/posts'

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  created: DateTime.now()
}
</script>

<template>
  <PostWriter :post="post" />
</template>
