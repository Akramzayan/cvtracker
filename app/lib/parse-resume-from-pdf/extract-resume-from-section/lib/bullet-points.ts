

import { TextItem, lines } from "../../types";

export const BULLET_POINTS = [
    "⋅",
    "∙",
    "🞄",
    "•",
    "⦁",
    "⚫︎",
    "●",
    "⬤",
    "⚬",
    "○",
  ];

  const getFirstBulletPointLineIndex =(lines:lines):number |undefined => {
    for (let i =0 ;i<lines.length;i++){
        for (let item of lines[i]){
            if(BULLET_POINTS.some((bullet)=> item.text.includes(bullet))){
                return i;
            }
        }
    }
    return undefined;
  }
  const isWord =(str:string)=> /^[^0-9]+$/.test(str);

  const hasAtLeast8Words = (item:TextItem) => 
  item.text.split(/\s/).filter(isWord).length>=8;

  export const getDescriptionsLineIndex = (lines:lines):number | undefined => {
    let index = getFirstBulletPointLineIndex(lines);
    if(index === undefined){
        for (let i=0;i<lines.length;i++){
            const line = lines[i]
            if(line.length===1 && hasAtLeast8Words(line[0])){
                index = i;
                break

            }


        }

    }
    return index
  }