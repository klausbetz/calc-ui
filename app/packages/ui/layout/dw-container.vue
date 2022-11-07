<template>
  <div class="mx-auto" :class="padding">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  padding?: string
}

withDefaults(defineProps<Props>(), {
  padding: 'px-3.5 sm:px-6 lg:px-8'
})
</script>
