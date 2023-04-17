<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<div class="bg-findable text-white">
    <header class="flex w-full gap-x-12">
        <p>FAIR Combine</p>
        <router-link to="/" class="ml-auto cursor-pointer">Home</router-link>
        <router-link to="/indicators" class="cursor-pointer" disabled>Indicators</router-link>
        <router-link to="/about" class="cursor-pointer">About</router-link>
        <a href="https://github.com/FAIR-CA-indicators" class="cursor-pointer">GitHub</a>
    </header>

 
      <RouterView />

    <div class="bg-findable text-white">
        <span class="text-6xl font-bold">COMBINE</span>
    </div>
</div>
</template>
<style scoped>
</style>
