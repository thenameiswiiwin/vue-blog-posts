<script lang="ts" setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Modal from '@/components/Modal.vue'
import FormInput from '@/components/FormInput.vue'

const username = ref('')
</script>

<template>
  <Modal />
  <div class="overflow-hidden rounded-lg bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="pt-4">
        <FormInput name="Username" v-model="username" />
      </div>
      <NavBar />
      <RouterView />
      {{ username }}
    </div>
  </div>
</template>
