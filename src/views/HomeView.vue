<script setup lang="ts">
import Timeline from '@/components/Timeline.vue'
import Spinner from '@/components/Spinner.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <Timeline />
    </template>

    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>
