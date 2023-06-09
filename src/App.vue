<template>
<div class="font-sans">
    <header class="flex w-full gap-x-12 text-xl bg-findable text-white p-10  items-center">
        <p class="font-bold text-2xl">FAIR Combine</p>
        
       <!--  <p class="text-opacity-20 text-white ml-auto">Home</p> -->
        <router-link to="/" class="ml-auto cursor-pointer">Home</router-link> 
       <!-- <p class="text-opacity-20 text-white">Indicators</p> -->
        <router-link to="/indicators" class="cursor-pointer" disabled>Indicators</router-link>
        <!-- <p class="text-opacity-20 text-white">About</p> -->
        <router-link to="/about" class="cursor-pointer" :disabled="true">About</router-link>
        <a href="https://github.com/FAIR-CA-indicators" class="cursor-pointer"> <img src="@/assets/github-mark-white.svg" alt="GitHub" class="h-10"></a>
    </header>

    <RouterView @new-session="newSession" @load-session-id="loadRemoteSession" @load-local-session="loadLocalSession" :backend="backend"/>

    <div class="w-full">
        <img class="object-fill h-full w-full" src="@/assets/footer-border.svg">
    </div>
    <div class="bg-findable text-white p-12">
        <img src="@/assets/combine_logo.png" alt="Combine" class="max-w-sm w-40 rounded-full">
        <p class="text-xl font-bold ">Coordinating standards for modeling in biology</p>
        <a href="https://co.mbine.org/">Learn more</a>
    </div>
    <div class="w-1/2 flex flex-col mx-auto items-center gap-y-8 pt-8">
        <div class="w-full flex flex-col items-center gap-y-6">
            <h3 class="text-6xl text-findable font-bold">Ready to start?</h3>
            <div class="grid grid-cols-3 gap-x-6">
                <div class=""></div>
                <button class="bg-findable text-white rounded-2xl p-3 w-52 h-min text-2xl place-self-end" @click="scrollToTop">Back to top</button>
                <img src="@/assets/fancy_arrow.svg" class="w-12">
            </div>
        </div>
        <div class="border-t-4 w-1/4 border-light-stroke "></div>
        <div class="w-full flex flex-row gap-x-12 justify-center">
            <router-link to="/" class="cursor-pointer">Home</router-link> 
            <router-link to="/indicators" class="cursor-pointer" disabled>Indicators</router-link>
            <router-link to="/about" class="cursor-pointer" :disabled="true">About</router-link>
            <a href="https://github.com/FAIR-CA-indicators" class="cursor-pointer">GitHub repository</a>
        </div>
        <div class="w-full flex flex-row m-auto p-auto justify-center gap-x-12"> <!-- logos -->
            <img class="w-1/3 max-w-md" src="@/assets/logo_uni_lcsb.svg" alt="University of Luxembourg | Luxembourg Centre for Systems Biomedicine">
            <img class="w-1/3 max-w-md" src="@/assets/UMG-Logo.svg" alt="Uinversitätsmedizin Greifswald">
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { RouterLink, RouterView } from 'vue-router';
import router from './router';

import { mapWritableState } from 'pinia';
import { useAssessmentStore } from './stores/AssessmentStore';

export default defineComponent ({
    props: {},
    data() {
        return {
            start: 0,
            sessionInput: {} as {
                "has_archive": boolean,
                "has_model": boolean,
                "has_archive_metadata": boolean,
                "is_model_standard": boolean,
                "is_archive_standard": boolean,
                "is_model_metadata_standard": boolean,
                "is_archive_metadata_standard": boolean,
                "is_biomodel": boolean,
                "is_pmr": boolean,
                "subject_type": string
            },
            backend: "http://localhost:8000",   //backend url for local development
            //backend: ,  //backend url for ngrok
            //header: {headers: {"ngrok-skip-browser-warning": 1}}, //header for ngrok
            loadId: "",
            localSession: Object,
            sessionMode: ''
        };
    },
    mounted() {
        console.info("Home View mounted.");
    },
    computed: {
        ...mapWritableState (useAssessmentStore, ["sessionType"]),
    },
    methods: {
        newSession(){
            this.sessionType = 'newSession';
            router.push({ name: 'newSession'})
            //router.push({ name: 'session', params: { username: 'eduardo' } })
        },
        loadRemoteSession(loadId: string){
            this.loadId = loadId;
            this.sessionType = 'loadRemoteSession';
        },
        loadLocalSession(localSession: any){
            this.localSession = localSession;
            this.sessionType = 'loadLocalSession';
        },
        scrollToTop(){
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }
})
</script>

<style scoped>
</style>
