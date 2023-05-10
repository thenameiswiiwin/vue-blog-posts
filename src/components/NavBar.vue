<script lang="ts" setup>
import { PlusIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div class="flex justify-end pb-4 pt-8">
    <div class="shrink-0">
      <RouterLink
        to="/posts/new"
        class="relative inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        New Job
      </RouterLink>
    </div>
  </div>
</template>
