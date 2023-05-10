<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white">
    <Suspense>
      <template #fallback>
        <TimeLine />
      </template>

      <template #default>
        <LoadingSpinner />
      </template>
    </Suspense>
  </div>
</template>
