import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  FeaturedSkill,
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience,
} from "./types";
import { ShowForm } from "./settingsSlice";
import { RootState } from "./store";

export const initialProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
};

export const initialEducation: ResumeEducation = {
  school: "",
  date: "",
  degree: "",
  gpa: "",
  descriptions: [],
};

export const initialProject: ResumeProject = {
  project: "",
  date: "",
  descriptions: [],
};

export const initialFeaturedSkill: FeaturedSkill = { skill: "", rating: 4 };
export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
  ...initialFeaturedSkill,
});

export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  descriptions: [],
};

export const initialCustom = {
  descriptions: [],
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkExperience],
  educations: [initialEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom,
};

export type CreateChangeWithDescriptions <T> ={
    idx:number
}&(
    |{field:Exclude<keyof T,"descriptions">;
    value:string;}
    |{field:"descriptions";
value:string[];}
 
)

export const resumeSlice = createSlice({
    name:"resume",
    initialState:initialResumeState,
    reducers:{
        changeProfile:(
            draft,
            action:PayloadAction<{field:keyof ResumeProfile; value:string}>
        ) => {
          const {field,value} = action.payload;
          draft.profile[field]=value;
        },
        changeWorkExperience:(
            draft,
            action:PayloadAction<CreateChangeWithDescriptions<ResumeWorkExperience>> )=>{
                
            }













        //Reducers with state and action 
       /** / setProfile: (state, action: PayloadAction<ResumeProfile>) => {
            state.profile = action.payload;
        },
        setWorkExperiences: (state, action: PayloadAction<ResumeWorkExperience[]>) => {
            state.workExperiences = action.payload;
        },
        setEducations: (state, action: PayloadAction<ResumeEducation[]>) => {
            state.educations = action.payload;
        },
        setProjects: (state, action: PayloadAction<ResumeProject[]>) => {
            state.projects = action.payload;
        },
        setSkills: (state, action: PayloadAction<ResumeSkills>) => {
            state.skills = action.payload;
        },
        setCustom: (state, action: PayloadAction<{ descriptions: string[] }>) => {
            state.custom = action.payload;
        },/** */

    }
})