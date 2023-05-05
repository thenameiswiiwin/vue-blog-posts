<script setup lang="ts">
import { ref } from 'vue'

const periods = ['Today', 'This Week', 'This Month'] as const

type Period = (typeof periods)[number]

const selectedPeriod = ref<Period>('Today')

function isActive(period: Period) {
  return selectedPeriod.value === period
}

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}
</script>

<template>
  <nav class="-mb-px flex justify-center">
    <a
      v-for="period in periods"
      :key="period"
      :class="[
        isActive(period)
          ? 'border-green-500 text-green-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
        'w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium'
      ]"
      @click="selectPeriod(period)"
    >
      {{ period }}
    </a>
  </nav>
</template>
