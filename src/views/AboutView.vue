<template>
<div class="m-8 text-findable max-w-3xl mx-auto bg-light-background rounded-lg drop-shadow-md w-fit p-10 ">
    <h3 class="text-2xl font-bold pb-8"> Welcome to the FAIR COMBINE Archive Indicators project </h3>

<!-- ## Project coordination: <a href="" class="underline font-semibold">Irina Balaur</a>(https://sites.google.com/view/irinabalaur/home) and <a href="" class="underline font-semibold">Dagmar Waltemath</a>(https://www.fis.med.uni-greifswald.de/FIS/init_person_browser.action?pers_id=ngpocpv7uc2ss)
 -->
    <div class="pb-4">
        Many computational models have been developed and published for the past 20 years to investigate biochemical to multiorgan mechanisms in humans as well as animal models. 
        Disease maps have been provided to integrate the various complex levels of information leading to insights on disease progression; the latest example is the <a href="https://covid.pages.uni.lu/" class="underline font-semibold">COVID-19 Disease Map</a>.
         These resources are becoming increasingly interesting for clinician scientists, as supporting tools for diagnosis, therapy, and scientific investigations using patient data.
         However, the uptake of computational models in the clinic is still hindered for several reasons (including limited reusable annotations in the models,
         lack of standardisation of the properties/settings indicating how the model can be used for computational simulations, insufficiently clear specifications on the model kinetics, reduced reproducibility of the model simulation results,
         see for example <a href="https://doi.org/10.15252/msb.20209982" class="underline font-semibold">1</a>, <a href="http://ceur-ws.org/Vol-1692/paperC.pdf" class="underline font-semibold">2</a>.
    </div>


    <h4 class="text-xl font-bold pb-4"> Development of FAIR evaluation guidelines: </h4>
    <div class="pb-4">
        The draft of FAIR indicators adapted to the COMBINE domain is available 
        <a href="https://github.com/FAIR-CA-indicators/FAIR-CA-indicators.github.io/blob/fd681cf8b9a5211d28d42822b51fdf75c42c645d/FAIR_indicators_for_COMBINE/FAIR%20model%20indicators_main_13012023.pdf">here</a> since March 2023.
         We still do  appreciate your comments. Please use the <a class="underline font-semibold" href="https://github.com/FAIR-CA-indicators/FAIR-CA-indicators.github.io/issues">Issues</a>
        that we created per each indicator to add your comments and edits. Thank you. 
    </div>
        
    <h4 class="text-xl font-bold pb-4">Project goals (Oct 2022-Mar2023) </h4>
    <ul class="list-decimal  list-inside pb-4">
        <li> Achieve Community-consensus on FAIR indicators</li>
        <li> Develop FAIR evaluation guidelines</li>
        <li> Implement a FAIR evaluation tool</li>
    </ul>

        <h4 class="text-xl font-bold pb-4"> Involved communities</h4>
        <ul class="list-disc list-inside pb-4">
            <li class="list-item">COmputational MOdeling in BIology NEtwork <a href="https://combine-org.github.io/" class="underline font-semibold">COMBINE</a></li>
            <li class="list-item"><a href="https://www.ebi.ac.uk/biomodels/" class="underline font-semibold">BioModels</a></li>
            <li class="list-item">Physiome Model Repository <a href="https://models.physiomeproject.org/" class="underline font-semibold">PMR2</a></li>
        </ul>

        <h4 class="text-xl font-bold pb-4"> Related meetings</h4>
        <ul class="list-disc  list-inside pb-4">
            <li class="list-item">Workshop at <a href="https://combine-org.github.io/author/combine-2021/" class="underline font-semibold">COMBINE 2021</a></li>
<!--             <li class="list-item">Workshop at <a href="https://combine-org.github.io/author/harmony-2022/">HARMONY 2022</a></li> -->
            <li class="list-item">Workshop at <a href="https://combine-org.github.io/author/combine-2022/" class="underline font-semibold">COMBINE 2022</a>  supported by EOSC Future (no. 101017536).</li>
            <li class="list-item">Workshop at <a href="https://co.mbine.org/events" class="underline font-semibold">HARMONY 2023</a>  supported by EOSC Future (no. 101017536).</li>
        </ul>

    <h4 class="text-xl font-bold pb-4"> Outreach and open material </h4>
    <ul class="list-disc  list-inside pb-4">
        <li class="list-item">Presentation at <a href="https://symposium22.eoscfuture.eu/" class="underline font-semibold">EOSC Symposium</a> in Prague, November 14-17, 2022 - <a href="http://doi.org/10.5281/zenodo.7405912" class="underline font-semibold">DOI: 10.5281/zenodo.7405912</a>.</li>
        <li class="list-item">Presentation at <a href="https://www.icsb2022.berlin/" class="underline font-semibold">ICSB 2022</a> in Berlin, October 11, 2022 - <a href="http://doi.org/10.5281/zenodo.7716716" class="underline font-semibold">DOI: 10.5281/zenodo.7716716</a>.</li>
        <li class="list-item">Poster at <a href="https://www.icsb2022.berlin/" class="underline font-semibold">ICSB 2022</a> in Berlin, October 11, 2022 - <a href="http://doi.org/10.5281/zenodo.7716885" class="underline font-semibold">DOI:  10.5281/zenodo.7716885</a>.</li>
        <li class="list-item">Our <a href="https://eoscfuture-grants.eu/node/274" class="underline font-semibold">webpage</a> on the EOSCFuture website.</li>
    </ul>
    <h4 class="text-xl font-bold pb-4"> Getting involved </h4>
    <ul class="list-disc list-inside pb-4">
        <li class="list-item">Join our <a href="https://groups.google.com/g/fair-ca-indicators" class="underline font-semibold">Mailing List on Google Groups</a></li>
        <li class="list-item">Sign up to the related <a href="https://github.com/FAIR-CA-indicators" class="underline font-semibold">github projects</a> of your interest, try out the indicators, add examples</li>
        <li class="list-item">Join our regular community calls (first Friday each month, 11-12am. Pls contact <a href="https://www.fis.med.uni-greifswald.de/FIS/init_person_browser.action?pers_id=ngpocpv7uc2ss" class="underline font-semibold">Dagmar Waltemath</a> to receive the Zoom link).</li>
    </ul>
    <h4  class="text-xl font-bold pb-4"> Funding </h4>
    <div class="flex flex-row">
        <img src="@/assets/eu_flag.jpg" class="h-16 pr-4" alt="european flag">
        <div class="self-center">This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 101017536.</div>
    </div>
</div>    

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
   
})
</script>