<template>
  <div class="rounded-[5px] border border-gray-100 overflow-hidden sm:shadow">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-100 select-none">
        <slot name="thead" :columns="tableColumns" :set-sort="setSort" :sort-by="sortBy" :sort-desc="sortDesc">
          <thead class="bg-gray-50">
          <tr :class="{ 'divide-x divide-grey-100': verticalLines }">
            <TableHeadCell
              v-for="column in tableColumns"
              :key="`datatable-thead-th-${column.value}`"
              :sort-by="column.value"
              :sortable="column.sortable"
              :class="column.cellClass">
              {{ column.text }}
            </TableHeadCell>
          </tr>
          </thead>
        </slot>

        <tbody :class="{ 'divide-y divide-grey-100': !striped }">
        <slot name="row" v-for="(row, rowIndex) in tableRows">
          <tr
            :class="{ 'divide-x divide-grey-100': verticalLines, 'bg-white': !striped, 'odd:bg-white even:bg-gray-50': striped, 'hover:bg-gray-100': hoverable, 'cursor-pointer': hasClickRowListener }"
            :key="`datatable-row-${uniqueId()}-${rowIndex}`"
            @click="rowClickHandler(row)">
            <td
              class="px-4 py-3 whitespace-nowrap text-sm font-normal text-gray-500 select-auto"
              :class="column.bodyCellClass"
              v-for="column in tableColumns"
              :key="`datatable-tbody-td-${uniqueId()}-${column.value}`">
              <slot :name="`item:${column.value.replaceAll('.', ':')}`" :item="row">
                {{ getItemText(row, column.value) }}
              </slot>
            </td>
          </tr>
        </slot>

        <tr v-if="tableRows.length === 0 && !loading" class="bg-white">
          <slot name="empty">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500 select-none" :colspan="tableColumns.length">
              Keine Daten
            </td>
          </slot>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
// https://github.com/JoBinsJP/vue3-datatable

import { computed, defineComponent, InjectionKey, PropType, provide, Ref, ref, watch } from 'vue'
import TableHeadCell from './components/table/table-head-cell.vue'

export const SortableColumnInjectionKey = Symbol('sortable column injection key symbol') as InjectionKey<SortableColumn>

export interface SortableColumn {
  sortBy: Ref<string | undefined>
  sortDesc: Ref<boolean>
  setSorting: (sortBy: string | undefined, sortDesc: boolean) => void
}

export default defineComponent({
  inheritAttrs: false,
  name: 'DataTable',
  components: {
    TableHeadCell
  },
  props: {
    items: { type: Array as PropType<unknown[]>, default: () => [] },
    // eslint-disable-next-line no-undef
    headers: { type: Array as PropType<TableHeader<unknown>[]>, required: false, default: () => [] },
    loading: { type: Boolean },
    serverPagination: { type: Boolean },
    page: { type: Number, default: 0 },
    itemsPerPage: { type: Number, default: 10 },
    totalItems: { type: Number, default: -1 },
    sortBy: { type: String, default: undefined },
    sortDesc: { type: Boolean },
    serverSort: { type: Boolean },
    itemsPerPageOptions: {
      type: Array as PropType<Array<number>>,
      required: false,
      default: () => [5, 10, 25, 100, -1]
    },
    hidePagination: { type: Boolean },
    striped: { type: Boolean },
    hoverable: { type: Boolean },
    verticalLines: { type: Boolean }
  },

  emits: [
    'update:table-options',
    'update:sort-by',
    'update:sort-desc',
    'update:page',
    'update:itemsPerPage' /* 'click:row' is missing on purpose, since we can check if it is bound when not mentioned in emits array */
  ],

  setup(props, context) {
    const internalSortBy = ref<string | undefined>(props.sortBy)
    const internalSortDesc = ref<boolean>(props.sortDesc)
    const internalPage = ref<number>(0)
    const internalItemsPerPage = ref<number>(props.itemsPerPage)
    const totalData = computed(() => props.totalItems !== -1 ? props.totalItems : props.items.length)
    // eslint-disable-next-line no-undef
    const tableColumns = computed<TableHeader<unknown>[]>(() => {
      if (props.headers && props.headers.length > 0) {
        return props.headers
      }

      if (props.items.length === 0) {
        return []
      }

      // eslint-disable-next-line no-undef
      return Object.keys(props.items[0] as object).map<TableHeader<unknown>>(key => ({
        text: formatToTableHeader(key),
        value: key
      }), [])
    })
    const sortedRows = computed<unknown[]>(() => {
      let sortedRows = props.items

      if (internalSortBy.value && !props.serverSort) {
        // eslint-disable-next-line no-undef
        const defaultSortMethod: TableHeader<unknown>['sort'] = (a, b) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const _a = resolveDotPath((a as object), internalSortBy.value!)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const _b = resolveDotPath((b as object), internalSortBy.value!)

          if (_a === _b) {
            return 0
          } else if (_a === null) {
            return 1
          } else if (_b === null) {
            return -1
          } else {
            if (typeof _a === 'number' && typeof _b === 'number') {
              return _a - _b
            } else {
              return (_a as object).toString().localeCompare((_b as object).toString())
            }
          }
        }
        const columnSortMethod = tableColumns.value.find(c => c.value === internalSortBy.value)?.sort

        sortedRows = sortedRows.slice().sort(typeof columnSortMethod !== 'undefined' ? columnSortMethod : defaultSortMethod)

        if (internalSortDesc.value) {
          sortedRows.reverse()
        }
      }

      return sortedRows
    })

    /**
     *
     * @param index
     * @param page 0-indexed (Page 1 = 0)
     * @param itemsPerPage
     */
    function isIndexWithinPage(index: number, page: number, itemsPerPage: number): boolean {
      const lowestIndexOfPage = page * itemsPerPage
      const highestIndexOfPage = ((page + 1) * itemsPerPage) - 1
      return index >= lowestIndexOfPage && index <= highestIndexOfPage
    }

    const tableRows = computed<unknown[]>(() => {
      return sortedRows.value.filter((row, index) => props.serverPagination || internalItemsPerPage.value === -1 || isIndexWithinPage(index, internalPage.value, internalItemsPerPage.value))
    })
    const paginatedRowIndex = computed(() => internalItemsPerPage.value * internalPage.value)
    const hasClickRowListener = computed<boolean>(() => Boolean(context.attrs['onClick:row']).valueOf())

    function getItemText(row: unknown, key: string) {
      return typeof row === 'object' ? resolveDotPath(row as object, key) : row
    }

    function resolveDotPath(object: object, path: string): unknown {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return path.split('.').reduce((o, i) => o[i], object)
      } catch (e) {
        return ''
      }
    }

    function formatToTableHeader(value: string): string {
      const formattedStr = value.toLowerCase().replace(/[-_]/g, ' ')

      return formattedStr.split(' ').map(word => {
        return (word.charAt(0).toUpperCase() + word.slice(1))
      }).join(' ')
    }

    const uniqueId = () => Math.floor(Math.random() * 100000)

    const rowClickHandler = (row: unknown): void => {
      if (context.attrs['onClick:row']) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        context.emit('click:row', row)
      }
    }

    function setSort(sortBy: string | undefined, sortDesc: boolean) {
      internalSortBy.value = sortBy
      internalSortDesc.value = sortDesc
      internalPage.value = 0
    }

    watch(() => internalSortBy.value, () => {
      context.emit('update:sort-by', internalSortBy.value)
    })

    watch(() => props.sortBy, () => {
      internalSortBy.value = props.sortBy
    })

    watch(() => internalSortDesc.value, () => {
      context.emit('update:sort-desc', internalSortDesc.value)
    })

    watch(() => props.sortDesc, () => {
      internalSortDesc.value = props.sortDesc
    })

    watch(() => internalPage.value, () => {
      context.emit('update:page', internalPage.value)
    })

    watch(() => props.page, () => {
      internalPage.value = props.page
    })

    watch(() => internalItemsPerPage.value, () => {
      context.emit('update:itemsPerPage', internalItemsPerPage.value)
    })

    watch(() => props.itemsPerPage, () => {
      internalItemsPerPage.value = props.itemsPerPage
    })

    provide<SortableColumn>(SortableColumnInjectionKey, {
      sortBy: internalSortBy,
      sortDesc: internalSortDesc,
      setSorting: setSort
    })

    return {
      totalData,
      tableRows,
      tableColumns,
      paginatedRowIndex,
      internalPage,
      internalItemsPerPage,
      uniqueId,
      hasClickRowListener,
      rowClickHandler,
      setSort,
      getItemText
    }
  }
})
</script>
