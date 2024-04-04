import { isBold } from "../../groupe-lines-into-sections";
import { Subsections, line, lines } from "../../types";

export const divideSectionIntoSubsections =(lines:lines) :Subsections => {
    const IsLineNewSubsectionByLineGap = createIsLineSubsectionByLineGap(lines)

    let subsections = createSubsections(lines,IsLineNewSubsectionByLineGap);
    if(subsections.length>1){
        const isLineNewSubSectionByBold=(line:line,prevLine:line) => {
            if(isBold(prevLine[0])&& isBold(line[0])){
                return true
            }
            return false
        }
        subsections=createSubsections(lines,isLineNewSubSectionByBold)

    }
    return subsections

}


type IsLineNewSubsection =(line:line,prevLine:line) => boolean;

const createIsLineSubsectionByLineGap=(lines:lines
    ):IsLineNewSubsection => {
        const lineGapToCount:{[lineGap:number]:number}={};
        const linesY = lines.map((line) => line[0].y);
        let lineGapWithMostCount : number = 0;
        let maxCount =0;
        for (let i=1;i<linesY.length;i++){
            const lineGap = Math.round(linesY[i-1]-linesY[i]);
            if(!lineGapToCount[lineGap]) lineGapToCount[lineGap]=0;
            lineGapToCount[lineGap]++;

            if(lineGapToCount[lineGap]>maxCount){
                lineGapWithMostCount=lineGap;
                maxCount = lineGapToCount[lineGap];
            }


        }
        
        const subsectionLineGapThreshold = lineGapWithMostCount*1.4;
        const IsLineNewSubsection=(line:line,prevLine:line) => {
            return Math.round(prevLine[0].y-line[0].y)>subsectionLineGapThreshold;

        }
        return IsLineNewSubsection


}

const createSubsections =(
    lines:lines,
    isLineNewSubsection : IsLineNewSubsection

): Subsections => {
    const subsections: Subsections = [];
    let subsection:lines=[];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (i === 0) {
            subsection.push(line);
            continue
        }
        if(isLineNewSubsection(line,lines[i-1])){
            subsections.push(subsection);
            subsection =[]
        }
        subsection.push(line);

    }
    if(subsection.length>0){
        subsections.push(subsection);

    }
    return subsections

}