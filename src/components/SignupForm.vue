<script lang="ts" setup>
import { useUsers } from '@/stores/usersStore'
import { useModal } from '@/composables/modal'
import type { NewUser } from '@/utils/users'
import UserForm from './UserForm.vue'

const usersStore = useUsers()
const modal = useModal()

async function handleSignup(newUser: NewUser) {
  await usersStore.createUser(newUser)
  modal.hideModal()
}
</script>

<template>
  <UserForm heading="Sign up" @submit="handleSignup" :show="true" />
</template>
