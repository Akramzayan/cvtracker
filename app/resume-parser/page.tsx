"use client";

import Link from "next/link";
import { useState } from "react";
import { TextItems } from "../lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "../lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "../lib/parse-resume-from-pdf/groupe-lines-into-sections";
import { extractResumeFromSections } from "../lib/parse-resume-from-pdf/extract-resume-from-section";
import { FlexBoxspacer } from "../components/FlexBoxspacer.";
import { Heading } from "../components/documentation/Heading";
import { Paragraph } from "../components/documentation/Paragrapgh";
import { cx } from "../lib/cx";
import { ResumeDropZone } from "../components/ResumeDropZone";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/public-resume.pdf",
    description: <span>Took From Public Sources</span>,
  },
  {
    fileUrl: "resume-example/inhouse-resume.pdf",
    description: (
      <span>
        Created By Our Team - <Link href="/resume-builder">Link</Link>
      </span>
    ),
  },
];

const defaultFileUrl = RESUME_EXAMPLES[1]["fileUrl"];

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);
  return (
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
        {/* right part  */}
        <div className="flex px-6 text-gray-900 md:col-span-3 md-h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
          <FlexBoxspacer maxWidth={45} className="hidden md:block" />
          <section className="mx-w-[600px] grow">
            <Heading className="text-primary !mt-4" level={1}>
              Applicant Tracking System (ATS) PlayGround
            </Heading>
            <Paragraph smallMarginTop={true}>
              {" "}
              This PlayGround Showcases The ability to extract The Informations
              From a Resume PDF. Click arround The PDF Examples below to observe
              different Extraction Results similar to the{" "}
              <b className="text-purple-800">ATS Checker Results</b>
            </Paragraph>
            <div className="mt-3 flex gap-3">
              {RESUME_EXAMPLES.map((example, index) => (
                <article
                  key={index}
                  className={cx(
                    "flex-1 cursor-pointer rounded-md border -2 px-4 py -3 shadow-sm outline-none hover:bg-gray-50 focus:bg-gray-50 ",
                    example.fileUrl === fileUrl
                      ? "border-blue-400"
                      : "border-gray-300"
                  )}
                  onClick={() => setFileUrl(example.fileUrl)}
                  onKeyDown={(e)=>{
                    if(["Enter"," "].includes(e.key))
                        setFileUrl(example.fileUrl);
                    
                  } }
                  tabIndex={0}
                >
                    <h1 className="font-semibold"> Resume Exmaple {index+1}</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        {example.description}
                    </p>

                </article>
              ))}
            </div>
            <Paragraph>
                you can also upload your own resume PDF to see the extraction
                <span className="font-semibold text-purple-700 "> Add Your Resume Below </span>To Access The Extraction Results By The ATS Checker(ATS) Used in Job Application Process
            </Paragraph>
             <div className="mt-3">
              <ResumeDropZone onFileUrlChange={(fileUrl) => setFileUrl(fileUrl|| defaultFileUrl)} playgroundView={true}/>   
              
              <Heading level={2} className="!mt-[1.2em]">
              Resume Parsing Results
            </Heading>
             </div> 
          </section>
        </div>
      </div>
    </main>
  );
}
