<template>
    <div class="flex bg-findable text-white p-10 ">
        <div class="basis-1/2 p-5 rounded-lg space-y-4 ">
            <h1 class="text-6xl font-bold"><span class="bg-clip-text text-transparent bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end">FAIR</span> Combine</h1>
            <p class="pt-6">Fair Combine aims to automate the evaluation of models and archives following the FAIR Combine principle. </p>

            <div class="flex rounded-md shadow-none items-center justify-center divide-x" role="group">
                <button @click="sessionInput.subject_type = 'url'" type="button" class="px-4 py-2 text-sm font-medium text-white disabled:text-opacity-40" disabled>
                    external URL
                </button>
                <button @click="sessionInput.subject_type = 'file'" type="button" class="px-4 py-2 text-sm font-medium  text-white disabled:text-opacity-40" disabled>
                    upload
                </button>
                <button @click="sessionInput.subject_type = 'manual'" type="button" class="px-4 py-2 text-sm font-medium  text-white disabled:text-opacity-40">
                    self assessment
                </button>
                <button @click="sessionInput.subject_type = 'load'" type="button" class="px-4 py-2 text-sm font-medium  text-white disabled:text-opacity-40">
                    load session
                </button>
            </div>
            <form class="w-full flex" v-if="sessionInput.subject_type == 'url'">
                <label> 
                </label>
                <input class="basis-2/4 border rounded" type="url" placeholder="https://">
                <button class="ml-auto bg-white text-findable rounded py-2 px-4 ">Start</button>
            </form>
            <form class="w-full flex" v-else-if="sessionInput.subject_type == 'file'">
                <input type="file" >
                <button class="m-auto bg-white">Start</button>
            </form>
            <div class="w-full rounded max-w-2xl m-auto space-y-6 " v-else-if="sessionInput.subject_type == 'load'">
                <form class="w-full flex flex-row space-x-6">
                    <input type="file" class="block w-full text-sm text-white border-2 rounded-xl
                                                file:mr-4 file:py-2 file:px-4
                                                file:border-0 file:border-white
                                                file:text-sm file:font-semibold
                                                file:bg-white" @change="fileChange">
                    <button type="button" class="bg-white text-findable disabled:bg-opacity-50 disabled:text-opacity-50 rounded-lg px-4" @click="loadLocalSession" :disabled="fileSelected">Load</button>
                </form>
                <form class="w-full h-10 flex flex-row space-x-6">
                    <input class="block w-full bg-findable text-sm text-white border-2 rounded-xl" type="text" @input="(event) => {loadId = event.target.value; idInserted = false;}">
                    <button type="button" class="bg-white text-findable disabled:bg-opacity-50 disabled:text-opacity-50 rounded-lg px-4" @click="loadRemoteSession" :disabled="idInserted">Load</button>
                </form>
            </div>
            <div v-else-if="sessionInput.subject_type == 'manual'" class="w-full flex-col p-4 shadow-glow shadow-findable-stroke border-findable-stroke border-2 rounded-lg" > 
                <h3 class="mb-4 font-semibold text-white">Do you have a single model file or a Combine archive in Omex format?</h3>
                <div class="flex">
                    <div class="flex items-center pl-4 ">
                        <input id="single-modal-radio" type="radio" value="has_archive" @change="sessionInput.has_archive = sessionInput.has_model; sessionInput.has_model = !sessionInput.has_model" name="archive-radio" class="w-4 h-4 text-white">
                        <label for="single-modal-radio" class="w-full py-4 ml-2 text-sm font-medium text-white">Single Model File</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="archive-radio-2" type="radio" value="has_model" @change="sessionInput.has_model = sessionInput.has_archive; sessionInput.has_archive = !sessionInput.has_archive" name="archive-radio" class="w-4 h-4 text-white">
                        <label for="archive-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-white">Combine Archive</label>
                    </div>
                </div>

                <h3 class="mb-4 font-semibold text-white">Do you provide metadata?</h3>
                <div class="flex">
                    <div class="flex items-center pl-4 ">
                        <input id="meta-radio-1" type="radio" value="has_metadata" @click="sessionInput.has_archive_metadata = true" name="meta-radio" class="w-4 h-4 text-white">
                        <label for="meta-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-white">Yes</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="meta-radio-2" type="radio" value="has_metadata" @click="sessionInput.has_archive_metadata = false" name="meta-radio" class="w-4 h-4 text-white">
                        <label for="meta-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-white">No</label>
                    </div>
                </div>

                <h3 class="mb-4 font-semibold text-white">Do you provide the resources in the following standard formats:</h3>
                <div class="grid grid-cols-2">
                    <div class="flex items-center pl-4 ">
                        <input id="modal-standard-radio-1" type="radio" value="is_model_standard" @change="sessionInput.is_model_standard = true" name="modal-standard-radio" class="w-4 h-4 text-white">
                        <label for="modal-standard-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-white">Model as SBML</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="modal-standard-radio-2" type="radio" value="is_model_standard" @change="sessionInput.is_model_standard = true" name="modal-standard-radio" class="w-4 h-4 text-white">
                        <label for="modal-standard-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-white">Model as CellML</label>
                    </div>
                    <div class="flex items-center pl-4 ">
                        <input id="format-radio-1" type="checkbox" value="meta_standard" @change="sessionInput.is_archive_metadata_standard = !sessionInput.is_archive_metadata_standard" name="format-radio" class="w-4 h-4 text-white">
                        <label for="format-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-white">Metadata of the archive as manifest.xml</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="format-radio-2" type="checkbox" value="meta_standard" @change="sessionInput.is_model_metadata_standard = !sessionInput.is_model_metadata_standard" name="format-radio" class="w-4 h-4 text-white">
                        <label for="format-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-white">Metadata of the model as SED-ML</label>
                    </div>
                </div>

                <h3 class="mb-4 font-semibold text-white">Is the model or archive available on the following model repositories?</h3>
                <div class="flex">
                    <div class="flex items-center pl-4 ">
                        <input id="repo-check-1" type="checkbox" value="true" v-model="sessionInput.is_biomodel"  name="repo-radio" class="w-4 h-4 text-white">
                        <label for="repo-chekc-1" class="w-full py-4 ml-2 text-sm font-medium text-white">Biomodels</label>
                    </div>
                    <div class="flex items-center pl-4">
                        <input id="repo-check-2" type="checkbox" value="true" v-model="sessionInput.is_pmr" name="repo-radio" class="w-4 h-4 text-white">
                        <label for="repo-check-2" class="w-full py-4 ml-2 text-sm font-medium text-white">PMR</label>
                    </div>
                </div>
                <div class="flex w-full items-center justify-center">
                    <button @click="startSession()"  class="bg-white text-findable rounded py-2 px-4">Start</button>
                </div>
            </div>

        </div>
        <div v-if="sessionInput.subject_type == 'url'" class="basis-1/2 p-5 text-xl">
            <ol class="list-none"> 
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">1</span><span> Enter the URL of a combine archive </span></li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">2</span> Click "Start"</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">3</span> Automatic tests start</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">4</span> Respond to a few questions</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">5</span> Get your assesment results</li>
            </ol>
        </div>
        <div v-else-if="sessionInput.subject_type == 'file'" class="basis-1/2 p-5 flex justify-center items-center text-xl">
            <ol class="list-none"> 
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">1</span><span> Select your local modal or archive </span></li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">2</span> Click "Start"</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">3</span> Automatic tests start</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">4</span> Respond to a few questions</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">5</span> Get your assesment results</li>
            </ol>
        </div>
        <div v-else-if="sessionInput.subject_type == 'manual'" class="basis-1/2 p-5 flex justify-center items-center text-xl">
            <ol class="list-none"> 
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">1</span> Describe your digital object</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">2</span> Click "Start"</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">3</span> Do the self assessment</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">4</span> Get your assesment results</li>
            </ol>
        </div>
        <div v-else-if="sessionInput.subject_type == 'load'" class="basis-1/2 p-5 flex justify-center items-center text-xl">
            <ol class="list-none"> 
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">1</span> Enter your session ID or select your session file</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">2</span> Click "Load"</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">3</span> Continue the self assessment</li>
                <li class="flex mb-4 items-center"><span class="w-10 h-10 rounded-full border-2 mr-2 flex justify-center items-center">4</span> Get your assesment results</li>
            </ol>
        </div>
    </div>
    <div class="bg-white text-findable p-10 flex flex-wrap w-full gap-y-8 ">
        <div class="flex justify-center basis-1/2 py-auto">
            <div class="bg-light-background rounded-lg drop-shadow-md w-fit p-10 ">
                <div class="flex flex-row text-2xl font-bold items-center"><span class="">Findable</span><img class="h-24 ml-auto" src="@/assets/Zoom Out.svg"></div>
                <p class="max-w-lg pt-6">The first step in (re)using data is to find them. Metadata and data should be easy to find for both humans and computers. Machine-readable metadata are essential for automatic discovery of datasets and services, so this is an essential component of the FAIRification process.</p>
            </div>
        </div>
        <div class="flex justify-center basis-1/2">
            <div class="bg-light-background rounded-lg drop-shadow-md w-fit p-10">
                <div class="flex flex-row text-2xl font-bold items-center"><span class="">Accessibility</span><img class="h-24 ml-auto" src="@/assets/accessibility icon.svg"></div>
                <p class="max-w-lg pt-6">Once the user finds the required data, she/he/they need to know how they can be accessed, possibly including authentication and authorisation.</p>
            </div>
        </div>
        <div class="flex justify-center basis-1/2">
            <div class="bg-light-background rounded-lg drop-shadow-md w-fit p-10">
                <div class="flex flex-row text-2xl font-bold items-center"><span class="">Interoperable</span><img class="h-24 ml-auto" src="@/assets/interroperable icon.svg"></div>
                <p class="max-w-lg pt-6">The data usually need to be integrated with other data. In addition, the data need to interoperate with applications or workflows for analysis, storage, and processing.</p>
            </div>
        </div>
        <div class="flex justify-center basis-1/2">
            <div class="bg-light-background rounded-lg drop-shadow-md w-fit p-10">
                <div class="flex flex-row text-2xl font-bold items-center"><span class="">Reusable</span><img class="h-24 ml-auto" src="@/assets/reprocible icon.svg"></div>
                <p class="max-w-lg pt-6">The ultimate goal of FAIR is to optimise the reuse of data. To achieve this, metadata and data should be well-described so that they can be replicated and/or combined in different settings.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
    emits: ['newSession', 'loadSessionId', 'loadLocalSession'],
    data(){
        return{
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
            sessionLoad: Object,
            loadId: "",
            fileSelected: true,
            idInserted: true

        }
    },
    mounted(){
        console.info("Home View mounted.");
    },
    watch: {
         sessionInput: {
                handler(newSession){
                    
                console.debug("new", newSession);
            },
            deep: true 
    }
    },
    beforeMount() {
        this.sessionInput.subject_type = "manual";
        this.sessionInput.has_archive = false;
        this.sessionInput.has_model = false;
        this.sessionInput.has_archive_metadata = false;
        this.sessionInput.is_model_standard = false;
        this.sessionInput.is_archive_standard = false;
        this.sessionInput.is_model_metadata_standard = false;
        this.sessionInput.is_archive_metadata_standard = false;
        this.sessionInput.is_biomodel = false;
        this.sessionInput.is_pmr = false;
    },
    methods: {
        startSession: function(){
            //if(!this.sessionInput.path) this.sessionInput.path = null;
            //alert(this.sessionInput.path);

            console.log(this.sessionInput);
            this.$emit('newSession', this.sessionInput);
        },
        fileChange: function(event: any){
            const file = event.target.files[0];
            console.debug(file);
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                console.debug(event);
                this.sessionLoad = JSON.parse(event.target.result);
                this.fileSelected = false;

            });
            reader.readAsText(file);

        },
        loadLocalSession: function(){
            console.debug(typeof this.sessionLoad, this.sessionLoad);
            this.$emit('loadLocalSession', this.sessionLoad);
        },
        loadRemoteSession: function(){
            this.$emit('loadSessionId', this.loadId);
        }
    }
})
</script>