<template>
  <dw-link
    class="select-none inline-flex justify-center items-center"
    :class="classes"
    v-if="to"
    :to="to"
    :exact-active-class="exactActiveClass"
    :inactive-class="inactiveClass"
    :active-class="activeClass">
    <span :class="[loading ? 'opacity-0' : 'opacity-100', 'transition-opacity flex justify-center items-center']">
      <span v-if="$slots.leading" :class="leadingSlotClasses">
        <slot name="leading"></slot>
      </span>

      <span :class="defaultSlotClasses">
        <slot></slot>
      </span>

      <span v-if="$slots.trailing" :class="trailingSlotClasses">
        <slot name="trailing"></slot>
      </span>
    </span>
  </dw-link>

  <button v-else class="select-none inline-flex justify-center items-center" :class="classes" :type="type">
    <span :class="[loading ? 'opacity-0' : 'opacity-100', 'transition-opacity flex justify-center items-center']">
      <span v-if="$slots.leading" :class="leadingSlotClasses">
        <slot name="leading"></slot>
      </span>

      <span :class="defaultSlotClasses">
        <slot></slot>
      </span>

      <span v-if="$slots.trailing" :class="trailingSlotClasses">
        <slot name="trailing"></slot>
      </span>
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export default defineComponent({
  props: {
    loading: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    size: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
      default: 'md'
    },
    primary: Boolean,
    secondary: Boolean,
    rounded: Boolean,
    circular: Boolean,
    to: [String, Object] as PropType<RouteLocationRaw>,
    inactiveClass: String,
    activeClass: String,
    exactActiveClass: String
  },
  setup(props) {
    const sizeClasses = computed<Record<'leading' | 'default' | 'trailing' | 'circularContent', string>>(() => {
      switch (props.size) {
        case 'xs':
          return {
            leading: '-ml-0.5 mr-2 h-4 w-4',
            default: props.circular ? 'p-1 text-xs' : 'px-2.5 py-1.5 text-xs rounded',
            trailing: '-mr-0.5 ml-2 h-4 w-4',
            circularContent: 'h-5 w-5'
          }
        case 'sm':
          return {
            leading: '-ml-0.5 mr-2 h-4 w-4',
            default: props.circular ? 'p-1.5 text-xs' : 'px-3 py-2 text-sm rounded-md leading-4',
            trailing: '-mr-0.5 ml-2 h-4 w-4',
            circularContent: 'h-5 w-5'
          }
        case 'md':
          return {
            leading: '-ml-1 mr-2 h-5 w-5',
            default: props.circular ? 'p-2 text-xs' : 'px-4 py-2 text-sm rounded-md',
            trailing: '-mr-1 ml-2 h-5 w-5',
            circularContent: 'h-5 w-5'
          }
        case 'lg':
          return {
            leading: '-ml-1 mr-3 h-5 w-5',
            default: props.circular ? 'p-2 text-xs' : 'px-4 py-2 text-base rounded-md',
            trailing: 'ml-3 -mr-1 h-5 w-5',
            circularContent: 'h-6 w-6'
          }
        case 'xl':
          return {
            leading: '-ml-1 mr-3 h-5 w-5',
            default: props.circular ? 'p-3 text-xs' : 'px-6 py-3 text-base rounded-md',
            trailing: 'ml-3 -mr-1 h-5 w-5',
            circularContent: 'h-6 w-6'
          }
        default:
          return {
            leading: '',
            default: '',
            trailing: '',
            circularContent: ''
          }
      }
    })

    const leadingSlotClasses = computed<string>(() => {
      return [sizeClasses.value.leading, 'inline-block'].join(' ')
    })

    const trailingSlotClasses = computed<string>(() => {
      return [sizeClasses.value.trailing, 'inline-block'].join(' ')
    })

    const loadingClasses = computed<string>(() => {
      return props.loading ? 'cursor-default pointer-events-none' : ''
    })

    const primaryClasses = computed<string>(() => {
      let classes = 'border border-transparent font-medium text-white bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 shadow-sm'

      if (!props.loading) {
        classes = [classes, 'hover:bg-primary-500'].join(' ')
      }

      return props.primary ? classes : ''
    })

    const secondaryClasses = computed<string>(() => {
      let classes = 'border border-transparent font-medium text-primary-700 bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'

      if (!props.loading) {
        classes = [classes, 'hover:bg-primary-200'].join(' ')
      }

      return props.secondary ? classes : ''
    })

    const whiteClasses = computed<string>(() => {
      let classes = 'border border-gray-300 shadow-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'

      if (!props.loading) {
        classes = [classes, 'hover:bg-gray-50'].join(' ')
      }

      return !props.primary && !props.secondary ? classes : ''
    })

    const roundedClasses = computed<string>(() => {
      return props.rounded ? 'rounded-full' : ''
    })

    const circularClasses = computed<string>(() => {
      return props.circular ? 'rounded-full' : ''
    })

    const defaultSlotClasses = computed<string[]>(() => {
      return [props.circular ? sizeClasses.value.circularContent : '']
    })

    const classes = computed<string[]>(() => {
      return [
        sizeClasses.value.default,
        loadingClasses.value,
        primaryClasses.value,
        secondaryClasses.value,
        whiteClasses.value,
        roundedClasses.value,
        circularClasses.value
      ]
    })

    return {
      classes,
      defaultSlotClasses,
      leadingSlotClasses,
      trailingSlotClasses
    }
  }
})
</script>
