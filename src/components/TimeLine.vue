<script setup lang="ts">
import { DateTime } from 'luxon'
import { computed, ref } from 'vue'
import { Post, today, thisWeek, thisMonth } from '../posts'

const periods = ['Today', 'This Week', 'This Month'] as const

type Period = (typeof periods)[number]

const selectedPeriod = ref<Period>('Today')

function isActive(period: Period) {
  return selectedPeriod.value === period
}

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed(() => {
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

  <section
    class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
  >
    <a
      v-for="post in posts"
      :key="post.id"
      class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
    >
      <div class="min-w-0 flex-auto">
        <a class="text-base font-semibold leading-6 text-gray-900">
          {{ post.title }}
        </a>
        <p class="mt-1 flex leading-5 text-sm text-gray-500">
          {{ post.created.toFormat('d MMM') }}
        </p>
      </div>
    </a>
  </section>
</template>
