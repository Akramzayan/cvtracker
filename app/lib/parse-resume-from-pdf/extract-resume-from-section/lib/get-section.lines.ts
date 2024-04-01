import { ResumeSectionToLines } from "../../types";


export const getSectionlinesByKeyword = (
    sections:ResumeSectionToLines,
    keywords:string[]
) => {
    for(const sectionName in sections){
        const hasKeyWord= keywords.some((keyword) => 
        sectionName.toLowerCase().includes(keyword))
        if(hasKeyWord){
            return sections[sectionName]
        }
    }
    return[];
}