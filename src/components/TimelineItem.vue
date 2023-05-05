<script setup lang="ts">
import { TimelinePost } from '../posts'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <section
    class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
  >
    <a class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
      <div class="min-w-0 flex-auto">
        <a class="text-base font-semibold leading-6 text-gray-900">
          {{ post.title }}
        </a>
        <p class="mt-1 flex text-sm leading-5 text-gray-500">
          {{ post.created.toFormat('d MMM') }}
        </p>
      </div>
    </a>
  </section>
</template>
