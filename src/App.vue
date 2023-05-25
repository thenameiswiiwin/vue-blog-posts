<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import Modal from '@/components/Modal.vue'
import { useUsers } from './stores/usersStore'

const usersStore = useUsers()

usersStore.authenticate()
</script>

<template>
  <Modal />
  <div class="overflow-hidden rounded-lg bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>
