import { Subsections, line, lines } from "../../types";

export const divideSectionIntoSubsections =(lines:lines) :Subsections => {

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