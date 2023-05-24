<script setup lang="ts">
import TimelineItem from './TimelineItem.vue'
import { periods, type Period } from '@/utils/constants'
import { usePostsStores } from '@/stores/postsStores'

const postsStore = usePostsStores()

function onPeriodChange(e: Event) {
  const target = e.target as HTMLInputElement
  postsStore.setSelectedPeriod(target.value as Period)
}

await postsStore.fetchPosts()
</script>

<template>
  <div>
    <div class="rounded-lg px-4 py-5 shadow-lg sm:px-6 sm:py-2">
      <div>
        <div class="sm:hidden">
          <label for="periods" class="sr-only">Select a period</label>
          <select
            id="periods"
            name="periods"
            class="block w-full cursor-pointer rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
            @change="onPeriodChange"
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
                  postsStore.setIsActive(period)
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 cursor-pointer border-b-2 px-1 py-4 text-center text-sm font-medium'
                ]"
                :aria-current="period ? 'page' : undefined"
                @click="postsStore.setSelectedPeriod(period)"
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
            v-for="post in postsStore.filteredPosts"
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
