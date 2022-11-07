<template>
  <span
    class="[height:1em] [width:1em] select-none"
    aria-hidden="true"
    :class="{'material-icons': variant === 'default', 'material-icons-outlined': variant === 'outlined', 'material-icons-round': variant === 'round', 'material-icons-two-tone': variant === 'two-tone', 'material-icons-sharp': variant === 'sharp'}">
    <slot></slot>
  </span>
</template>

<script lang="ts">
// https://marella.me/material-design-icons/demo/font/
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    variant: {
      required: false,
      default: 'default',
      type: String as PropType<'default' | 'round' | 'outlined' | 'sharp' | 'two-tone'>
    }
  }
})
</script>
