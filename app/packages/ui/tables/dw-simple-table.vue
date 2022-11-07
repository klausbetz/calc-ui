<template>
  <dw-data-table
    :headers="transformedHeaders"
    :items="transformedContent"
    vertical-lines
    hide-pagination
    class="w-full"
  ></dw-data-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  headers: string[]
  content: string[][],
}

const props = defineProps<Props>()

const transformedHeaders = computed(() => props.headers.map((h, idx) => {
  return { text: h, value: idx.toString(), cellClass: '', sortable: true }
}))
const transformedContent = computed(() => props.content.map(row => {
  return transformedHeaders.value.reduce<Record<string, string>>((mappedRow, header, idx) => {
    mappedRow[idx.toString()] = row[idx]
    return mappedRow
  }, {} as Record<string, string>)
}))
</script>
