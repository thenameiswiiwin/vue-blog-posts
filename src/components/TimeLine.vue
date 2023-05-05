<script setup lang="ts">
import { DateTime } from 'luxon'
import { computed, ref } from 'vue'
import { today, thisWeek, thisMonth, type TimelinePost } from '../posts'
import TimelineItem from './TimelineItem.vue'
import { usePostsStore } from '../stores/posts'

const postsStore = usePostsStore()

const periods = ['Today', 'This Week', 'This Month'] as const

type Period = (typeof periods)[number]

const selectedPeriod = ref<Period>('Today')

function isActive(period: Period) {
  return selectedPeriod.value === period
}

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  selectPeriod(target.value as Period)
}

const posts = computed<TimelinePost[]>(() => {
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
  {{ postsStore.foo }}
  <button @click="postsStore.updateFoo('bar')">Update</button>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="rounded-lg px-4 py-5 shadow-lg sm:px-6">
      <div>
        <div class="sm:hidden">
          <label for="periods" class="sr-only">Select a period</label>
          <select
            id="periods"
            name="periods"
            class="block w-full cursor-pointer rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
            @change="onChange"
          >
            <option v-for="period in periods" :key="period">
              {{ period }}
            </option>
          </select>
        </div>
        <div class="hidden sm:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex justify-center" aria-label="Tabs">
              <a
                v-for="period in periods"
                :key="period"
                :class="[
                  isActive(period)
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 cursor-pointer border-b-2 px-1 py-4 text-center text-sm font-medium'
                ]"
                :aria-current="period ? 'page' : undefined"
                @click="selectPeriod(period)"
                >{{ period }}</a
              >
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 py-5 sm:p-6">
      <div class="overflow-hidden rounded-md bg-white shadow">
        <ul role="list" class="divide-y divide-gray-200">
          <li
            v-for="post in posts"
            :key="post.id"
            class="relative flex cursor-pointer justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
          >
            <TimelineItem :post="post" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
