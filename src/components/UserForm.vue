<script lang="ts" setup>
import { computed, ref } from 'vue'
import FormInput from './FormInput.vue'
import Button from './Button.vue'
import { validate, length, required } from '@/utils/validation'
import type { NewUser } from '@/utils/users'

defineProps<{
  error?: string
  heading: string
  show?: boolean
}>()

const emit = defineEmits<{
  (event: 'submit', payload: NewUser): void
}>()

const username = ref('')
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 20 })])
})

const password = ref('')
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 40 })])
})

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid
})

async function handleSubmit() {
  if (isInvalid.value) return
  const newUser: NewUser = {
    username: username.value,
    password: password.value
  }

  try {
    emit('submit', newUser)
  } catch (e) {
    // TODO: handle error
    console.log(e)
  }
}
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        {{ heading }} to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <FormInput
          name="Username"
          v-model="username"
          type="text"
          :show="show"
          :status="usernameStatus"
        />
        <FormInput
          name="Password"
          v-model="password"
          type="password"
          :show="show"
          :status="passwordStatus"
        />
        <div v-if="error" class="mt-2 text-sm text-red-600">
          {{ error }}
        </div>
        <Button
          type="submit"
          size="medium"
          intent="tertiary"
          :disabled="isInvalid"
          @submit="handleSubmit"
        >
          {{ heading }}
        </Button>
      </form>
    </div>
  </div>
</template>
