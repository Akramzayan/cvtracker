import { extractResumeFromSections } from "./extract-resume-from-section"
import { groupTextItemsIntoLines } from "./group-text-items-into-lines"
import { groupLinesIntoSections } from "./groupe-lines-into-sections"
import { readPdf } from "./read-pdf"

export const parseResumeFromPdf = async(fileUrl:string) => {
    //First step is to read the pdf into text items to prepare for processing
    const textItems = await readPdf(fileUrl)

    //Second step is group TEXT ITEMS INTO LINES
    const lines = groupTextItemsIntoLines(textItems)
    //THIRD STEP IS TO GROUP LINES INTO SECTIONS
    const sections = groupLinesIntoSections(lines)

    //Step4 is to extract Resume  from each sections
    const resume = extractResumeFromSections(sections);
    return resume



}