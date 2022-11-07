<template>
  <dw-link v-if="to" :to="to" v-bind="$attrs">
    <slot></slot>
  </dw-link>
  <span v-else v-bind="$attrs" class="cursor-default">
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'

interface Props {
  to?: RouteLocationRaw
}

defineProps<Props>()
</script>
