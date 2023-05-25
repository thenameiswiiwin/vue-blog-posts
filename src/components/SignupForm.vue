<script lang="ts" setup>
import { computed, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import Button from '@/components/Button.vue'
import { validate, length, required } from '@/utils/validation'
import type { NewUser } from '@/utils/users'
import { useUsers } from '@/stores/usersStore'
import { useModal } from '@/composables/modal'

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

const usersStore = useUsers()
const modal = useModal()

async function handleSubmit() {
  if (isInvalid.value) return
  const newUser: NewUser = {
    username: username.value,
    password: password.value
  }

  try {
    await usersStore.createUser(newUser)
  } catch (e) {
    // TODO: handle error
  }

  modal.hideModal()
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
          type="text"
          :status="usernameStatus"
        />
        <FormInput
          name="Password"
          v-model="password"
          type="password"
          :status="passwordStatus"
        />
        <Button
          type="submit"
          size="medium"
          intent="tertiary"
          :disabled="isInvalid"
          @submit="handleSubmit"
        >
          Sign up
        </Button>
      </form>
    </div>
  </div>
</template>
