"use client";

import { useAppSelector } from "@/app/lib/redux/hooks";
import { selectResume } from "@/app/lib/redux/resumeSlice";
import { selectSettings } from "@/app/lib/redux/settingsSlice";
import { useState } from "react";
import { FlexBoxspacer } from "../FlexBoxspacer.";
import { ResumeIframeCsr } from "./ResumeIFrame";
import { ResumePDFProfile } from "./ResumePDF/ResumePDFProfile";
import { ResumePDF } from "./ResumePDF";

export const Resume = () => {
  const [scale, setScale] = useState(0.8);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);

  return (
    <>
      <div className="relative flex justify-center md:justify-start">
        <FlexBoxspacer maxWidth={50} className="hidden md:block" />
        <div className="relative">
          <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-hidden md:p-[var(--resume-padding)]">
            <ResumeIframeCsr documentSize={settings.documentSize} scale={scale}  enablePDFViewer={false}>
              <ResumePDF resume={resume} settings={settings} isPDF={false}/>
            </ResumeIframeCsr>
          </section>
        </div>
      </div>
    </>
  );
};
