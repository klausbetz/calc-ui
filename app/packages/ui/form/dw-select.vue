<template>
  <h-listbox as="div" :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :multiple="multiple">
    <h-listbox-label v-if="label" class="block text-sm font-medium text-gray-700">{{ label }}</h-listbox-label>
    <div class="mt-1 relative">
      <h-listbox-button>
        <slot name="selected" :selected="modelValue">
          <div class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
            <span class="block truncate">{{ getText(modelValue) }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <dw-mat-icon>arrow_drop_down</dw-mat-icon>
            </span>
          </div>
        </slot>
      </h-listbox-button>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <h-listbox-options class="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <h-listbox-option as="div" v-for="(item, index) in items" :key="index" :value="item" v-slot="{ active, selected, disabled }">
            <slot name="item" :active="active" :selected="selected" :disabled="disabled" :item="item">
              <li :class="[active ? 'text-white bg-primary-600' : 'text-gray-900', 'cursor-pointer select-none relative py-2 pl-3 pr-9']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block whitespace-nowrap']">
                {{ getText(item) }}
              </span>
              </li>
            </slot>
          </h-listbox-option>
        </h-listbox-options>
      </transition>
    </div>
  </h-listbox>
</template>

<script lang="ts" setup>
defineProps<{ modelValue: unknown | { text?: string, value?: string }, items: (unknown | { text?: string, value?: string })[], label?: string, multiple?: boolean }>()
defineEmits<{ 'update:modelValue': (e: string | null) => void }>()

function getText(item: unknown | { text?: string, value?: string }) {
  if (typeof item === 'object') {
    return (item as { text?: string })?.text || ''
  } else {
    return item
  }
}
</script>
