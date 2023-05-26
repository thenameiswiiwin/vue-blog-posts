<script lang="ts" setup>
import { ref } from 'vue'
import { useUsers } from '@/stores/usersStore'
import { useModal } from '@/composables/modal'
import type { NewUser } from '@/utils/users'
import UserForm from './UserForm.vue'

const usersStore = useUsers()
const modal = useModal()
const error = ref('')

async function handleSignin(newUser: NewUser) {
  const body = JSON.stringify(newUser)
  const res = await window.fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  if ([401, 404].includes(res.status)) {
    error.value = 'Invalid username or password'
  } else {
    usersStore.authenticate()
    modal.hideModal()
  }
}
</script>

<template>
  <UserForm heading="Sign in" @submit="handleSignin" :error="error" />
</template>
