<template>
  <div>
    <h-combobox
      :model-value="internalModel"
      @update:modelValue="updateInternalModel"
      :nullable="nullable"
      :multiple="multiple"
      :disabled="loading">
      <div class="relative">
        <h-combobox-input
          class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          :displayValue="getDisplayValueOfCombobox"
          :placeholder="placeholder"
          autocomplete="off"
          role="presentation"
          :key="items"
          @change="query = $event.target.value"/>
        <!-- :key=items, because the selected text should refresh when items change or got initialized -->

        <dw-fade-transition>
          <div v-if="loading" class="absolute inset-y-0 flex items-center px-2" :class="[showClearButton ? 'right-10' : 'right-5']">
            <dw-loading-indicator class="h-4 w-4 text-gray-400"></dw-loading-indicator>
          </div>
        </dw-fade-transition>
        <div v-if="showClearButton" class="absolute inset-y-0 right-6 flex items-center px-2 cursor-pointer" @click="handleReset">
          <x-icon class="h-4 w-4 text-gray-400"></x-icon>
        </div>
        <h-combobox-button class="absolute inset-y-0 right-0 flex items-center rounded-r-md pl-0.5 pr-2 focus:outline-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </h-combobox-button>

        <h-transition-root leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" @after-leave="query = ''">
          <h-combobox-options class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div
              v-if="filteredItems.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700">
              {{ $t('ui.combobox.empty') }}
            </div>

            <h-combobox-option
              v-for="item in filteredItems"
              :key="getValue(item)"
              :value="getValue(item)"
              :disabled="getDisabled(item)"
              v-slot="{ selected, active }"
              class="relative cursor-default select-none">
              <div class="py-2 pl-10 pr-4" :class="{ 'bg-primary-500 text-white': active, 'text-gray-900': !active }">
                <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  {{ getText(item) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-primary-500': !active }">
                  <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                </span>
              </div>
            </h-combobox-option>
          </h-combobox-options>
        </h-transition-root>
      </div>
    </h-combobox>

    <div class="text-watermelon-600" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
// for the sake of simplicity we use any in this component
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/vue/solid'
import { useField } from 'vee-validate'
import { computed, getCurrentInstance, ref, toRefs, watch } from 'vue'

type SelectItemKey = string | (string | number)[] | ((item: object, fallback?: any) => any)

interface Props {
  items?: any[]
  itemText?: SelectItemKey
  itemValue?: SelectItemKey
  itemDisabled?: SelectItemKey
  placeholder?: string
  nullable?: boolean
  multiple?: boolean
  loading?: boolean
  modelValue?: any
  name?: string // for usage in forms
  errorMessageLabel?: string // displayed name in validation messages
  filter?: (item: any, queryText: string, itemText: string) => boolean
  noFilter?: boolean
  returnObject?: boolean
}

const _props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  items: () => [],
  modelValue: null,
  itemValue: 'value',
  itemText: 'text',
  itemDisabled: 'disabled',
  filter: (item: any, queryText: string, itemText: string) => {
    return itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
  },
  noFilter: false,
  returnObject: false
})
const props = toRefs(_props)
const inputName = computed<string>(() => props.name?.value || 'combobox-' + getCurrentInstance()?.uid)
const query = ref('')
const { value: useFieldValue, handleChange, handleReset, errorMessage } = useField(inputName, undefined, {
  label: props.errorMessageLabel || inputName,
  initialValue: props.modelValue
})
// acts as proxy between combobox v-model and useField model, considering props.returnObject
// internalModel is always the value and not the full item
const internalModel: any = ref(props.multiple?.value ? [] : null)
const showClearButton = computed<boolean>(() => {
  return Boolean(props.nullable).valueOf() && ((Array.isArray(internalModel.value) && internalModel.value.length > 0) || (!Array.isArray(internalModel.value) && Boolean(internalModel.value).valueOf()))
})

function updateInternalModel(newItemValue: any): void {
  internalModel.value = newItemValue

  // update useField
  // changes in useField automatically emit update:modelValue
  if (props.returnObject.value) {
    handleChange(newItemValue)
  } else {
    handleChange(getValue(newItemValue))
  }
}

function getDisplayValueOfCombobox(currentItemValue: string | string[]): string {
  if (Array.isArray(currentItemValue)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return currentItemValue.map(i => getText(getItemFromValue(i))).join(', ')
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return getText(getItemFromValue(currentItemValue))
  }
}

watch(() => props.modelValue.value, (newModelValue) => {
  let newValue: string | string[] = getValue(newModelValue)

  if (props.multiple?.value && !Array.isArray(newValue)) {
    if (newValue === null || typeof newValue === 'undefined') {
      newValue = []
    } else {
      newValue = [newValue]
    }
  }

  internalModel.value = newValue
}, { immediate: true })

watch(() => useFieldValue.value, (newUseFieldValue) => {
  let newValue: string | string[] = getValue(newUseFieldValue)

  if (props.multiple?.value && !Array.isArray(newValue)) {
    if (newValue === null || typeof newValue === 'undefined') {
      newValue = []
    } else {
      newValue = [newValue]
    }
  }

  internalModel.value = newValue
})

// ---------------------- COPIED AND PORTED TO VUE 3.0 FROM VUETIFY 2.0 ----------------------
const filteredItems = computed<object[]>(() => {
  if (props.noFilter.value || !Boolean(query.value).valueOf()) {
    return props.items.value
  }

  return props.items.value.filter(item => {
    const value = getPropertyFromItem(item, getText)
    const text = value != null ? String(value) : ''
    return props.filter.value(item, query.value, text)
  })
})

function getDisabled(item: object): boolean {
  return getPropertyFromItem(item, props.itemDisabled.value, false)
}

function getText(item: object): string {
  return getPropertyFromItem(item, props.itemText.value, item)
}

function getValue(item: object): string {
  return getPropertyFromItem(item, props.itemValue.value, getText(item))
}

function getItemFromValue(value: string | null | undefined): object | object[] | undefined {
  const safeValue: string = value ?? ''

  return props.items.value.find(i => safeValue === getValue(i))
}

function getPropertyFromItem(
    item: object,
    property: SelectItemKey,
    fallback?: any
): any {
  if (property == null) {
    return item === undefined ? fallback : item
  }

  if (item !== Object(item)) {
    return fallback === undefined ? item : fallback
  }

  if (typeof property === 'string') {
    return getObjectValueByPath(item, property, fallback)
  }

  if (Array.isArray(property)) {
    return getNestedValue(item, property, fallback)
  }

  if (typeof property !== 'function') {
    return fallback
  }

  const value = property(item, fallback)

  return typeof value === 'undefined' ? fallback : value
}

function getObjectValueByPath(obj: any, path: string, fallback?: any): any {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') {
    return fallback
  }
  if (obj[path] !== undefined) {
    return obj[path]
  }
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback)
}

function getNestedValue(obj: any, path: (string | number)[], fallback?: any): any {
  const last = path.length - 1

  if (last < 0) {
    return obj === undefined ? fallback : obj
  }

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback
    }
    obj = obj[path[i]]
  }

  if (obj == null) {
    return fallback
  }

  return obj[path[last]] === undefined ? fallback : obj[path[last]]
}
</script>
