<script setup lang="ts">
const rings = [
  '--ring-spacing: 0; --ring-index: 5; --i: 4;',
  '--ring-spacing: 1; --ring-index: 4; --i: 3;',
  '--ring-spacing: 2; --ring-index: 3; --i: 2;',
  '--ring-spacing: 3; --ring-index: 2; --i: 1;',
  '--ring-spacing: 4; --ring-index: 1; --i: 0;'
] as const
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div class="relative h-16 w-16">
      <div
        v-for="ring in rings"
        class="animation-delay absolute left-ring-tl top-ring-tl z-[var(--ring-index)] h-ring-hw w-ring-hw animate-spinning rounded-full border-[calc(65px_*_0.05)] border-l-green-500 border-t-green-500"
        :key="ring"
        :style="ring"
      ></div>
    </div>
  </div>
</template>
