<template>
  <th
    scope="col"
    class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
    :class="{ 'px-6 py-3': !sortable }">
    <ColumnSorting v-if="sortable" :sort-by="sortBy" class="px-6 py-3">
      <slot/>
    </ColumnSorting>
    <slot v-else/>
  </th>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnSorting from './column-sorting.vue'

export default defineComponent({
  name: 'TableHeadCell',
  components: { ColumnSorting },
  props: {
    sortBy: String,
    sortable: Boolean
  }
})
</script>
