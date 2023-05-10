<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>
