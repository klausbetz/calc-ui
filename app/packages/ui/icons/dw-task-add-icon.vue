<template>
  <svg style="height:100%; width: 100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H11" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="8.00002" y="3" width="8" height="4" rx="1" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 5H18C19.1046 5 20 5.89543 20 7V10" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="17" cy="17" r="4" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.75 17H18.25" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 18.25V15.75" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script lang="ts" setup>
interface Props {
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: 'currentColor'
})
</script>
