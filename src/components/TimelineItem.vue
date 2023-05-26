<script setup lang="ts">
import type { TimelinePost } from '@/utils/posts'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <RouterLink :to="`/posts/${post.id}`" class="flex gap-x-4">
    <div class="min-w-0 flex-auto">
      <p class="text-sm font-semibold leading-6 text-gray-900">
        <a>
          <span class="absolute inset-x-0 -top-px bottom-0" />
          {{ post.title }}
        </a>
      </p>
      <p class="mt-1 flex text-xs leading-5 text-gray-500">
        {{ post.created.toFormat('MMMM dd, yyyy') }}
      </p>
    </div>
  </RouterLink>
</template>
