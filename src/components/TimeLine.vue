<script setup lang="ts">
import { DateTime } from 'luxon'
import { computed, ref } from 'vue'
import { TimelinePost, today, thisWeek, thisMonth } from '../posts'
import TimelineItem from './TimelineItem.vue'

const periods = ['Today', 'This Week', 'This Month'] as const

type Period = (typeof periods)[number]

const selectedPeriod = ref<Period>('Today')

function isActive(period: Period) {
  return selectedPeriod.value === period
}

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed<TimelinePost>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => {
      return {
        ...post,
        created: DateTime.fromISO(post.created)
      }
    })
    .filter((post) => {
      if (selectedPeriod.value === 'Today') {
        return post.created >= DateTime.now().minus({ days: 1 })
      }

      if (selectedPeriod.value === 'This Week') {
        return post.created >= DateTime.now().minus({ week: 1 })
      }

      return post
    })
})
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

  <TimelineItem v-for="post in posts" :key="post.id" :post="post" />
</template>
