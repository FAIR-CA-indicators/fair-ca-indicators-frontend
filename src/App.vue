<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<div class="bg-findable text-white">
    <header class="flex w-full gap-x-12">
        <p>FAIR Combine</p>
        <a class="ml-auto">Home</a>
        <a>Indicators</a>
        <a>About</a>
        <a>GitHub</a>
    </header>

 
      <RouterView />

    <div class="bg-findable text-white">
        <span class="text-6xl font-bold">COMBINE</span>
    </div>
</div>
</template>
<style scoped>
</style>
