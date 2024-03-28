import { groupTextItemsIntoLines } from "./group-text-items-into-lines"
import { readPdf } from "./read-pdf"

export const parseResumeFromPdf = async(fileUrl:string) => {
    //First step is to read the pdf into text items to prepare for processing
    const textItems = await readPdf(fileUrl)

    //Second step is group TEXT ITEMS INTO LINES
    const lines = groupTextItemsIntoLines(textItems)

}