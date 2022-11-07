<template>
  <vv-field v-if="name" :name="name" v-model="model" :rules="rules" v-slot="{ field }" :label="errorMessageLabel || name">
    <textarea
      v-bind="{...field, ...$attrs}"
      class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
    <vv-error-message :name="name" as="span" class="text-sm text-watermelon-600"/>
  </vv-field>

  <textarea
    v-else
    v-model="model"
    v-bind="$attrs"
    class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: String,
    rules: {
      type: [Object, String, Function],
      default: undefined
    },
    name: String,
    errorMessageLabel: String
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const model = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        context.emit('update:modelValue', value)
      }
    })

    return { model }
  }
})
</script>
