<script lang="ts" setup>
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import type { Status } from '@/utils/validation'

defineProps<{
  name: string
  modelValue: string
  status: Status
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function handleInput(e: Event) {
  const { value } = e.target as HTMLInputElement
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="relative">
    <label
      :for="name"
      class="absolute -top-2 left-2 z-10 inline-block bg-white px-1 text-xs font-medium text-gray-900"
      >{{ name }}</label
    >
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        type="text"
        name="name"
        aria-invalid="true"
        aria-describedby="username-error"
        :id="name"
        :value="modelValue"
        @input="handleInput"
        class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationCircleIcon
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
          v-if="!status.valid"
        />
      </div>
    </div>
    <p
      class="mt-2 text-sm text-red-600"
      id="username-error"
      v-if="!status.valid"
    >
      {{ status.message }}
    </p>
  </div>
</template>
