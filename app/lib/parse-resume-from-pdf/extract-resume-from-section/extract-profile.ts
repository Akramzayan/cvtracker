import {
  hasLetterAndAllUpperCase,
  isBold,
} from "../groupe-lines-into-sections";
import { FeatureSet, TextItem } from "../types";
import { ResumeSectionToLines } from "../types";
import { getTextWithHighestFeatureScore } from "./lib/feature-scoring-system";

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

const Email_FEATURE_SETS: FeatureSet[]=[
    [matchEmail,4,true],
    [isBold,-1],
    [hasLetterAndAllUpperCase,-1],
    [hasParenthesis,-4],
    [hasComma,-4],
    [hasSlash,-4],
    [has4OrmoreWords,-2],
]

const extractProfile = (sections: ResumeSectionToLines) => {
  const lines = sections.profile || [];
  const textItems = lines.flat();
  const [name, nameScores] = getTextWithHighestFeatureScore(
    textItems,
    NAME_FEATURES_SETS
  );
};
