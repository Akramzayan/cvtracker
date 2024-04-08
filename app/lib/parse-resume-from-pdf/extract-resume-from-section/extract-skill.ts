import { initialFeaturedSkills } from "../../redux/resumeSlice";
import { ResumeSkills } from "../../redux/types";
import { deepClone } from "../deep-clone";
import { ResumeSectionToLines } from "../types";
import { getBulletPointsFromLines, getDescriptionsLineIdx } from "./lib/bullet-points";
import { getSectionlinesByKeyword } from "./lib/get-section.lines";

export const extractSkills =(section:ResumeSectionToLines) => {
    const lines = getSectionlinesByKeyword(section,["skill"]);
    const descriptionLineIdx = getDescriptionsLineIdx(lines)??0
    const descriptionLines =lines.slice(descriptionLineIdx)
    const descriptions = getBulletPointsFromLines(descriptionLines)

    const featuredSkills=deepClone(initialFeaturedSkills);
    if(descriptionLineIdx !==0){
        const featuredSkillLines=lines.slice(0,descriptionLineIdx)
        const featuredSkillsTextItems = featuredSkillLines.flat().filter((item) =>item.text.trim()).slice(0,6);
        
        for(let i =0 ;i<featuredSkillsTextItems.length;i++){
            featuredSkills[i].skill=featuredSkillsTextItems[i].text;

        }
    }
    const skills :ResumeSkills={
        featuredSkills,
        descriptions,

    };
    return {skills};



}