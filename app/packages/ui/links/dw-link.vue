<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot/>
  </a>
  <router-link
    v-else
    :to="to"
    :aria-current-value="ariaCurrentValue"
    :replace="replace"
    custom
    v-slot="{ isExactActive, isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="getActiveClasses(isActive || $route.path.startsWith($router.resolve(to).path), isExactActive)">
      <slot/>
    </a>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({ inheritAttrs: false })
</script>

<script lang="ts" setup>
import { computed } from 'vue'

// https://router.vuejs.org/guide/advanced/extending-router-link.html
import { RouteLocationRaw } from 'vue-router'

interface Props {
  to: string | RouteLocationRaw,
  replace?: boolean,
  activeClass?: string,
  inactiveClass?: string,
  exactActiveClass?: string,
  ariaCurrentValue?: string,
}

const props = defineProps<Props>()

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})

function getActiveClasses(isActive: boolean, isExactActive: boolean): string[] {
  const classes: string[] = []

  if (isActive || isExactActive) {
    if (isActive && props.activeClass) {
      classes.push(props.activeClass)
    }
    if (isExactActive && props.exactActiveClass) {
      classes.push(props.exactActiveClass)
    }
  }

  if (classes.filter(c => Boolean(c).valueOf()).length === 0 && props.inactiveClass) {
    classes.push(props.inactiveClass)
  }

  return classes
}
</script>
