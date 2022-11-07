<template>
  <dw-container>
    <dw-page-header>
      <dw-btn :to="router.resolveHome().fullPath" size="xs">
        <dw-mat-icon>arrow_back</dw-mat-icon>
      </dw-btn>
      &nbsp;
      Einstellungen

      <template #append>
        <dw-btn size="xs" @click="resetSettings">
          <dw-mat-icon variant="round">replay</dw-mat-icon>
        </dw-btn>
      </template>
    </dw-page-header>
    <main>
      <dw-btn @click="addItem">
        <template #leading>
          <dw-mat-icon variant="outlined">add_box</dw-mat-icon>
        </template>
        Hinzufügen
      </dw-btn>

      <div class="max-w-[500px] mt-2 space-y-1">
        <div class="flex" v-for="setting in settingsToWork">
          <dw-input type="text" v-model="setting.name"></dw-input>
          <dw-input type="number" v-model="setting.priceInCents"></dw-input>
          <dw-btn class="flex-none ml-1" @click="removeItem(setting)">
            <dw-mat-icon variant="round">remove_circle_outline</dw-mat-icon>
          </dw-btn>
        </div>
      </div>
    </main>
  </dw-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { LineItem } from '@calculator/common/model/line-item'
import { Ref } from 'vue'
import { itemSettings } from '@calculator/common/queries'

const router = useRouter()

function resetSettings() {
  settingsToWork.value = [
    { name: '🍫', priceInCents: '150' },
    { name: '🥪🧀', priceInCents: '150' },
    { name: '🥪🍖', priceInCents: '150' },
    { name: '🍺', priceInCents: '200' },
    { name: '🧃', priceInCents: '200' }
  ]
}

const settingsToWork: Ref<LineItem[]> = itemSettings

function addItem() {
  settingsToWork.value.push({ name: '🆕', priceInCents: '100' })
}

function removeItem(item: LineItem) {
  const index = settingsToWork.value.indexOf(item)
  if (index > -1) {
    settingsToWork.value.splice(index, 1)
  }
}
</script>
