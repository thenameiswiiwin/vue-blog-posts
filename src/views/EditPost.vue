<script lang="ts" setup>
import { useRoute } from 'vue-router'
import PostWriter from '@/components/PostWriter.vue'

import { usePostsStores } from '@/stores/postsStores'

const route = useRoute()
const postsStore = usePostsStores()

const id = route.params.id as string
const post = postsStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} not found`)
}
</script>

<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">Edit Post</h2>
  <PostWriter :post="post" />
</template>
