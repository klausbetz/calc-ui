<template>
  <div>
    <span class="inline-flex items-center cursor-pointer group" @click="toggleSorting">
      <slot/>
      <slot name="sorting-asc-icon" :is-sorted="isCurrentColumnSorted" :sort-desc="sortDesc">
        <span :class="[isCurrentColumnSorted ? 'bg-gray-200 text-gray-900 group-hover:bg-gray-300' : 'invisible text-gray-400 group-hover:visible group-focus:visible', ' ml-2 flex-none rounded']">
          <ChevronDownIcon
            :class="[isCurrentColumnSorted && sortDesc ? 'rotate-180' : '', 'transition-transform h-5 w-5']"
            aria-hidden="true"/>
        </span>
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { computed, defineComponent, inject, ref } from 'vue'
import { SortableColumn, SortableColumnInjectionKey } from '../../dw-data-table.vue'

export default defineComponent({
  name: 'ColumnSorting',
  components: { ChevronDownIcon },
  props: {
    sortBy: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { sortBy, sortDesc, setSorting } = inject<SortableColumn>(SortableColumnInjectionKey, () => ({
      sortBy: ref(undefined),
      sortDesc: ref(false),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setSorting() {
      }
    }), true)

    const isCurrentColumnSorted = computed<boolean>(() => {
      return Boolean(sortBy.value).valueOf() && sortBy.value === props.sortBy
    })

    const toggleSorting = () => {
      // sorting click cycle: no sort -> asc -> desc -> no sort -> ...
      let nextDirection: 'asc' | 'desc' | null

      if (isCurrentColumnSorted.value) {
        if (sortDesc.value) {
          nextDirection = null
        } else {
          nextDirection = 'desc'
        }
      } else {
        nextDirection = 'asc'
      }

      if (nextDirection) {
        setSorting(props.sortBy, nextDirection === 'desc')
      } else {
        setSorting(undefined, false)
      }
    }

    return {
      isCurrentColumnSorted,
      sortDesc,
      toggleSorting
    }
  }
})
</script>
