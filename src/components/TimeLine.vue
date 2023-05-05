<script setup lang="ts">
const periods = ['Today', 'This Week', 'This Month']
</script>

<template>
  <nav class="-mb-px flex justify-center">
    <a
      v-for="period in periods"
      :key="period"
      :class="[
        period === 'Today'
          ? 'border-green-500 text-green-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
        'w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium'
      ]"
    >
      {{ period }}
    </a>
  </nav>
</template>
