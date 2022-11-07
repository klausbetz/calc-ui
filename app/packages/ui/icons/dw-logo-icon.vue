<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 292.7 160"
    style="enable-background:new 0 0 292.7 160; fill: currentColor;"
    xml:space="preserve">
    <g>
      <path
        :class="{'animate-pulse-hard-pause': animated}"
        d="M36.9,144.5c-1.1,0-2.3-0.2-3.4-0.6C28,142,25,136,26.9,130.5l24-69.7c1.9-5.5,7.9-8.4,13.4-6.5c5.5,1.9,8.4,7.9,6.5,13.4
        l-24,69.7C45.3,141.8,41.3,144.5,36.9,144.5z"/>
      <path
        :class="[animated ? 'animate-pulse-hard-pause [animation-delay:100ms]' : '']"
        d="M84,144.5c-1.1,0-2.3-0.2-3.4-0.6c-5.5-1.9-8.4-7.9-6.5-13.4L110.8,24c1.9-5.5,7.9-8.4,13.4-6.5c5.5,1.9,8.4,7.9,6.5,13.4
        L94,137.4C92.5,141.8,88.4,144.5,84,144.5z"/>
      <path
        :class="[animated ? 'animate-pulse-hard-pause [animation-delay:200ms]' : '']"
        d="M128.9,144.5c-1.1,0-2.3-0.2-3.4-0.6c-5.5-1.9-8.4-7.9-6.5-13.4L155.6,24c1.9-5.5,7.9-8.4,13.4-6.5
        c5.5,1.9,8.4,7.9,6.5,13.4l-36.7,106.5C137.3,141.8,133.3,144.5,128.9,144.5z"/>
      <path
        :class="[animated ? 'animate-pulse-hard-pause [animation-delay:300ms]' : '']"
        d="M173.3,144.5c-1.1,0-2.3-0.2-3.4-0.6c-5.5-1.9-8.4-7.9-6.5-13.4l24-69.7c1.9-5.5,7.9-8.4,13.4-6.5
        c5.5,1.9,8.4,7.9,6.5,13.4l-24,69.7C181.8,141.8,177.7,144.5,173.3,144.5z"/>
      <path
        :class="[animated ? 'animate-pulse-hard-pause [animation-delay:400ms]' : '']"
        d="M219.1,144.5c-1.1,0-2.3-0.2-3.4-0.6c-5.5-1.9-8.4-7.9-6.5-13.4L245.8,24c1.9-5.5,7.9-8.4,13.4-6.5
        c5.5,1.9,8.4,7.9,6.5,13.4L229,137.4C227.5,141.8,223.4,144.5,219.1,144.5z"/>
    </g>
  </svg>
</template>

<script lang="ts" setup>
interface Props {
  animated?: boolean
}

defineProps<Props>()
</script>
