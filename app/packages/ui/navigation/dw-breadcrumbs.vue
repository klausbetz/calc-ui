<template>
  <div>
    <nav class="sm:hidden" aria-label="Back">
      <slot name="back">
        <app-link-or-span :to="backLink" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
          <ChevronLeftIcon class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
          Back
        </app-link-or-span>
      </slot>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-4">
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <div class="flex items-center">
            <slot name="divider" v-if="index > 0">
              <span class="flex-shrink-0 w-5 text-gray-400 select-none cursor-default" aria-hidden="true">/</span>
            </slot>
            <app-link-or-span class="text-sm font-medium text-gray-500 hover:text-gray-700" :to="breadcrumb.href">
              {{ breadcrumb.title }}
            </app-link-or-span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ChevronLeftIcon } from '@heroicons/vue/outline'
import { RouteLocationRaw } from 'vue-router'
import AppLinkOrSpan from '../links/dw-link-or-span.vue'

interface Props {
  backLink?: RouteLocationRaw
  breadcrumbs: { title: string, href?: RouteLocationRaw }[]
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => []
})
</script>
