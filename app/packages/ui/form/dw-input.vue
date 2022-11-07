<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" v-if="icon">
      <dw-mat-icon>{{ icon }}</dw-mat-icon>
    </div>
    <input
      :value="value"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      :class="{'pl-10': icon}"
      :type="type"/>
    <span class="text-sm text-watermelon-600" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import { computed, getCurrentInstance, toRefs } from 'vue'

interface Props {
  modelValue?: string
  name?: string
  errorMessageLabel?: string
  type?: string
  placeholder?: string
  icon?: string
}

const props = defineProps<Props>()
const { name: nameProp, errorMessageLabel: errorMessageLabelProp, modelValue: modelValueProp } = toRefs(props)
const inputName = computed<string>(() => nameProp?.value || 'input-' + getCurrentInstance()?.uid)
const { value, handleChange, handleBlur, errorMessage } = useField(inputName, undefined, {
  label: errorMessageLabelProp,
  initialValue: modelValueProp
})
</script>
