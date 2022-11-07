<template>
  <header class="mt-2 mb-[20px] flex">
    <h1 class="text-3xl font-bold inline-flex">
      <slot></slot>
    </h1>

    <div class="flex-1"></div>

    <slot name="append"></slot>
  </header>
</template>

<script lang="ts" setup></script>
