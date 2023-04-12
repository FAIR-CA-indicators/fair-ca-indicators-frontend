<template>
        <div class="flex">
        <div class="basis-1/2 p-5">
            <h1>FAIR Combine</h1>
            <p>Fair Combine aims to automate the evaluation of models and archives following the FAIR Combine principle. </p>

            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button @click="mode = 'ex'" type="button" class="px-4 py-2 text-sm font-medium  shadow-none">
                    external URL
                </button>
                <button @click="mode = 'up'" type="button" class="px-4 py-2 text-sm font-medium border-l border-r border-gray-200">
                    upload
                </button>
                <button @click="mode = 'man'" type="button" class="px-4 py-2 text-sm font-medium shadow-none">
                    self assesment
                </button>
            </div>
            <form class="w-full flex" v-if="mode == 'ex'">
                <label> 
                </label>
                <input class="basis-2/4 shadow border rounded" type="url" placeholder="https://">
                <button class="ml-auto bg-white text-findable rounded py-2 px-4 ">Start</button>
            </form>
            <form class="w-full flex" v-else-if="mode == 'up'">
                <input type="file" >
                <button>Start</button>
            </form>
            
            <div v-else-if="mode == 'man'" class="w-full flex-col" > 
                <h3 class="mb-4 font-semibold text-white">Do you have a Combine archive in Omex format?</h3>
                <div class="flex">
                    <div class="flex items-center pl-4 ">
                        <input id="archive-radio-1" type="radio" value="" name="archive-radio" class="w-4 h-4 text-white">
                        <label for="archive-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-white">Yes</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="archive-radio-2" type="radio" value="" name="archive-radio" class="w-4 h-4 text-white">
                        <label for="archive-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-white">No</label>
                    </div>
                </div>

                <h3 class="mb-4 font-semibold text-white">Do you provide a separate “manifest.xml” file for the archive metadata?</h3>
                <div class="flex">
                    <div class="flex items-center pl-4 ">
                        <input id="meta-radio-1" type="radio" value="" name="meta-radio" class="w-4 h-4 text-white">
                        <label for="meta-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-white">Yes</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="meta-radio-2" type="radio" value="" name="meta-radio" class="w-4 h-4 text-white">
                        <label for="meta-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-white">No</label>
                    </div>
                </div>

                <h3 class="mb-4 font-semibold text-white">Do you provide the resources in the following standard formats:</h3>
                <div class="flex">
                    <div class="flex items-center pl-4 ">
                        <input id="format-radio-1" type="checkbox" value="" name="format-radio" class="w-4 h-4 text-white">
                        <label for="format-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-white">Metadata of the archive as manifest.xml</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="format-radio-2" type="checkbox" value="" name="format-radio" class="w-4 h-4 text-white">
                        <label for="format-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-white">Metadata of the model as SED-ML</label>
                    </div>
                </div>

                <h3 class="mb-4 font-semibold text-white">Is the model or archive available on the following model repositories?</h3>
                <div class="flex">
                    <div class="flex items-center pl-4 ">
                        <input id="repo-radio-1" type="checkbox" value="" name="repo-radio" class="w-4 h-4 text-white">
                        <label for="repo-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-white">Biomodels</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="repo-radio-2" type="checkbox" value="" name="repo-radio" class="w-4 h-4 text-white">
                        <label for="repo-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-white">PMR</label>
                    </div>
                </div>

                <button @click="$emit(`started`, 1)"  class="ml-auto bg-white text-findable rounded py-2 px-4">Start</button>
            </div>
        </div>
        <div class="basis-1/2 p-5">
            <ol class="list-none mb-5"> 
                <li class="flex mb-2"><span class="w-6 h-6 rounded-full border-2 flex justify-center items-center">1</span><span> Enter the URL of a combine archive </span></li>
                <li class="flex mb-2"><span class="w-6 h-6 rounded-full border-2 flex justify-center items-center">2</span> Click "Start"</li>
                <li class="flex mb-2"><span class="w-6 h-6 rounded-full border-2 flex justify-center items-center">3</span> Automatic tests start</li>
                <li class="flex mb-2"><span class="w-6 h-6 rounded-full border-2 flex justify-center items-center">4</span> Respond to a few questions</li>
                <li class="flex mb-2"><span class="w-6 h-6 rounded-full border-2 flex justify-center items-center">5</span> Get your assesment results</li>
            </ol>
        </div>
    </div>
    <div class="bg-white text-findable flex flex-wrap w-full">
        <div class="basis-1/2">
            <span class="text-6xl font-bold">Findable</span>
            <p>The first step in (re)using data is to find them. Metadata and data should be easy to find for both humans and computers. Machine-readable metadata are essential for automatic discovery of datasets and services, so this is an essential component of the FAIRification process.</p>
        </div>
        <div class="basis-1/2">
            <span class="text-6xl font-bold">Accessible</span>
            <p>Once the user finds the required data, she/he/they need to know how they can be accessed, possibly including authentication and authorisation.</p>
        </div>
        <div class="basis-1/2">
            <span class="text-6xl font-bold">Interoperable</span>
            <p>The data usually need to be integrated with other data. In addition, the data need to interoperate with applications or workflows for analysis, storage, and processing.</p>
        </div>
        <div class="basis-1/2">
            <span class="text-6xl font-bold">Reusable</span>
            <p>The ultimate goal of FAIR is to optimise the reuse of data. To achieve this, metadata and data should be well-described so that they can be replicated and/or combined in different settings.</p>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
    emits: ['started'],
    data(){
        return{
            mode: 'man',
            testInfo: null
        }
    },
    mounted(){
        console.info("Home View mounted.");
    }
})
</script>