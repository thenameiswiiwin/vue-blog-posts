<script lang="ts" setup>
import { PlusIcon } from '@heroicons/vue/20/solid'
import { useModal } from '@/composables/modal'

const modal = useModal()
</script>

<template>
  <div class="flex justify-end gap-2 pb-4 pt-8">
    <div class="shrink-0">
      <button
        type="button"
        class="relative inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        @click="modal.showModal()"
      >
        Sign Up
      </button>
    </div>
    <div class="shrink-0">
      <RouterLink
        to="/posts/new"
        class="relative inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        New Post
      </RouterLink>
    </div>
  </div>

  <Teleport to="#modal"> Modal content here. </Teleport>
</template>
