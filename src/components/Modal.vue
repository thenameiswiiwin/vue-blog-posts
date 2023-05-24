<script lang="ts" setup>
import { useModal } from '@/composables/modal'

const modal = useModal()
</script>

<template>
  <div
    class="relative z-10"
    style="color: white"
    :class="modal.show.value ? 'block' : 'hidden'"
  >
    <div
      class="fixed inset-0 animate-fade-in bg-gray-500/75 transition-opacity"
    ></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
        >
          <div id="modal"></div>
        </div>
      </div>
    </div>
  </div>
</template>
