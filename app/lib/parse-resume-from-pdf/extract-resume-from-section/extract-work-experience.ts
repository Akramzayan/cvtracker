import { ResumeWorkExperience } from "../../redux/types";
import { isBold } from "../groupe-lines-into-sections";
import { FeatureSet, ResumeSectionToLines, TextItem } from "../types";
import { hasNumber } from "./extract-profile";
import { getDescriptionsLineIndex } from "./lib/bullet-points";
import { DATE_FEATURE_SETS, getHasText } from "./lib/common-features";
import { getTextWithHighestFeatureScore } from "./lib/feature-scoring-system";
import { getSectionlinesByKeyword } from "./lib/get-section.lines";
import { divideSectionIntoSubsections } from "./lib/subsections";

const WORK_EXPERIENCE_KEYWORDS_LOWERCASE = [
  "experience",
  "work",
  "employment",
  "history",
  "job",
];

const JOB_TITLES = [
  "engineer",
  "developer",
  "analyst",
  "manager",
  "director",
  "president",
  "vice president",
  "vp",
  "ceo",
  "cto",
  "cio",
  "cfo",
  "cmo",
  "cdo",
  "architecht",
];

const hadJobTitle = (item: TextItem) =>
  JOB_TITLES.some((jobTitle) =>
    item.text.split(/\s/).some((word) => word === jobTitle)
  );

const hasMoreThan5Words =(item:TextItem) => item.text.split(/\s/).length>5;
const JOB_TITLES_FEATURE_LIST: FeatureSet[] = [
    [hadJobTitle, 4],
    [hasNumber,-4],
    [hasMoreThan5Words,-2]

]

export const extractWorkExperience = (sections: ResumeSectionToLines) => {
  const workExperiences: ResumeWorkExperience[] = [];
  const workExperiencesScores = [];

  const lines = getSectionlinesByKeyword(
    sections,
    WORK_EXPERIENCE_KEYWORDS_LOWERCASE
  );
  const subsections = divideSectionIntoSubsections(lines);

  for (const subsectionLines of subsections) {
    const descriptionsLineIndex =
      getDescriptionsLineIndex(subsectionLines) ?? 2; // 2 is the default value if it is undefined

    const subsectionInfoTextItems = subsectionLines
      .slice(0, descriptionsLineIndex)
      .flat();

    const [date, dateScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItems,
      DATE_FEATURE_SETS
    );
    const [jobTitle, jobTitleScores] = getTextWithHighestFeatureScore(
        subsectionInfoTextItems,
        JOB_TITLES_FEATURE_LIST
    );

    const COMPANY_FEATURE_SET:FeatureSet[]=[
        [isBold,2],
        [getHasText(date),-4],
        [getHasText(jobTitle),4]

    ];

    const [company,companyScores] = getTextWithHighestFeatureScore(
        subsectionInfoTextItems,
        COMPANY_FEATURE_SET,
        false
    );

const subsectionDescriptionLines = subsectionLines.slice(descriptionsLineIndex);

  }
};
