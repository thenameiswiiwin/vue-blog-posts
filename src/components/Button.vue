<script lang="ts" setup>
import { cva, type VariantProps } from 'class-variance-authority'

type ButtonProps = Required<VariantProps<typeof button>>

defineProps<{ intent: ButtonProps['intent']; size: ButtonProps['size'] }>()

const button = cva(
  'relative inline-flex items-center gap-x-1.5 rounded-md border-2 border-green-600 text-sm font-semibold shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
  {
    variants: {
      intent: {
        primary:
          'bg-green-600 text-white hover:border-green-500 hover:bg-green-500',
        secondary:
          'bg-white text-green-600 hover:bg-green-100 focus-visible:outline',
        icon: 'border-none bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        tertiary:
          'flex justify-center bg-green-600 leading-6 text-white hover:border-green-500 hover:bg-green-500 disabled:opacity-25 disabled:focus:outline-none'
      },
      size: {
        small: 'px-2 py-1',
        medium: 'w-full px-2 py-1',
        icon: ''
      }
    },
    defaultVariants: {
      intent: 'primary',
      size: 'small'
    }
  }
)
</script>

<template>
  <button v-on="$attrs" :class="button({ intent, size })">
    <slot />
  </button>
</template>
