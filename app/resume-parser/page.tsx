"use client"

import Link from "next/link"
import { useState } from "react"
import { TextItems } from "../lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "../lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "../lib/parse-resume-from-pdf/groupe-lines-into-sections";
import { extractResumeFromSections } from "../lib/parse-resume-from-pdf/extract-resume-from-section";
import { FlexBoxspacer } from "../components/FlexBoxspacer.";

const RESUME_EXAMPLES =[
    {
        fileUrl:"resume-example/public-resume.pdf",
        description:(
            <span>
                Took From Public Sources
            </span>
        )
    },{
        fileUrl:"resume-example/inhouse-resume.pdf",
        description:(
            <span>
                Created By Our Team - {" "} <Link href="/resume-builder">Link</Link>
            </span>
        )
    }

];

const defaultFileUrl = RESUME_EXAMPLES[1]["fileUrl"];


export default function ResumeParser() {
    const [fileUrl, setFileUrl] = useState(defaultFileUrl);
    const [textItems,setTextItems] =useState<TextItems>([])
    const lines = groupTextItemsIntoLines(textItems || [])
    const sections = groupLinesIntoSections(lines)
    const resume = extractResumeFromSections(sections)
    return(
        <main className="h-full w-full overflow-hidden">
        <div className="grid md:grid-cols-6">
          <div className="flex justify-center px-2 md:col-span-3 md-h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end">
            <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0">
              <div className="aspect-h-[9.5] aspect-w-7">
                <iframe src={`${fileUrl}#navpanes=0`} className="h-full w-full" />
              </div>
            </section>
            <FlexBoxspacer maxWidth={45} className="hidden md:block" />
          </div>
          <div></div>
          </div>


        </main>
    )
    


}