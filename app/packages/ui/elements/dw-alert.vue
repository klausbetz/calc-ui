<template>
  <h-disclosure v-slot="{ open }">
    <div class="rounded-md p-4" :class="colorClasses.backgroundColor">
      <div class="flex">
        <div class="flex flex-shrink-0 items-center">
          <dw-mat-icon :class="colorClasses.iconColor">{{ icon }}</dw-mat-icon>
        </div>

        <div class="ml-3 flex-1 md:flex md:justify-between flex-col">
          <span class="text-sm" :class="colorClasses.textColor">
            <slot></slot>

            <h-disclosure-button class="py-2" v-if="$slots.details">
              <span class="font-bold">{{ open ? $t('ui.alert.hide') : $t('ui.alert.showMore') }}</span>
            </h-disclosure-button>
          </span>

          <span class="text-sm" :class="colorClasses.textColor" v-if="$slots.details">
            <h-disclosure-panel>
              <slot name="details"></slot>
            </h-disclosure-panel>
          </span>
        </div>
      </div>
    </div>
  </h-disclosure>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  type?: 'success' | 'info' | 'warning' | 'error'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info'
})

const icon = computed<string>(() => {
  let iconName = ''

  switch (props.type) {
    case 'success':
      iconName = 'checkbold'
      break
    case 'info':
      iconName = 'information'
      break
    case 'warning':
      iconName = 'warning'
      break
    case 'error':
      iconName = 'warning'
  }

  return iconName
})

const colorClasses = computed<{ textColor: string, iconColor: string, backgroundColor: string }>(() => {
  let textColor = ''
  let iconColor = ''
  let backgroundColor = ''

  switch (props.type) {
    case 'success':
      textColor = 'text-irish-700'
      iconColor = 'text-irish-400'
      backgroundColor = 'bg-irish-50'
      break
    case 'info':
      textColor = 'text-fiesta-700'
      iconColor = 'text-fiesta-400'
      backgroundColor = 'bg-fiesta-50'
      break
    case 'warning':
      textColor = 'text-sunrise-700'
      iconColor = 'text-sunrise-400'
      backgroundColor = 'bg-sunrise-50'
      break
    case 'error':
      textColor = 'text-watermlon-700'
      iconColor = 'text-watermelon-400'
      backgroundColor = 'bg-watermelon-50'
      break
  }

  return {
    textColor,
    iconColor,
    backgroundColor
  }
})
</script>
