<template>
  <dw-container class="flex flex-col h-full">
    <dw-page-header>
      Calculator
      <template #append>
        <dw-btn :to="router.resolveSettings().href">
          <dw-mat-icon variant="two-tone">settings</dw-mat-icon>
        </dw-btn>
      </template>
    </dw-page-header>
    <main class="flex flex-col relative flex-1 pb-4">
      <div class="flex">
        <p class="text-2xl font-bold text-center mt-6 mb-4 flex-1">{{ totalPrice }} €</p>
        <div class="flex items-center">
          <dw-btn class="grow-0" @click="resetItems" size="xs">
            <dw-mat-icon variant="round">replay</dw-mat-icon>
          </dw-btn>
        </div>
      </div>

      <div class="relative flex-1">
        <div class="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto">
          <dw-data-table hide-pagination :headers="header" :items="items" class="flex-1">
            <template #item:name="{item}">
              {{ item.lineItem.name }}
            </template>

            <template #item:count="{item}">
              {{ item.count }}
            </template>

            <template #item:price="{item}">
              {{ formatNumber(item.lineItem.priceInCents) }}
            </template>

            <template #item:priceTotal="{item}">
              {{ formatNumberMultiplier(item.lineItem.priceInCents, item.count) }}
            </template>
          </dw-data-table>
        </div>
      </div>

      <div class="grow-0 space-x-1 mt-2">
        <dw-btn v-for="setting in settings" @click="addItem(setting)" class="mt-1">{{ setting.name }}</dw-btn>
      </div>
    </main>
  </dw-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { LineItem } from '@calculator/common/model/line-item'
import { computed, Ref, ref } from 'vue'
import { LineItemCount } from '@calculator/home/model/LineItemCount'
import { itemSettings } from '@calculator/common/queries'

const router = useRouter()
const header: TableHeader<LineItem>[] = [
  {
    text: '',
    value: 'name'
  },
  {
    text: 'Stk.',
    value: 'count'
  },
  {
    text: '€/Stk',
    value: 'price'
  },
  {
    text: '€',
    value: 'priceTotal'
  }
]
const items: Ref<LineItemCount[]> = ref([])
const settings = itemSettings
const totalPrice = computed(() => {
  const price = items.value.map(i => i.count * parseInt(i.lineItem.priceInCents)).reduce((sum, value) => sum + value, 0)
  return formatNumber(price)
})

function formatNumber(number: number | string): string {
  if (typeof number === 'string') {
    return (parseInt(number) / 100).toFixed(2).toString()
  }

  return (number / 100).toFixed(2).toString()
}

function formatNumberMultiplier(number: number | string, multiplier: number): string {
  if (typeof number === 'string') {
    return formatNumber(parseInt(number) * multiplier)
  }

  return formatNumber(number * multiplier)
}

function addItem(setting: LineItem) {
  const affectedRow = items.value.find(i => i.lineItem === setting)

  if (!affectedRow) {
    items.value.push({ lineItem: setting, count: 1 })
    return
  }

  affectedRow.count++
}

function resetItems() {
  items.value = []
}
</script>
