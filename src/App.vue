<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>
