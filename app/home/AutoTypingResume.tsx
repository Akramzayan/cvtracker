"use client";

import { useEffect, useRef, useState } from "react";
import { deepClone } from "../lib/parse-resume-from-pdf/deep-clone";
import { initialResumeState } from "../lib/redux/resumeSlice";
import { makeObjectCharIterator } from "../lib/make-object-char-iterator";
import { END_HOME_RESUME, START_HOME_RESUME } from "./constants";
import { ResumeIframeCsr } from "../components/Resume/ResumeIFrame";
import { ResumePDF } from "../components/Resume/ResumePDF";
import { initialSettings } from "../lib/redux/settingsSlice";

export const AutoTypingResume = () => {
  const [resume, setResume] = useState(deepClone(initialResumeState));
  const resumeCharIterator = useRef(
    makeObjectCharIterator(START_HOME_RESUME, END_HOME_RESUME)
  );
  const hassetEndResume = useRef(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      let next = resumeCharIterator.current.next();
      for (let i = 0; i < 9; i++) {
        next = resumeCharIterator.current.next();
      }

      if (!next.done) {
        setResume(next.value);
      } else {
        if (!hassetEndResume.current) {
          setResume(END_HOME_RESUME);
          hassetEndResume.current = true;
        }
      }
    }, 50);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    const interfalId = setInterval(() => {
      resumeCharIterator.current = makeObjectCharIterator(
        START_HOME_RESUME,
        END_HOME_RESUME
      );
      hassetEndResume.current = false;
    }, 60 * 1000);
    return () => clearInterval(interfalId);
  }, []);

  return (
    <>
      <ResumeIframeCsr documentSize="Letter" scale={0.7}>
        <ResumePDF
          resume={resume}
          settings={{
            ...initialSettings,
            fontSize: "12",
            formToHeading: {
              workExperiences: resume.workExperiences[0].company
                ? "Work Experiences"
                : "",
              educations: resume.educations[0].school ? "EDUCATIONS" : "",
              projects: resume.projects[0].project ? "PROJECTS" : "",
              skills: resume.skills.featuredSkills[0].skill ? "SKILLS" : "",
              custom: "CUSTOM",
            },
          }}/>
       
      </ResumeIframeCsr>
    </>
  );
};
