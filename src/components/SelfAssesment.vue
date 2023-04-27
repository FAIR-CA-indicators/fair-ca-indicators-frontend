<template>
<div class="flex">
    <div class="w-3/4"> <!-- question block -->
        <!-- Findable -->
        <div class="flex-col bg-background text-black p-8">
            <h3 class="text-6xl font-bold text-findable pb-4">Findability</h3>
            <QuestionGroups :qs="f" :keys="fKeys" :classes="'bg-findable text-findable'" @set-explanation="setExplanation" @set-explanation-flag="(b) => explanationFlag = b" @set-score="setScore" :hideDisabled="hideDisabled"/>
            <h3 class="text-6xl font-bold text-accessible pb-4">Accessibility</h3>
            <QuestionGroups :qs="a" :keys="aKeys" :classes="'bg-accessible text-accessible'" @set-explanation="setExplanation" @set-explanation-flag="(b) => explanationFlag = b" @set-score="setScore" :hideDisabled="hideDisabled"/>
            <h3 class="text-6xl font-bold text-interopereable pb-4">Interoperability</h3>
            <QuestionGroups :qs="i" :keys="iKeys" :classes="'bg-interopereable text-interopereable'" @set-explanation="setExplanation" @set-explanation-flag="(b) => explanationFlag = b" @set-score="setScore" :hideDisabled="hideDisabled"/>
            <h3 class="text-6xl font-bold text-reuseable pb-4">Reusability</h3>
            <QuestionGroups :qs="r" :keys="rKeys" :classes="'bg-reuseable text-reuseable'" @set-explanation="setExplanation" @set-explanation-flag="(b) => explanationFlag = b" @set-score="setScore" :hideDisabled="hideDisabled"/>
        </div>
    </div>
    <div class="flex flex-col w-1/4 bg-white text-black border-light-stroke border-l-2  h-screen sticky top-0"> <!-- score and explenation block -->
        <label class="absolute left-2 top-2 inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer"  v-model="hideDisabled">
            <div class="w-11 h-6 border-findable border-2 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-light-stroke after:border after:border-none after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-findable"></div>
            <span class="ml-3 text-sm font-medium text-black">Hide disabled questions</span>
        </label>
        <div class="flex flex-col flex-wrap h-2/5  border-light-stroke border-b-2"> <!-- sorce -->
            <div class="h-full w-1/2"><TachoScore :title="'score'" :score="score.score_all"/></div>
            <div class="h-1/5 w-1/2"><TachoScore :title="'essential'" :score="score.score_all_essential"/></div>
            <div  class="h-1/5 w-1/2"><TachoScore :title="'non essential'" :score="score.score_all_nonessential"/></div>
            <div  class="h-1/5 w-1/2"><TachoScore :title="'applicable'" :score="score.score_applicable_all"/></div>
            <div class="h-1/5 w-1/2"><TachoScore :title="'applicable essential'" :score="score.score_applicable_essential"/></div>
            <div  class="h-1/5 w-1/2"><TachoScore :title="'applicable non essential'" :score="score.score_applicable_nonessential"/></div>
        </div>
        <div v-if="explanationFlag" class="p-4 flex flex-col space-y-4 overflow-y-auto"> <!--  -->
            <div class="flex flex-row">
                <h3 class="font-semibold my-auto"> {{ explanation.name }}</h3>
                <span class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2 ml-2 "> {{ explanation.priority }}</span>
            </div>
            <div>
                <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2 text-xs">Sub-principle</div>
                <p>{{ explanation.sub_group }}</p>
            </div>
            <div>
                <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2 text-xs">Indicator</div>
                <p>{{ explanation.question }}</p>
            </div>
            <div>
                <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2 text-xs">Description</div>
                <p>{{ explanation.short }}</p>
            </div>
            <div>
                <div class="rounded bg-findable bg-opacity-25 text-findable w-fit p-1 pl-2 pr-2 text-xs">Assesment details</div>
                <p>{{ explanation.description }}</p>
            </div>
        </div>
        <div v-else class="text-center pt-6">
            Select an indicator to see its description here.
        </div>
    </div>
    <div class="fixed h left-0 top-1/2 transform -rotate-90 -translate-x-1/2">
        <button class="bg-findable text-white rounded rounded-t-none pb-2 px-4  transform translate-y-1/2 translate-x-1/2 whitespace-nowrap" @click="saveSession">Save session</button>
        <button class="bg-findable text-white rounded rounded-t-none pb-2 px-4  transform translate-y-1/2 translate-x-1/2 whitespace-nowrap ml-0" @click="copyID">Copy session ID</button>
    </div>

</div>

<Transition>
        <div v-if="!hiddenModal" class="fixed bottom-10 left-1/2 z-50 bg-findable border-white border-2 rounded-lg text-white p-2 modal modal-open transform -translate-x-1/2">
            <div class="modal-box relative p-5">
                <h1>Session ID was copied to clipboard.</h1>
                <label class="btn btn-sm btn-circle absolute right-1 top-1">✕</label>
            </div>
        </div>
</Transition>



</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import QuestionGroups from './QuestionGroups.vue';
import TachoScore from './TachoScore.vue';

export default defineComponent ({
    props: {
        sessionStart: Object,
        backend: {
            type: String,
            required: true
        },
        header: Object,
        loadSessionId: String,
        loadLocalSession: Object,
        mode: String
    },
    data() {
        return {
            fKeys: [] as string[],
            aKeys: [] as string[],
            iKeys: [] as string[],
            rKeys: [] as string[],
            f: [] as {
                group: string;
                sub_group: string;
                name: string;
                priority: string;
                question: string;
                short: string;
                description: string;
                status: string;
                disabled: boolean
            }[],
            a: [] as {
                group: string;
                sub_group: string;
                name: string;
                priority: string;
                question: string;
                short: string;
                description: string;
                status: string;
                disabled: boolean
            }[],
            i: [] as {
                group: string;
                sub_group: string;
                name: string;
                priority: string;
                question: string;
                short: string;
                description: string;
                status: string;
                disabled: boolean
            }[],
            r: [] as {
                group: string;
                sub_group: string;
                name: string;
                priority: string;
                question: string;
                short: string;
                description: string;
                status: string;
                disabled: boolean
            }[],
            explanationFlag: false,
            explanation: {} as {
                group: string;
                sub_group: string;
                name: string;
                priority: string;
                question: string;
                short: string;
                description: string;
            },
            score: {
                score_all: 0,
                score_all_essential: 0,
                score_all_nonessential: 0,
                score_applicable_all: 0,
                score_applicable_essential: 0,
                score_applicable_nonessential: 0

            },
            sessionId: "",
            hiddenModal: true,
            hideDisabled: false
        };
    },
    mounted() {

        console.debug(this.mode);

        //start session
        if(this.mode == 'loadRemoteSession'){
            console.debug("load remote session");
            axios
                .get(this.backend + '/session/' + this.loadSessionId, this.header)
                .then( response => {
                    this.createSession(response);
                })
        }
        else if(this.mode == 'loadLocalSession'){
            console.debug("load local session");
            axios
                .post(this.backend + '/session/resume', this.loadLocalSession, this.header)
                .then((response) => {
                    this.createSession(response);
                });
        }
        else if(this.mode == 'newSession'){
            
            console.debug(this.sessionStart);
            console.debug("new Session");
        
            axios
                .post(this.backend + "/session", this.sessionStart, this.header)
                .then( response => { 
                    this.createSession(response);
            });
        }
            
    },
    watch: {

    },
    methods: {
        createSession(response: AxiosResponse<any, any>) {
                console.log(response);
                this.sessionId = response.data.id;
                let tasks: Record<string, {
                    id: string;
                    name: string;
                    session_id: string;
                    children: Object;
                    priority: string;
                    status: string;
                    comment: string;
                    disabled: boolean;
                    score: number;
                }> = {};

                tasks = response.data.tasks;
                //this.questions = response.data;    
                console.log(tasks);
                for (const [id, task] of Object.entries(tasks)) {
                    //console.log(id, task);
                    if (task.disabled)
                        //continue;
                        console.debug("disabled: ", task);
                    // session/{session_id}/tasks/{task_id}
                    axios
                        .get(this.backend + "/indicators/" + task.name, this.header)
                        .then(r => {
                            let q = r.data;
                            q.taskId = id;
                            q.status = task.status;
                            q.disabled = task.disabled;
                        
                            if (q.group == "F") {
                                this.f.push(q);
                                for(const [childID, childTask] of Object.entries(task.children)){
                                    axios
                                        .get(this.backend + "/indicators/" + childTask.name, this.header)
                                        .then(childR => {
                                            let childQ = childR.data;
                                            childQ.taskId = childID;
                                            childQ.status = task.status;
                                            childQ.disabled = task.disabled;
                                            this.f.push(childQ);
                                        })
                                }
                                if (!this.fKeys.includes(q.sub_group))
                                    this.fKeys.push(q.sub_group);
                            }
                            else if (q.group == "A") {
                                this.a.push(q);
                                for(const [childID, childTask] of Object.entries(task.children)){
                                    axios
                                        .get(this.backend + "/indicators/" + childTask.name, this.header)
                                        .then(childR => {
                                            let childQ = childR.data;
                                            childQ.taskId = childID;
                                            childQ.status = task.status;
                                            childQ.disabled = task.disabled;
                                            this.a.push(childQ);
                                        })
                                }
                                if (!this.aKeys.includes(q.sub_group))
                                    this.aKeys.push(q.sub_group);
                            }
                            if (q.group == "I") {
                                this.i.push(q);
                                for(const [childID, childTask] of Object.entries(task.children)){
                                    axios
                                        .get(this.backend + "/indicators/" + childTask.name, this.header)
                                        .then(childR => {
                                            let childQ = childR.data;
                                            childQ.taskId = childID;
                                            childQ.status = task.status;
                                            childQ.disabled = task.disabled;
                                            this.i.push(childQ);
                                        })
                                }
                                if (!this.iKeys.includes(q.sub_group))
                                    this.iKeys.push(q.sub_group);
                            }
                            if (q.group == "R") {
                                this.r.push(q);
                                for(const [childID, childTask] of Object.entries(task.children)){
                                    axios
                                        .get(this.backend + "/indicators/" + childTask.name, this.header)
                                        .then(childR => {
                                            let childQ = childR.data;
                                            childQ.taskId = childID;
                                            childQ.status = task.status;
                                            childQ.disabled = task.disabled;
                                            this.r.push(childQ);
                                        })
                                }
                                if (!this.rKeys.includes(q.sub_group))
                                    this.rKeys.push(q.sub_group);
                            }
                    });
                }
            
                this.score.score_all = Math.floor(response.data.score_all * 100);
                this.score.score_all_essential = Math.floor(response.data.score_all_essential * 100);
                this.score.score_all_nonessential = Math.floor(response.data.score_all_nonessential * 100);
                this.score.score_applicable_all = Math.floor(response.data.score_applicable_all * 100);
                this.score.score_applicable_essential = Math.floor(response.data.score_applicable_essential * 100);
                this.score.score_applicable_nonessential = Math.floor(response.data.score_applicable_nonessential * 100);
        },
        setScore(q: {
            group?: string;
            sub_group?: string;
            name?: string;
            priority?: string;
            question?: string;
            short?: string;
            description?: string;
            taskId?: string;
            status?: string
        }, score: string) {
            //file://cors.redoc.ly/session/{session_id}/tasks/{task_id}
            console.debug(q.status);
            alert("status?");
            if(q.status == score) score = 'queued'; 
            q.status = score;
            let body = { "status": score };
            axios.patch(this.backend + "/session/" + this.sessionId + "/tasks/" + q.taskId, body, this.header)
                .then(response => {
                    let r = response.data;
                    console.debug(r);
                    console.debug(q);
                    this.score.score_all = Math.floor(r.score_all * 100);
                    this.score.score_all_essential = Math.floor(r.score_all_essential * 100);
                    this.score.score_all_nonessential = Math.floor(r.score_all_nonessential * 100);
                    this.score.score_applicable_all = Math.floor(r.score_applicable_all * 100);
                    this.score.score_applicable_essential = Math.floor(r.score_applicable_essential * 100);
                    this.score.score_applicable_nonessential = Math.floor(r.score_applicable_nonessential * 100);
                })
                .catch(error => {
                console.error(error.toJSON());
            });
        },
        setExplanation(q: {
            group: string;
            sub_group: string;
            name: string;
            priority: string;
            question: string;
            short: string;
            description: string;
            taskId?: string;
        }){
            this.explanation.group = q.group;
            this.explanation.sub_group = q.sub_group;
            this.explanation.name = q.name;
            this.explanation.priority = q.priority;
            this.explanation.question = q.question;
            this.explanation.short = q.short;
            this.explanation.description = q.description;

        },
        saveSession(){
            axios
                .get(this.backend + '/session/' + this.sessionId, this.header)
                .then((response) => {
                    console.log('Fair-Combine-' + this.sessionId + '.json', response);
                    const json = JSON.stringify(response.data);
                    const url = window.URL.createObjectURL(new Blob([json]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Fair-Combine-' + this.sessionId + '.json');
                    document.body.appendChild(link);
                    link.click();
                })
        },
        copyID(){
            navigator.clipboard.writeText(this.sessionId);
            this.hiddenModal = false;
            setTimeout(() => this.hiddenModal = true, 2000)
        }
    },
    components: { QuestionGroups, TachoScore }
})
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>