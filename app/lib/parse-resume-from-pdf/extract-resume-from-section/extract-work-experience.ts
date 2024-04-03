import { ResumeWorkExperience } from "../../redux/types";
import { ResumeSectionToLines } from "../types";
import { getSectionlinesByKeyword } from "./lib/get-section.lines";

const WORK_EXPERIENCE_KEYWORDS_LOWERCASE =[
    "experience",
    "work",
    "employment",
    "history",
    "job",
]

const JOB_TITLES=[
    "engineer",
    "developer",
    "analyst",
    "manager",
    "director",
    "president",
    "vice president",
    "vp",
    "ceo",
    "cto",
    "cio",
    "cfo",
    "cmo",
    "cdo",
    "architecht",
]

export const extractWorkExperience =(sections:ResumeSectionToLines) => {
    const workExperiences: ResumeWorkExperience[]=[];
    const workExperiencesScores=[];

    const lines = getSectionlinesByKeyword(
        sections,
        WORK_EXPERIENCE_KEYWORDS_LOWERCASE
    )


}