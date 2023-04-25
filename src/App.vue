<template>
<div class="font-sans">
    <header class="flex w-full gap-x-12 text-xl bg-findable text-white p-10">
        <p class="font-bold text-2xl">FAIR Combine</p>
        
        <p class="text-opacity-20 text-white ml-auto">Home</p>
        <!-- <router-link to="/" class="ml-auto cursor-pointer">Home</router-link>--> 
       <p class="text-opacity-20 text-white">Indicators</p>
        <!-- <router-link to="/indicators" class="cursor-pointer" disabled>Indicators</router-link> -->
        <p class="text-opacity-20 text-white">About</p>
       <!--  <router-link to="/about" class="cursor-pointer" :disabled="true">About</router-link> -->
        <a href="https://github.com/FAIR-CA-indicators" class="cursor-pointer"> <img src="@/assets/github-mark-white.svg" alt="GitHub" class="h-10"></a>
    </header>

 
      <RouterView />

    <div class="bg-findable text-white p-12">
        <img src="@/assets/combine_logo.svg" alt="Combine" class="max-w-sm">
        <p class="text-xl font-bold ">Coordinating standards for modeling in biology</p>
    </div>
    <div class="w-full flex flex-row m-auto p-auto justify-center gap-x-12"> <!-- logos -->
        <img class="w-1/3 max-w-md" src="@/assets/logo_uni_lcsb.svg" alt="University of Luxembourg | Luxembourg Centre for Systems Biomedicine">
        <img class="w-1/3 max-w-md" src="@/assets/UMG-Logo.svg" alt="Uinversitätsmedizin Greifswald">
    </div>
</div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
</style>
