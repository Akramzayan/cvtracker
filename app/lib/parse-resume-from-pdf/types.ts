import { ResumeKey } from "../redux/types";

export interface TextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontName: string;
  hasEndOfLine: boolean;
}

export type TextItems = TextItem[];
export type line = TextItem[];
export type lines = line[];

export type Subsections = lines[];

export type ResumeSectionToLines = { [sectionName in ResumeKey]?: lines } & {
  [otherSectionName: string]: lines;
};

type FeatureScore = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4;

type ReturnMatchingTextOnly = boolean;
export type FeatureSet =
  | [(item: TextItem) => boolean, FeatureScore]
  | [
      (item: TextItem) => RegExpMatchArray | null,
      FeatureScore,
      ReturnMatchingTextOnly
    ];

export interface TextScore {
  text: string;
  score: number;
  match: boolean;
}

export type TextScores = TextScore[];

