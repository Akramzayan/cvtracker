import { text } from "stream/consumers";
import { TextItems, lines,line } from "./types";

export const groupTextItemsIntoLines=(textItems : TextItems):lines =>{
    const lines : lines =[];
    let line:line=[];

    for(let item of textItems){
        if(item.hasEndOfLine){
            if(item.text.trim() !==""){
                line.push({...item});
            }
            lines.push(line);
            line=[];
        }
        else if(item.text.trim() !==""){
            line.push({...item});
        }
    }
    if(line.length>0){
        lines.push(line);
    }

    return lines;

       
}

const getTypicalCharacterWidth = (textItems: TextItems):number => {
    //exclude empty space in the textItems
    textItems=textItems.filter((item) =>item.text.trim() !=="");

const heightToCount:{[height:number]:number}={};
let commonHeight=0;
let heightMaxCount=0

const fontNameToCount:{[fontName:string]:number}={}
let commonFontName="";
let fontNameMaxCount=0;

for (let item of textItems){
    const {fontName, width, height}=item;
    if(!heightToCount[height]){
        heightToCount[height]=0;
    }
    heightToCount[height]++;
    if(heightToCount[height]> heightMaxCount){
        commonHeight=height;
        heightMaxCount=heightToCount[height]
    }


    if(!fontNameToCount[fontName]){
        fontNameToCount[fontName]=0;
    }
   
    fontNameToCount[fontName]+=text.length
    if(fontNameToCount[fontName]>fontNameMaxCount){
        commonFontName=fontName;
        fontNameMaxCount=fontNameToCount[fontName]

    }
}

}
