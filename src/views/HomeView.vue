<template>
    <StartingPoint v-if="mode == 'start'" @started="started"/>
    <SelfAssesment v-else-if="mode == 'manual'" :sessionStart="sessionInput"/>
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
            }

        };
    },
    mounted() {
        console.info("Home View mounted.");
    },
    methods: {
        started(sessionInput: { path: string; has_archive: boolean; has_model: boolean; has_archive_metadata: boolean; is_model_standard: boolean; is_archive_standard: boolean; is_model_metadata_standard: boolean; is_archive_metadata_standard: boolean; is_biomodel: boolean; is_pmr: boolean; subject_type: string; }){
            this.sessionInput = sessionInput;
            console.debug("???????");
            console.debug(this.sessionInput);
            this.mode=this.sessionInput.subject_type;
        }
    },

    components: { StartingPoint, SelfAssesment }
})
</script>
