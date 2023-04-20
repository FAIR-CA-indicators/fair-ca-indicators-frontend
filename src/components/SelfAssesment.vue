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
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-8"></div><div class="m-auto font-medium">1</div><div class="m-auto font-medium">0.5</div><div class="m-auto font-medium">0</div><div class="m-auto font-medium">n/a</div>
                        </div>
                            
                        <div v-for="q in filterQ(f, sub)" :key='q.name' class="grid grid-cols-12 gap-4 mb-4"><!-- question box -->
                            <div class="col-span-8">
                                <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2">{{ q.priority }}</div> <!-- priority tag -->
                                <div @click="loadExplanation(q)"> {{ q.question }}</div> <!-- short description -->
                            </div>
                            <div class="m-auto"> 
                                <input :id="q.name + '-radio-1'" type="radio" value="1" :name="q.name" class="" @click="setScore(q, 'success')">
                            </div>
                            <div class="m-auto">
                                <input :id="q.name + '-radio-2'" type="radio" value="0.5" :name="q.name" class="" @click="setScore(q, 'warnings')">
                            </div>
                            <div class="m-auto">
                                <input :id="q.name + '-radio-3'" type="radio" value="0" :name="q.name" class="" @click="setScore(q, 'failed')">
                            </div>
                            <div class="m-auto">
                                <input :id="q.name + '-radio-4'" type="radio" value="na" :name="q.name" class="" @click="setScore(q, 'not_applicable')">
                            </div>  
                        </div>                        
                </div>

            </div>



            <h3 class="text-6xl font-bold text-accessible pb-4">Accessability</h3>

            <div v-for="sub in aKeys" :key='sub' > <!-- sub group -->
                <div class="bg-accessible text-white rounded-t-md w-fit pl-4 pr-4 ml-12 flex justify-center"> <!-- sub group tag -->
                        {{ sub }}
                </div>
                <div class="bg-white shadow-xl p-4 rounded-2xl mb-6">
                    <table class="table-auto">
                        <div>
                            <div></div><div class="w-8">1</div><div class="w-8">0.5</div><div class="w-8">0</div><div class="w-8">n/a</div>
                        </div>
                        <div v-for="q in filterQ(a, sub)" :key='q.name'><!-- question box -->
                            <div>
                                <div class="rounded bg-accessible bg-opacity-25 text-accessible w-fit p-1 pl-2 pr-2">{{ q.priority }}</div> <!-- priority tag -->
                                <button @click="loadExplanation(q)"> {{ q.question }}</button> <!-- short description -->
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-1'" type="radio" value="1" :name="q.name" class="" @click="setScore(q, 'success')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-2'" type="radio" value="0.5" :name="q.name" class="" @click="setScore(q, 'warnings')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-3'" type="radio" value="0" :name="q.name" class="" @click="setScore(q, 'failed')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-4'" type="radio" value="na" :name="q.name" class="" @click="setScore(q, 'not_applicable')">
                            </div>  
                        </div>                        
                    </table>
                </div>

            </div>

            <h3 class="text-6xl font-bold text-interopereable pb-4">Interoperability</h3>
            <div v-for="sub in iKeys" :key='sub' > <!-- sub group -->
                <div class="bg-interopereable text-white rounded-t-md w-fit pl-4 pr-4 ml-12 flex justify-center"> <!-- sub group tag -->
                        {{ sub }}
                </div>
                <div class="bg-white shadow-xl p-4 rounded-2xl mb-6">
                    <table class="table-auto">
                        <div>
                            <div></div><div class="w-8">1</div><div class="w-8">0.5</div><div class="w-8">0</div><div class="w-8">n/a</div>
                        </div>
                        <div v-for="q in filterQ(i, sub)" :key='q.name'><!-- question box -->
                            <div>
                                <div class="rounded bg-interopereable bg-opacity-25 text-interopereable w-fit p-1 pl-2 pr-2">{{ q.priority }}</div> <!-- priority tag -->
                                <button @click="loadExplanation(q)"> {{ q.question }}</button> <!-- short description -->
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-1'" type="radio" value="1" :name="q.name" class="" @click="setScore(q, 'success')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-2'" type="radio" value="0.5" :name="q.name" class="" @click="setScore(q, 'warnings')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-3'" type="radio" value="0" :name="q.name" class="" @click="setScore(q, 'failed')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-4'" type="radio" value="na" :name="q.name" class="" @click="setScore(q, 'not_applicable')">
                            </div>  
                        </div>                        
                    </table>
                </div>

            </div>
            
            <h3 class="text-6xl font-bold text-reuseable pb-4">Reusability</h3>
            <div v-for="sub in rKeys" :key='sub' > <!-- sub group -->
                <div class="bg-reuseable text-white rounded-t-md w-fit pl-4 pr-4 ml-12 flex justify-center"> <!-- sub group tag -->
                        {{ sub }}
                </div>
                <div class="bg-white shadow-xl p-4 rounded-2xl mb-6">
                    <table class="table-auto">
                        <div>
                            <div></div><div class="w-8">1</div><div class="w-8">0.5</div><div class="w-8">0</div><div class="w-8">n/a</div>
                        </div>
                        <div v-for="q in filterQ(r, sub)" :key='q.name'><!-- question box -->
                            <div>
                                <div class="rounded bg-reuseable bg-opacity-25 text-reuseable w-fit p-1 pl-2 pr-2">{{ q.priority }}</div> <!-- priority tag -->
                                <button @click="loadExplanation(q)"> {{ q.question }}</button> <!-- short description -->
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-1'" type="radio" value="1" :name="q.name" class="" @click="setScore(q, 'success')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-2'" type="radio" value="0.5" :name="q.name" class="" @click="setScore(q, 'warnings')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-3'" type="radio" value="0" :name="q.name" class="" @click="setScore(q, 'failed')">
                            </div>
                            <div class="text-center">
                                <input :id="q.name + '-radio-4'" type="radio" value="na" :name="q.name" class="" @click="setScore(q, 'not_applicable')">
                            </div>  
                        </div>                        
                    </table>
                </div>

            </div>
        </div>
    </div>
    <div class="w-1/4 bg-white text-black border-light-stroke border-l-2 h-screen sticky top-0"> <!-- score and explenation block -->
        <div> <!-- sorce -->
            <h3>Score</h3>
            <div class="w-full container relative h-72  border-light-stroke border-b-2"> <!-- tacho -->
                <img src="@/assets/tacho_ring.svg" class="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-75"> <!-- score tacho -->                               
                <img  class="absolute top-1/2 left-1/2 rotateNeedle scale-75" @click="rotateNeedle" :style="{transform: `translate(-50%, -50%) rotate(${score * 2.6 - 130}deg) scale(75%)` }" id="needle" src="@/assets/tacho_needle.svg"> <!-- score needle --> <!-- :class="`rotate-[${score * 2.6 - 130}deg]` -->
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
        <div v-else>
            Select an indicator to see its description here.
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
            score: 0,
            sessionId: "",
            backend: "http://localhost:8000"
        }
    },
    mounted(){
        console.debug("!!!!!!!!!!!!");
        console.log(this.sessionStart);

        //start session
        axios
            .post(this.backend + "/session", this.sessionStart)
            .then(response => {
                    console.log(response);
                    
                    this.sessionId = response.data.id;
                    let tasks: Record<string, { id: string, name: string, session_id: string, children: Object, priority: string, status: string, comment: string, disabled: boolean, score: number }> = {};;
                    tasks = response.data.tasks;

                    //this.questions = response.data;    
                    console.log(tasks);

                    for (const [id, task] of Object.entries(tasks)) {
                        //console.log(id, task);
                        if(task.disabled) continue;
                        // session/{session_id}/tasks/{task_id}
                        axios
                            .get(this.backend + '/indicators/' + task.name)
                            .then(r => {
                                let q = r.data;
                                q.taskId = id;
                            
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
                    }
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
            let arr: { group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; }[] = [];
            qS.forEach(q => {
                if(q.sub_group == sub) arr.push(q);
            });   
            return arr;        

        },
         rotateNeedle(){


        },
        loadExplanation(q: { group: string; sub_group: string; name: string; priority: string; question: string; short: string; description: string; }){
            this.explanation = q;
            this.explanationFlag = true;
            console.debug(this.explanation);
        },
        setScore(q: { group?: string; sub_group?: string; name?: string; priority?: string; question?: string; short?: string; description?: string; taskId?: string; }, score: string){
            //file://cors.redoc.ly/session/{session_id}/tasks/{task_id}
            
            console.debug(q);
            let body = {"status": score}
            axios.patch(this.backend + '/session/' + this.sessionId + "/tasks/" + q.taskId, body)
                .then(response => {
                    console.log(response);
                    let r = response.data;
                    this.score = Math.floor(r.score_all * 100);
                })
                .catch(error => {
                    console.error(error.toJSON());
                });
        }
    }
})
</script>

<style>
/* .rotateNeedle {

} */
</style>