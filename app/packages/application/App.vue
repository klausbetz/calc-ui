<template>
  <default-layout>
    <router-view></router-view>
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QueryClient, useQueryProvider } from 'vue-query'
import DefaultLayout from '@calculator/application/layout/default-layout.vue'

export default defineComponent({
  components: { DefaultLayout },
  props: {
    queryClient: {
      type: QueryClient,
      required: true
    }
  },
  setup(props) {
    useQueryProvider(props.queryClient)
  }
})
</script>
