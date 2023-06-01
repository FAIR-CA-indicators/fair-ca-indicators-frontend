import { defineStore } from 'pinia'


export type inputState = {
    subject_type: string;
    has_archive: boolean;
    has_model: boolean;
    has_archive_metadata: boolean;
    is_model_standard: boolean;
    is_archive_standard: boolean;
    is_model_metadata_standard: boolean;
    is_archive_metadata_standard: boolean;
    is_biomodel: boolean;
    is_pmr: boolean;
}

export type sessionState = {
        sessionType: string,
        id: -1,
        sessionInput: inputState,
        f: question[],
        a: question[],
        i: question[],
        r: question[];
        fKeys: string[],
        aKeys: string[],
        iKeys: string[],
        rKeys: string[],
        score: scores

}

export type question = {
    group: string;
    sub_group: string;
    name: string;
    priority: string;
    question: string;
    short: string;
    description: string;
    status: string;
    disabled: boolean;
    automated: boolean
}

export type scores = {
        score_all: number,
        score_all_essential: number,
        score_all_nonessential: number,
        score_applicable_all: number,
        score_applicable_essential: number,
        score_applicable_nonessential: number
}



export const useAssessmentStore = defineStore('assessmentStore', {
    state: () => ({
       sessionInput: {
        subject_type: "manual",
        has_archive: false,
        has_model: false,
        has_archive_metadata: false,
        is_model_standard: false,
        is_archive_standard: false,
        is_model_metadata_standard: false,
        is_archive_metadata_standard: false,
        is_biomodel: false,
        is_pmr: false

       },
       score: {
        score_all: 0,
        score_all_essential: 0,
        score_all_nonessential: 0,
        score_applicable_all: 0,
        score_applicable_essential: 0,
        score_applicable_nonessential: 0
       }
    } as sessionState),
    getters: {

    },
    actions: {

    }
})

