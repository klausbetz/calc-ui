<template>
  <dw-container>
    <dw-page-header>
      <dw-btn :to="router.resolveHome().fullPath" size="xs" class="touch-manipulation">
        <dw-mat-icon>arrow_back</dw-mat-icon>
      </dw-btn>
      &nbsp;
      Einstellungen

      <template #append>
        <dw-btn size="xs" @click="resetSettings" class="touch-manipulation">
          <dw-mat-icon variant="round">replay</dw-mat-icon>
        </dw-btn>
      </template>
    </dw-page-header>
    <main>
      <dw-btn @click="addItem" class="touch-manipulation">
        <template #leading>
          <dw-mat-icon variant="outlined">add_box</dw-mat-icon>
        </template>
        HinzufÃ¼gen
      </dw-btn>

      <div class="max-w-[500px] mt-2 mb-4 space-y-1">
        <div class="flex" v-for="setting in settingsToWork">
          <dw-input type="text" v-model="setting.name"></dw-input>
          <dw-input type="number" v-model="setting.priceInCents"></dw-input>
          <dw-btn class="flex-none ml-1 touch-manipulation" @click="removeItem(setting)">
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
    { name: 'ðº', priceInCents: '250' },
    { name: 'ð·ð§Â¼', priceInCents: '200' },
    { name: 'ð·Â¼', priceInCents: '280' },
    { name: 'ð·â', priceInCents: '180' },
    { name: 'ð§', priceInCents: '150' },
    { name: 'ð§', priceInCents: '200' },
    { name: 'ðð§', priceInCents: '150' },
    { name: 'ð¥ªð§', priceInCents: '180' },
    { name: 'ð«', priceInCents: '100' },
    { name: 'ð¥', priceInCents: '250' }
  ]
}

const settingsToWork: Ref<LineItem[]> = itemSettings

function addItem() {
  settingsToWork.value.push({ name: 'ð', priceInCents: '100' })
}

function removeItem(item: LineItem) {
  const index = settingsToWork.value.indexOf(item)
  if (index > -1) {
    settingsToWork.value.splice(index, 1)
  }
}
</script>
