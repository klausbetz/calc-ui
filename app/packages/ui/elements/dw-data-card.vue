<template>
  <div class="rounded-[5px] border-2 inline-block" :class="widthClass">
    <div v-if="title">
      <div class="text-sm font-semibold text-grey-900 p-4">{{ title }}</div>
      <div class="w-full border-t border-gray-200"/>
    </div>
    <div class="grid gap-y-3 gap-x-[32px] p-4" :class="gridColsClass">
      <div v-for="item in content" :key="item.headline">
        <div class="text-sm font-semibold text-grey-900">{{ item.headline }}</div>
        <div class="text-sm text-gray-500">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  title?: string
  content: { headline: string, content: string }[]
}

const props = defineProps<Props>()

const gridColsClass = computed<string>(() => props.content.length >= 4 ? 'grid-cols-2' : '')
const widthClass = computed<string>(() => props.content.length >= 4 ? 'w-[800px]' : 'w-[400px]')
</script>
