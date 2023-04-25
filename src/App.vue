<template>
<div class="font-sans">
    <header class="flex w-full gap-x-12 text-xl bg-findable text-white p-10">
        <p class="font-bold text-2xl">FAIR Combine</p>
        <router-link to="/" class="ml-auto cursor-pointer">Home</router-link>
        <p class="text-opacity-20 text-white">Indicators</p>
        <!-- <router-link to="/indicators" class="cursor-pointer" disabled>Indicators</router-link> -->
        <p class="text-opacity-20 text-white">About</p>
       <!--  <router-link to="/about" class="cursor-pointer" :disabled="true">About</router-link> -->
        <a href="https://github.com/FAIR-CA-indicators" class="cursor-pointer"> <img src="@/assets/github-mark-white.svg" alt="GitHub" class="h-10"></a>
    </header>

 
      <RouterView />

    <div class="bg-findable text-white">
        <span class="text-6xl font-bold">COMBINE</span>
    </div>
</div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
</style>
