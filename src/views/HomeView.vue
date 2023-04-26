<template>
    <StartingPoint v-if="mode == 'start'" @new-session="newSession" @load-session-id="loadRemoteSession" @load-local-session="loadLocalSession" />
    <SelfAssesment v-else-if="mode == 'manual'" :loadSessionId="loadId" :loadLocalSession="localSession" :sessionStart="sessionInput" :backend="backend" :header="header" :mode="sessionMode"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import StartingPoint from '@/components/StartingPoint.vue';
import SelfAssesment from '@/components/SelfAssesment.vue';

export default defineComponent ({
    props: {},
    data() {
        return {
            mode: "start",
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
            //header: {},       // header for local development
            header: {headers: {"ngrok-skip-browser-warning": 1}}, //header for ngrok
            loadId: "",
            localSession: Object,
            sessionMode: ''
        };
    },
    mounted() {
        console.info("Home View mounted.");
    },
    methods: {
        newSession(sessionInput: { path: string; has_archive: boolean; has_model: boolean; has_archive_metadata: boolean; is_model_standard: boolean; is_archive_standard: boolean; is_model_metadata_standard: boolean; is_archive_metadata_standard: boolean; is_biomodel: boolean; is_pmr: boolean; subject_type: string; }){
            this.sessionMode = 'newSession';
            this.sessionInput = sessionInput;
            console.debug(this.sessionInput);
            this.mode = this.sessionInput.subject_type;
        },
        loadRemoteSession(loadId: string){
            this.loadId = loadId;
            this.sessionMode = 'loadRemoteSession';
            this.mode = 'manual';
        },
        loadLocalSession(localSession: any){
            this.localSession = localSession;
            this.sessionMode = 'loadLocalSession';
            this.mode = 'manual';
        }
    },

    components: { StartingPoint, SelfAssesment }
})
</script>
