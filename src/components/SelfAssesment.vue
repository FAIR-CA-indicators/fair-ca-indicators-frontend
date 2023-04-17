<template>
<div class="flex">
    <div class="w-3/4"> <!-- question block -->
        <!-- Findable -->
        <div class="flex-col bg-background text-black p-8">
            <h3 class="text-6xl font-bold text-findable pb-4">Findability</h3>

            <div v-for="sub in fKeys" :key='sub' > <!-- sub group -->
                <div class="bg-findable text-white rounded-t-md w-fit pl-4 pr-4 ml-12 flex justify-center"> <!-- sub group tag -->
                        {{ sub }}
                </div>
                <div class="bg-white shadow-xl p-4 rounded-2xl mb-6">
                    <table class="table-auto">
                        <tr>
                            <th></th><th class="w-8">1</th><th class="w-8">0.5</th><th class="w-8">0</th><th class="w-8">n/a</th>
                        </tr>
                        <tr v-for="q in filterQ(f, sub)" :key='q.name'><!-- question box -->
                            <td>
                                <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2">{{ q.priority }}</div> <!-- priority tag -->
                                <button @click="loadExplanation(q)"> {{ q.question }}</button> <!-- short description -->
                            </td>
                            <td class="text-center">
                                <input :id="q.name + '-radio-1'" type="radio" value="1" :name="q.name" class="">
                            </td>
                            <td class="text-center">
                                <input :id="q.name + '-radio-2'" type="radio" value="0.5" :name="q.name" class="">
                            </td>
                            <td class="text-center">
                                <input :id="q.name + '-radio-3'" type="radio" value="0" :name="q.name" class="">
                            </td>
                            <td class="text-center">
                                <input :id="q.name + '-radio-4'" type="radio" value="na" :name="q.name" class="">
                            </td>  
                        </tr>                        
                    </table>
                </div>

            </div>



            <h3 class="text-6xl font-bold text-accessible">Accessibility</h3>
            <div v-for="(q, index) in a" :key='q.name'>
                <div v-if="index == 0 || a[index].sub_group != a[index-1].sub_group" class="bg-accessible text-white">
                    {{ q.sub_group }}
                </div>
                <div >
                    {{index }}
                </div>
            </div>

            <h3 class="text-6xl font-bold text-interopereable">Interoperability</h3>
            <div v-for="(q, index) in i" :key='q.name'>
                <div v-if="index == 0 || i[index].sub_group != i[index-1].sub_group" class="bg-interopereable text-white">
                    {{ q.sub_group }}
                </div>
                <div >
                    {{index }}
                </div>
            </div>

            <h3 class="text-6xl font-bold text-reuseable">Reusability</h3>
            <div v-for="(q, index) in r" :key='q.name'>
                <div v-if="index == 0 || r[index].sub_group != r[index-1].sub_group" class="bg-reuseable text-white">
                    {{ q.sub_group }}
                </div>
                <div >
                    {{index }}
                </div>
            </div>
        </div>
    </div>
    <div class="w-1/4 bg-white text-black border-light-stroke border-l-2"> <!-- score and explenation block -->
        <div> <!-- sorce -->
            <h3>Score</h3>
            <div class="w-full container relative h-72  border-light-stroke border-b-2"> <!-- tacho -->
                <img src="@/assets/tacho_ring.svg" class="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-75"> <!-- score tacho -->                               
                <img  class="absolute top-1/2 left-1/2 rotateNeedle" @click="rotateNeedle" :style="{transform: `translate(-50%, -50%) rotate(${score * 2.6 - 130}deg) scale(75%)` }" id="needle" src="@/assets/tacho_needle.svg"> <!-- score needle --> <!-- :class="`rotate-[${score * 2.6 - 130}deg]` -->
                <div class="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{{ score }}%</div>
            </div>
            <!-- <button class="" @click="score = score + 20">CHECK</button> -->

        </div>
        <div v-if="explanationFlag"> <!--  -->
            <h3> {{ explanation.name }}</h3><span class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2"> {{ explanation.priority }}</span>
            <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2"> Sub-principle </div>
            <p>{{ explanation.sub_group }}</p>
            <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2">Indicator</div>
            <p>{{ explanation.question }}</p>
            <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2">Description</div>
            <p>{{ explanation.short }}</p>
            <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2">Assesment details</div>
            <p>{{ explanation.description }}</p>

        </div>
    </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent ({
    props: {
        sessionStart: Object
    },
    data(){
        return {
            fKeys:  [] as string[],
            aKeys:  [] as string[],
            iKeys:  [] as string[],
            rKeys:  [] as string[],
            f: [] as { group: string, sub_group: string, name: string, priority: string, question: string, short: string, description: string }[],
            a: [] as { group: string, sub_group: string, name: string, priority: string, question: string, short: string, description: string }[],
            i: [] as { group: string, sub_group: string, name: string, priority: string, question: string, short: string, description: string }[],
            r: [] as { group: string, sub_group: string, name: string, priority: string, question: string, short: string, description: string }[],
            explanationFlag: false,
            explanation: {} as { group: string; sub_group: string; name: string, priority: string, question: string, short: string, description: string},
            score: 0
        }
    },
    mounted(){
        console.debug("!!!!!!!!!!!!");
        console.log(this.sessionStart);

        let test = {
                "has_archive": true,
                "has_model": true,
                "has_archive_metadata": true,
                "is_model_standard": true,
                "is_archive_standard": true,
                "is_model_metadata_standard": true,
                "is_archive_metadata_standard": true,
                "is_biomodel": true,
                "is_pmr": true,
                "subject_type": "manual"
                }
        //start session
        axios
            .post("http://localhost:8000/session", this.sessionStart)
            .then(response => {
                    console.info(response);
                    let qArr =  response.data;

                    //this.questions = response.data;    

                    qArr.forEach((q: { group: string; sub_group: string; name: string; priority: string; question: string; short: string, description:string }) => {
                        if(q.group == 'F'){
                            this.f.push(q);
                            if(!this.fKeys.includes(q.sub_group)) this.fKeys.push(q.sub_group);
                        } 
                        else if(q.group == 'A'){
                            this.a.push(q);
                            if(!this.aKeys.includes(q.sub_group)) this.aKeys.push(q.sub_group);
                        } 
                        if(q.group == 'I'){
                            this.i.push(q);
                            if(!this.iKeys.includes(q.sub_group)) this.iKeys.push(q.sub_group);
                        } 
                        if(q.group == 'R') {
                            this.r.push(q);
                            if(!this.rKeys.includes(q.sub_group)) this.rKeys.push(q.sub_group);
                        } 
                    })
                    console.log(this.f, this.a);
                });
    },
    watch: {
        score (newScore, oldScore){
            console.debug(newScore, oldScore);
/*             let deg = -130 + newScore *2.6;


            let needle = document.getElementById("needle");
            if(needle != null){
                console.debug(deg);
                //needle.style.transform-origin = "center";
                needle.style.transform = "rotate(" + deg + "deg)";
            }  */
        }
    },
    methods: {
        filterQ(qS: { group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; }[], sub: string){
            let arr = [];
            qS.forEach(q => {
                if(q.sub_group == sub) arr.push(q);
            });   
            return qS;        

        },
         rotateNeedle(){


        },
        loadExplanation(q: { group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; }){
            this.explanation = q;
            this.explanationFlag = true;
            console.debug(this.explanation);
        }
    }
})
</script>

<style>
/* .rotateNeedle {

} */
</style>