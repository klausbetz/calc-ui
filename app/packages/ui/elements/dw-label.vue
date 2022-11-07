<template>
  <span class="inline-block text-xs px-2 py-1.5 rounded-md border" :class="colorClasses">
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  type?: 'success' | 'warning' | 'error' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info'
})

const colorClasses = computed<string>(() => {
  let colors = ''

  switch (props.type) {
    case 'success':
      colors = 'text-paradise-800 bg-paradise-50 border-paradise-100'
      break
    case 'warning':
      colors = 'text-surnise-800 bg-surnise-50 border-sunrise-100'
      break
    case 'error':
      colors = 'text-watermelon-800 bg-watermelon-50 border-watermelon-100'
      break
    case 'info':
      colors = 'text-absolutezero-800 bg-absolutezero-50 border-absolutezero-100'
      break
  }

  return colors
})
</script>
