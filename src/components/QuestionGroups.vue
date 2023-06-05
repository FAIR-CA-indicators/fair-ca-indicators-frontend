<template>
    <div v-for="sub in keys" :key='sub' > <!-- sub group -->
        <div :class="classes" class="text-white rounded-t-md w-fit pl-4 pr-4 ml-12 flex justify-center"> <!-- sub group tag -->
                {{ sub }}
        </div>
        <div class="bg-white shadow-xl p-4 rounded-2xl mb-6">
            <div class="bg-white grid grid-cols-12 gap-4 sticky top-0">
                <div class="col-span-7"></div><div class="m-auto font-medium">1</div><div class="m-auto font-medium">0.5</div><div class="m-auto font-medium">0</div><div class="m-auto font-medium">n/a</div><div class="m-auto font-medium whitespace-nowrap">no answer</div>
            </div>
                
            <div v-for="(q,index) in filterQ(qs, sub)" :key='q.name' ><!-- question box -->
                <div v-if="!(q.disabled && hideDisabled) " class="grid grid-cols-12 gap-4 mb-4">
                    <div class="col-span-7">
                        <div class="rounded w-fit p-1 pl-2 pr-2" :class="addOpacitiy(classes, q.priority)">{{ q.priority }}</div> <!-- priority tag -->
                        <div class="flex flex-row pt-2">     <!-- short description -->
                            <img v-if="q.automated == true" src="@/assets/auto-bot.svg" class="h-full my-auto w-6"/>
                            <div v-else class="w-6"></div>
                            <span class="ml-4 cursor-pointer" @click="loadExplanation(q)">{{ (index + 1) + '.' }}<span class="ml-4">{{ q.question }}</span></span>
                        </div>
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
                    type: Array as PropType<{group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; status: string; disabled: boolean; automated: boolean}[]>,
                    required: true,
            },
            classes: {
                type: String,
                required: true
            },
            hideDisabled: Boolean
        },
        methods: {
        loadExplanation(q: {group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; status: string;  disabled: boolean; automated: boolean}) {
            this.$emit('setExplanation', q);
            this.$emit('setExplanationFlag', true);
        },
        filterQ(qS: {group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; status: string;  disabled: boolean; automated: boolean}[], sub: string) {
            let arr: {group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; status: string;  disabled: boolean; automated: boolean}[] = [];
            qS.forEach(q => {
                if (q.sub_group == sub && !(q.disabled && this.hideDisabled))
                    arr.push(q);
            });
            return arr;
        },
        addOpacitiy(inheritedClasses: string, priority: string){
            console.log(inheritedClasses);
            let opacity;
            if(priority == 'essential') opacity = '40';
            else if(priority == 'important') opacity = '20';
            else if(priority == 'useful') opacity = '5';
            else alert(priority);

            return inheritedClasses + ' bg-opacity-' + opacity;
        }
    }
        
    })
</script>