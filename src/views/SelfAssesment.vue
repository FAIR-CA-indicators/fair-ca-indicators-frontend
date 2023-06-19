<template>
<div class="flex">
    <div class="w-3/4"> <!-- question block -->
        <!-- Findable -->
        <div class="flex-col bg-background text-black p-20">
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
        <button class="bg-findable text-white rounded-xl rounded-t-none pb-2 px-4 border-l-4 border-r-4 border-b-4 border-white transform translate-y-1/2 translate-x-1/2 whitespace-nowrap" @click="saveSession">Save session</button>
        <button class="bg-findable text-white rounded-xl rounded-t-none pb-2 px-4 border-l-4 border-r-4 border-b-4 border-white transform translate-y-1/2 translate-x-1/2 whitespace-nowrap ml-0" @click="copyID">Copy session ID</button>
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
import QuestionGroups from '@/components/QuestionGroups.vue';
import TachoScore from '@/components/TachoScore.vue';

import {useAssessmentStore} from '@/stores/AssessmentStore';
import { mapWritableState } from 'pinia';
import router from '@/router';

//const useAssessmentStore = defineStore('assessment')

export default defineComponent ({
    emits: {

    },
    props: {
        sessionStart: Object,
        backend: {
            type: String,
            required: true
        },
        formHeader:{
            type: Object,
            required: true
        },
        applicationHeader:{
            type: Object,
            required: true
        },
        loadSessionId: String,
        loadLocalSession: Object,
        omexFile: File
    },
    data() {
        return {
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
            hiddenModal: true,
            hideDisabled: false
        };
    },
    computed: {
        ...mapWritableState(useAssessmentStore, ['sessionType', 'sessionInput', 'id', 'f', 'a', 'i', 'r', 'fKeys', 'aKeys', 'iKeys', 'rKeys', 'score'])
    },
    mounted() {

        console.debug("session type: ", this.sessionType);
        console.debug("backend: ", this.backend);

        let getIndicators = axios.get(this.backend + '/indicators', this.applicationHeader);
        let getSession;
        //start session
        if(this.sessionType == 'loadRemoteSession'){
            console.debug("load remote session");
            console.debug(this.loadSessionId);
            getSession = axios.get(this.backend + '/session/' + this.loadSessionId, this.applicationHeader);
        }
        else if(this.sessionType == 'loadLocalSession'){
            console.debug(this.loadLocalSession);
            getSession = axios.post(this.backend + '/session/resume', this.loadLocalSession, this.applicationHeader); //
        } 
        else if(this.sessionType == 'newSession'){
            getSession = axios.post(this.backend + "/session", this.sessionInput, this.formHeader);
            this.sessionType = 'created'; //status, if the session was already created. Enables users to navigate through history
        } 
        else if(this.sessionType == 'loadArchive'){
            getSession =  axios.post(this.backend + '/session', {'subject_type': 'file', 'uploaded_file': this.omexFile}, this.formHeader)
        }
        else if(this.sessionType == 'created') {
            // session already created 
            return;
        }
        else {
            console.warn("Assessment page was reached without actively loading an old or a new session. This should load the local state.");
            router.push('/');
        }
        
       

        axios.all([getIndicators, getSession])
            .then((responses) => {
                console.debug(responses);
                if(responses[0] == undefined) throw new Error('Indicators could not be retrieved');
                let allIndicators = responses[0].data;

                let indicatorMap: Record<string, {
                    description: string;
                    name: string;
                    priority: string;
                    group: string;
                    sub_group: string;
                    question: string;
                    short: string;
                    status: string;
                    disabled: boolean;
                    taskId: string;
                }> = {};

                allIndicators.forEach((obj: {description: string; name: string; priority: string; group: string; sub_group: string; question: string; short: string; status: string; disabled: boolean; taskId: string;}) => {
                    indicatorMap[obj.name] = obj;
                });
                let session: AxiosResponse<any, any>;
                if(responses[1] == undefined) throw new Error('Session could not be retrieved');
                session = responses[1];
                this.createSession(session, indicatorMap);
            })
            .catch((e) => {
                console.error(e);
            })
            
    },
    watch: {

    },
    methods: {
        createSession(response: AxiosResponse<any, any>, allIndicators: { [x: string]: any; }) {

                console.log(response, allIndicators);
                this.id = response.data.id;
                router.replace({ path: '/session', query: {id: this.id} });
                let tasks: Record<string, {
                    id: string;
                    name: string;
                    session_id: string;
                    children: Object;
                    priority: string;
                    status: string;
                    comment: string;
                    disabled: boolean;
                    automated: boolean;
                    score: number;
                }> = {};

                tasks = response.data.tasks;
                console.log(tasks);
                let categoryArray;
                let categoryKeys;
                
                for (const [id, task] of Object.entries(tasks)) {
                    let q = allIndicators[task.name];
                    q.taskId = id;
                    q.status = task.status;
                    q.disabled = task.disabled;
                    q.automated = task.automated;

                    if (q.group == "F") {
                        categoryKeys = this.fKeys;
                        categoryArray = this.f;
                    } else if (q.group == "A") {
                        categoryArray = this.a;
                        categoryKeys = this.aKeys;
                    } else if (q.group == "I") {
                        categoryArray = this.i;
                        categoryKeys = this.iKeys;
                    } else if (q.group == "R") {
                        categoryArray = this.r;
                        categoryKeys = this.rKeys;
                    } else throw new Error("Group not assigneable to F, A, I or R.");
                    
                    categoryArray.push(q);
                    for(const [childID, childTask] of Object.entries(task.children)){
                        let childQ = allIndicators[childTask.name];
                        childQ.taskId = childID;
                        childQ.status = task.status;
                        childQ.disabled = task.disabled;
                        categoryArray.push(childQ);
                    }
                    if (!categoryKeys.includes(q.sub_group))
                        categoryKeys.push(q.sub_group);
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
            if(q.status == score) score = 'queued'; //enables unselect of raio
            q.status = score;
            let body = { "status": score };
/*             axios.patch(this.backend + "/session/" + this.id + "/tasks/" + q.taskId, body, this.header)
                .then(response => {
                    let r = response.data;
                    this.score.score_all = Math.floor(r.score_all * 100);
                    this.score.score_all_essential = Math.floor(r.score_all_essential * 100);
                    this.score.score_all_nonessential = Math.floor(r.score_all_nonessential * 100);
                    this.score.score_applicable_all = Math.floor(r.score_applicable_all * 100);
                    this.score.score_applicable_essential = Math.floor(r.score_applicable_essential * 100);
                    this.score.score_applicable_nonessential = Math.floor(r.score_applicable_nonessential * 100);
                })
                .catch(error => {
                console.error(error.toJSON());
            }); */
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
                .get(this.backend + '/session/' + this.id, this.applicationHeader)
                .then((response) => {
                    console.log('Fair-Combine-' + this.id + '.json', response);
                    const json = JSON.stringify(response.data);
                    const url = window.URL.createObjectURL(new Blob([json]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Fair-Combine-' + this.id + '.json');
                    document.body.appendChild(link);
                    link.click();
                })
        },
        copyID(){
            navigator.clipboard.writeText(this.id.toString());
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