<template>
  <dw-link
    :to="to"
    class="inline-block py-1 px-2 rounded-md text-sm leading-5"
    active-class="bg-primary-light hover:bg-primary-light-2 text-primary-500"
    inactive-class="text-grey-500 hover:bg-grey-50">
    <slot></slot>
  </dw-link>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'

interface Props {
  to: RouteLocationRaw
}

defineProps<Props>()
</script>
