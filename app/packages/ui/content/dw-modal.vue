<template>
  <slot name="activator" :on="on"></slot>
  <TransitionRoot as="template" :show="internalOpen">
    <Dialog as="div" class="relative z-10" :open="internalOpen" @close="internalOpen = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
              <slot name="body">
                <div class="sm:flex sm:items-start">
                  <div
                    v-if="$slots.icon"
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <slot name="icon"></slot>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <slot name="header"></slot>
                    <div v-if="$slots.text" class="mt-2">
                      <slot name="text"></slot>
                    </div>
                  </div>
                </div>
                <div v-if="$slots.actions" class="mt-5 sm:mt-4 sm:flex justify-end space-x-2">
                  <slot name="actions"></slot>
                </div>
              </slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref, toRefs, watch } from 'vue'

interface Props {
  open?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false
})
const emits = defineEmits<{ (e: 'update:open', open: boolean): void }>()
const { open: openProp } = toRefs(props)
const internalOpen = ref(props.open)

const on = {
  click: () => {
    internalOpen.value = true
  }
}

watch(() => internalOpen.value, (value) => {
  emits('update:open', value)
})
watch(() => openProp.value, (value) => {
  internalOpen.value = value
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({ inheritAttrs: false })
</script>
