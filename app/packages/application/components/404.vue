<template>
  <div>
    <h1>404</h1>
    <p>{{ route.fullPath }} ist nicht erreichbar</p>
    <router-link to="/login">Zurück zur Startseite</router-link>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>