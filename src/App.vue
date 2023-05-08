<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white">
    <Suspense>
      <template #default>
        <TimeLine />
      </template>

      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>
  </div>
</template>
