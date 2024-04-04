import { ResumeWorkExperience } from "../../redux/types";
import { ResumeSectionToLines } from "../types";
import { getDescriptionsLineIndex } from "./lib/bullet-points";
import { getSectionlinesByKeyword } from "./lib/get-section.lines";
import { divideSectionIntoSubsections } from "./lib/subsections";

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
    );
    const subsections = divideSectionIntoSubsections(lines);

    for (const subsectionLines of subsections){
        const descriptionsLineIndex=getDescriptionsLineIndex(subsectionLines) ?? 2; // 2 is the default value if it is undefined

        const subsectionInfoTextItems = subsectionLines.slice(0,descriptionsLineIndex).flat()

    }


}