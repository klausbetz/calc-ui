<template>
  <span class="inline-flex items-center py-0.5 font-medium" :class="classes">
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  large?: boolean
  rounded?: boolean
  backgroundColor?: string
  textColor?: string
  color?: 'primary' | 'secondary' | 'grey' | 'gray' | 'rehab' | 'sunrise' | 'watermelon' | 'punch' | 'ultraviolet' | 'absolutezero' | 'fiesta' | 'loco' | 'paradise' | 'irish'
}

const props = defineProps<Props>()

const fontClasses = computed<string>(() => {
  return props.large ? 'text-sm' : 'text-xs'
})

const roundedClasses = computed<string>(() => {
  return !props.rounded ? 'rounded-full' : props.large ? 'rounded-md' : 'rounded'
})

const paddingClasses = computed<string>(() => {
  return props.large ? 'px-3' : 'px-2.5'
})

const backgroundColorClasses = computed<string>(() => {
  let classes = 'bg-gray-100'

  if (props.backgroundColor && props.backgroundColor.length > 0) {
    classes = props.backgroundColor
  } else if (props.color) {
    classes = _colorClasses.value.backgroundColor
  }

  return classes
})

const textColorClasses = computed<string>(() => {
  let classes = 'text-gray-800'

  if (props.textColor && props.textColor.length > 0) {
    classes = props.textColor
  } else if (props.color) {
    classes = _colorClasses.value.textColor
  }

  return classes
})

const _colorClasses = computed<{ textColor: string, backgroundColor: string }>(() => {
  let textColor = ''
  let backgroundColor = ''

  switch (props.color) {
    case 'primary':
      textColor = 'text-primary-100'
      backgroundColor = 'bg-primary-800'
      break
    case 'secondary':
      textColor = 'text-primary-800'
      backgroundColor = 'bg-primary-100'
      break
    case 'grey':
      textColor = 'text-grey-800'
      backgroundColor = 'bg-grey-100'
      break
    case 'gray':
      textColor = 'text-gray-800'
      backgroundColor = 'bg-gray-100'
      break
    case 'rehab':
      textColor = 'text-rehab-800'
      backgroundColor = 'bg-rehab-100'
      break
    case 'sunrise':
      textColor = 'text-sunrise-800'
      backgroundColor = 'bg-sunrise-100'
      break
    case 'watermelon':
      textColor = 'text-watermelon-800'
      backgroundColor = 'bg-watermelon-100'
      break
    case 'punch':
      textColor = 'text-punch-800'
      backgroundColor = 'bg-punch-100'
      break
    case 'ultraviolet':
      textColor = 'text-ultraviolet-800'
      backgroundColor = 'bg-ultraviolet-100'
      break
    case 'absolutezero':
      textColor = 'text-absolutezero-800'
      backgroundColor = 'bg-absolutezero-100'
      break
    case 'fiesta':
      textColor = 'text-fiesta-800'
      backgroundColor = 'bg-fiesta-100'
      break
    case 'loco':
      textColor = 'text-loco-800'
      backgroundColor = 'bg-loco-100'
      break
    case 'paradise':
      textColor = 'text-paradise-800'
      backgroundColor = 'bg-paradise-100'
      break
    case 'irish':
      textColor = 'text-irish-800'
      backgroundColor = 'bg-irish-100'
      break
  }

  return {
    textColor,
    backgroundColor
  }
})

const classes = computed<string[]>(() => {
  return [fontClasses.value, roundedClasses.value, paddingClasses.value, backgroundColorClasses.value, textColorClasses.value]
})
</script>
