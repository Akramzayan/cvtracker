import {
  hasLetter,
  hasLetterAndAllUpperCase,
  isBold,
} from "../groupe-lines-into-sections";
import { FeatureSet, TextItem } from "../types";
import { ResumeSectionToLines } from "../types";
import { getTextWithHighestFeatureScore } from "./lib/feature-scoring-system";
import { getSectionlinesByKeyword } from "./lib/get-section.lines";

// Name
export const matchOnlyLetterSpace = (item: TextItem) =>
  item.text.match(/^[A-Za-z\s\.]/);

//Email
export const matchEmail = (item: TextItem) =>
  item.text.match(/[/\S+@\S+\.\S+]/);
const hasAt = (item: TextItem) => item.text.includes("@");

//Phone
export const matchPhone = (item: TextItem) =>
  item.text.match(/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/);
const hasParenthesis = (item: TextItem) => /\([0-9]+\)/.test(item.text);
export const hasNumber = (item: TextItem) => /[0-9]/.test(item.text);

//location
export const matchCityAndState = (item: TextItem) =>
  item.text.match(/[A-Z][a-zA-z\s]+,[A-z]{2}/);

export const hasComma = (item: TextItem) => item.text.includes(",");

//URL
export const matchUrl = (item: TextItem) => item.text.match(/\S+\.[a-z]+\/S+/);

const matchUrlHttp = (item: TextItem) => item.text.match(/https?:\/\/S+\.\S+/);

const matchUrlwww = (item: TextItem) => item.text.match(/www\.\S+\.\S+/);

const hasSlash = (item: TextItem) => item.text.includes("/");

//Summary

const has4OrmoreWords = (item: TextItem) => item.text.split(" ").length >= 4;

const NAME_FEATURES_SETS: FeatureSet[] = [
  [matchOnlyLetterSpace, 4, true],
  [isBold, 2],
  [hasLetterAndAllUpperCase, 2],
  [hasAt, -4],
  [hasNumber, -4],
  [hasParenthesis, -4],
  [hasSlash, -4],
  [has4OrmoreWords, -2],
  [hasComma, -4],
];

const Email_FEATURE_SETS: FeatureSet[] = [
  [matchEmail, 4, true],
  [isBold, -1],
  [hasLetterAndAllUpperCase, -1],
  [hasParenthesis, -4],
  [hasComma, -4],
  [hasSlash, -4],
  [has4OrmoreWords, -2],
];

const PHONE_FEATURE_SETS: FeatureSet[] = [
  [matchPhone, 4, true],
  [hasLetter, -4],
];

const LOCATION_FEATURE_SETS: FeatureSet[] = [
  [matchCityAndState, 4, true],
  [isBold, -1],
  [hasAt, -4],
  [hasSlash, -4],
  [hasParenthesis, -3],
];

const URL_FEATURE_SETS: FeatureSet[] = [
  [matchUrl, 4, true],
  [matchUrlHttp, 4, true],
  [matchUrlwww, 4, true],
  [isBold, -1],
  [hasAt, -4],
  [hasParenthesis, -3],
  [hasComma, -4],
  [has4OrmoreWords, -4],
];
const SUMMARY_FEATURE_SETS: FeatureSet[] = [
  [has4OrmoreWords, 4],
  [isBold, -1],
  [hasAt, -4],
  [hasParenthesis, -3],
  [matchCityAndState, -4, false],
];

const extractProfile = (sections: ResumeSectionToLines) => {
  const lines = sections.profile || [];
  const textItems = lines.flat();
  const [name, nameScores] = getTextWithHighestFeatureScore(
    textItems,
    NAME_FEATURES_SETS
  );

  const [email, emailScores] = getTextWithHighestFeatureScore(
    textItems,
    Email_FEATURE_SETS
  );

  const [phone, phoneScores] = getTextWithHighestFeatureScore(
    textItems,
    PHONE_FEATURE_SETS
  );

  const [location, locationScores] = getTextWithHighestFeatureScore(
    textItems,
    LOCATION_FEATURE_SETS
  );

  const [URL, urlScores] = getTextWithHighestFeatureScore(
    textItems,
    URL_FEATURE_SETS
  );
  const [Summary, SummaryScores] = getTextWithHighestFeatureScore(
    textItems,
    SUMMARY_FEATURE_SETS,
    undefined,
    true
  );

  const summaryLines = getSectionlinesByKeyword(sections, ["summary"]);
  const summarySection = summaryLines
    .flat()
    .map((textItem) => textItem.text)
    .join("");
    
  const objectiveLines = getSectionlinesByKeyword(sections, ["objective"]);
  const objectiveSection= objectiveLines
  .flat()
  .map((textItem) => textItem.text)
  .join("");

  return {
    profile :{
        name,
        email,
        phone,
        location,
        URL,
        Summary:Summary || summarySection || objectiveSection,

    },
    profileScores :{
        name:nameScores,
        email:emailScores,
        phone: phoneScores,
        URL:urlScores,
        summary:SummaryScores,

    }
  }
};
