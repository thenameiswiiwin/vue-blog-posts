<script lang="ts" setup>
defineProps<{
  name: string
  modelValue: string
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
      class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
      >{{ name }}</label
    >
    <input
      type="text"
      name="name"
      :id="name"
      :value="modelValue"
      @input="handleInput"
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:pl-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
    />
  </div>
</template>
