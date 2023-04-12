<template>
    <StartingPoint v-if="start==0" @started="start = 1"/>
    <SelfAssesment v-else/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import StartingPoint from '@/components/StartingPoint.vue';
import SelfAssesment from '@/components/SelfAssesment.vue';

export default defineComponent ({
    props: {},
    data() {
        return {
            mode: "man",
            start: 0
        };
    },
    mounted() {
        console.info("Home View mounted.");
    },
    components: { StartingPoint, SelfAssesment }
})
</script>
