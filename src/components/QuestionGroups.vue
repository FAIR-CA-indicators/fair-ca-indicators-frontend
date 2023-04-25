<template>
    <div v-for="sub in keys" :key='sub' > <!-- sub group -->
        <div :class="classes" class="text-white rounded-t-md w-fit pl-4 pr-4 ml-12 flex justify-center"> <!-- sub group tag -->
                {{ sub }}
        </div>
        <div class="bg-white shadow-xl p-4 rounded-2xl mb-6">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-7"></div><div class="m-auto font-medium">1</div><div class="m-auto font-medium">0.5</div><div class="m-auto font-medium">0</div><div class="m-auto font-medium">n/a</div><div class="m-auto font-medium whitespace-nowrap">no answer</div>
            </div>
                
            <div v-for="q in filterQ(qs, sub)" :key='q.name' class="grid grid-cols-12 gap-4 mb-4"><!-- question box -->
                <div class="col-span-7">
                    <div class="rounded bg-opacity-25 w-fit p-1 pl-2 pr-2" :class="classes">{{ q.priority }}</div> <!-- priority tag -->
                    <div class="flex flex-row pt-2"><img v-if="q.status != 'queued'" src="@/assets/auto-bot.svg" class="h-full my-auto"/><span class="ml-4 cursor-pointer" @click="loadExplanation(q)">{{ q.question }}</span></div> <!-- short description -->
                </div>
                <div class="m-auto"> 
                    <input :id="q.name + '-radio-1'" type="radio" value="1" :name="q.name" class="" :checked="q.status == 'success'" :disabled="q.disabled" @click="$emit('setScore', q, 'success')">
                </div>
                <div class="m-auto">
                    <input :id="q.name + '-radio-2'" type="radio" value="0.5" :name="q.name" class="" :checked="q.status == 'warnings'" :disabled="q.disabled" @click="$emit('setScore', q, 'warnings')">
                </div>
                <div class="m-auto">
                    <input :id="q.name + '-radio-3'" type="radio" value="0" :name="q.name" class="" :checked="q.status == 'failed'" :disabled="q.disabled" @click="$emit('setScore', q, 'failed')">
                </div>
                <div class="m-auto">
                    <input :id="q.name + '-radio-4'" type="radio" value="na" :name="q.name" class="" :checked="q.status == 'not_applicable'" :disabled="q.disabled" @click="$emit('setScore', q, 'not_applicable')">
                </div> 
                <div class="m-auto">
                    <input :id="q.name + '-radio-4'" type="radio" value="noaans" :name="q.name" class="" :checked="q.status == 'not_answered'" :disabled="q.disabled" @click="$emit('setScore', q, 'not_answered')">
                </div>  
            </div>                        
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue'


    export default defineComponent ({
        emits: ['setExplanation', 'setExplanationFlag', 'setScore'],
        props: {
            keys: Array as PropType<string[]>,
            qs: {
                    type: Array as PropType<{group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; status: string; disabled: boolean}[]>,
                    required: true,
            },
            classes: {
                type: String,
                required: true
            }
        },
        methods: {
        loadExplanation(q: {group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; status: string;  disabled: boolean}) {
            this.$emit('setExplanation', q);
            this.$emit('setExplanationFlag', true);
        },
        filterQ(qS: {group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; status: string;  disabled: boolean}[], sub: string) {
            let arr: {group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; status: string;  disabled: boolean}[] = [];
            qS.forEach(q => {
                if (q.sub_group == sub)
                    arr.push(q);
            });
            return arr;
        },
    }
        
    })
</script>