<template>
    <div class="flex flex-col h-full justify-center px-4">
        <div class="m-auto relative h-1/2"><!-- tacho  w-full container relative border-light-stroke border-b-2 -->
            <h3 class="font-bold whitespace-nowrap absolute -top-6 left-1/2 transform -translate-x-1/2">{{ title }}</h3>
            <img class="m-auto h-full" src="@/assets/tacho_ring.svg"> <!-- score tacho absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-75 -->                               
            <img  class="absolute  left-1/2 top-1/2 h-full"  :style="{transform: `translatex(-50%) translatey(-50%) rotate(${score * 2.6 - 130}deg) scale(50%) ` }" id="needle" src="@/assets/tacho_needle.svg">  <!-- score needle --> <!-- :class="`rotate-[${score * 2.6 - 130}deg]` -->
            <div class="font-bold absolute left-1/2 -bottom-3 transform -translate-x-1/2 ">{{ score }}%</div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            score: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        },
        data (){

        },
        mounted(){
            console.debug(this.score);
            //alert("ad");
        }
    })
</script>