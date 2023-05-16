<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import Modal from '@/components/Modal.vue'
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

<style>
@import 'highlight.js/styles/tokyo-night-dark.css';

ul {
  list-style: revert !important;
  list-style-type: inside !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 10px 0 !important;
  font-size: revert !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}
</style>
