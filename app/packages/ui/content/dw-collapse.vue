<template>
  <span
    @click="toggleCollapse"
    class="ml-1 mt-1 flex items-center cursor-pointer"
    :class="{'text-lg': headerSize === 'small', 'text-xl': headerSize === 'large'}">
    <dw-mat-icon
      class="arrow rounded-full transition-all"
      :class="isOpen? 'rotate-90 bg-primary-100': 'bg-gray-200'">keyboard_arrow_right</dw-mat-icon>
    <span class="ml-2">{{ header }}</span>
  </span>
  <dw-slide-fade-transition>
    <div v-if="isOpen" class="pt-3 pb-2 border-l-2 pl-5 ml-4">
      <slot></slot>
    </div>
  </dw-slide-fade-transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  header: string,
  headerSize?: 'small' | 'large'
}

withDefaults(defineProps<Props>(), {
  headerSize: 'small'
})

const isOpen = ref(false)
const toggleCollapse = () => {
  isOpen.value = !isOpen.value
}
</script>
