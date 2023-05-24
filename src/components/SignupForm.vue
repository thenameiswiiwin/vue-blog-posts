<script lang="ts" setup>
import { computed, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import { validate, length, required } from '@/utils/validation'
import { NewUser } from '@/utils/users'

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

function handleSubmit() {
  if (isInvalid.value) return
  const newUser: NewUser = {
    username: username.value,
    password: password.value
  }

  console.log(newUser)
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
        Sign up to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <FormInput
          name="Username"
          v-model="username"
          :status="usernameStatus"
        />
        <FormInput
          name="Password"
          v-model="password"
          :status="passwordStatus"
        />
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-25 disabled:focus:outline-none"
          :disabled="isInvalid"
          @submit="handleSubmit"
        >
          Sign up
        </button>
      </form>
    </div>
  </div>
</template>
