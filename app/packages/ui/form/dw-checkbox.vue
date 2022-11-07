<template>
  <span>
    <label>
      <input
        type="checkbox"
        :class="[disabled ? 'text-gray-400 bg-gray-100' : 'focus:ring-primary-500 text-primary-600', 'h-4 w-4 border-gray-300 rounded']"
        v-model="veeValidateFieldProxy"
        :name="inputName"
        :disabled="disabled"
        :true-value="checkedValue"
        :false-value="uncheckedValue"
      />

      <span class="ml-2 text-sm font-medium select-none" v-if="label">{{ label }}</span>
    </label>

    <span class="text-watermelon-600" v-if="errorMessage">
      {{ errorMessage }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import { computed, getCurrentInstance, toRefs, watch } from 'vue'

interface Props {
  modelValue?: boolean | unknown | unknown[]
  value?: unknown
  checkedValue: boolean | unknown
  uncheckedValue?: boolean | unknown
  label?: string
  name?: string
  errorMessageLabel?: string
  rules?: string | Record<string, unknown | unknown[]>
  disabled?: boolean
}

const props = defineProps<Props>()
const { modelValue, name, uncheckedValue, checkedValue } = toRefs(props)
const inputName = computed<string>(() => name?.value || 'checkbox-' + getCurrentInstance()?.uid)
const { handleChange, errorMessage, value: veeValidateFieldValue, setValue: setVeeValidateFieldValue } = useField(inputName, props.rules, {
  type: 'checkbox',
  checkedValue: checkedValue,
  uncheckedValue: uncheckedValue,
  label: props.errorMessageLabel || inputName
})
const veeValidateFieldProxy = computed({
  get() {
    return veeValidateFieldValue.value
  },
  set(value) {
    handleChange(value)
  }
})
if (modelValue?.value) {
  setVeeValidateFieldValue(modelValue?.value)
}

watch(() => modelValue?.value, (value) => {
  handleChange(value)
})
</script>
