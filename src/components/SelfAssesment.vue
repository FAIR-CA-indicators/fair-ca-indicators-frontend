<template>

<!-- Findable -->
<div class="flex-col bg-white text-black p-8">
    <h3 class="text-6xl font-bold text-findable">Findability</h3>

    <div v-for="sub in fKeys" :key='sub'>
        <div class="bg-findable text-white rounded-t-md w-12 h-6 ml-12 flex justify-center">
                {{ sub }}
        </div>
        <div v-for="(q, index) in f" :key='q.name' >
            <div v-if="index == 0 || f[index].sub_group != f[index-1].sub_group">
                <div class="flex rounded border-t-4 border-black">
                    1 <span class="border-black border-l border-r">0.5</span> <span class="border-black border-r">0</span> n/a
                </div>
            </div>
            <div class="">
                    {{index }}
            </div>
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

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';



export default defineComponent ({
    data(){
        return {
            fKeys:  [] as string[],
            aKeys:  [] as string[],
            iKeys:  [] as string[],
            rKeys:  [] as string[],
            f: [] as { group: string, sub_group: string, name: string, priority: string, question: string, short: string, description: string }[],
            a: [] as { group: string, sub_group: string, name: string, priority: string, question: string, short: string, description: string }[],
            i: [] as { group: string, sub_group: string, name: string, priority: string, question: string, short: string, description: string }[],
            r: [] as { group: string, sub_group: string, name: string, priority: string, question: string, short: string, description: string }[]
        }
    },
    mounted(){
        axios
            .get('http://localhost:8000/indicators')
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
    }
})
</script>