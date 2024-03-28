import {  TextItems,TextItem } from "./types";
import * as pdfjs from "pdfjs-dist";



import type { TextItem as PdfjsTextItem } from "pdfjs-dist/types/src/display/api";

export const readPdf = async (fileUrl: string): Promise<TextItems> => {
  const pdffile = await pdfjs.getDocument(fileUrl).promise;
  let textItems: TextItems = [];

  for (let i = 1; i <= pdffile.numPages; i++) {
    const page = await pdffile.getPage(i);
    const textContent = await page.getTextContent();

    await page.getOperatorList();
    const commonObjs = page.commonObjs;
    const pageTextItems = textContent.items.map((item) => {
      const {
        str:text,
        dir,
        transform,
        fontName:pdfFontName,
        ...otherProps



      }=item as PdfjsTextItem;
      const x =transform[4]
      const y=transform[5]
      const fontObj = commonObjs.get(pdfFontName);
      const fontName = fontObj.name;
      const newText = text.replace(/--/g,"-");
      const newItem ={
        ...otherProps,
        fontName,
        text:newText,
        x,
        y,
        
      };
      return newItem
    });
    //some changes here
    //textItems.push(...pageTextItems);
    textItems.push(...pageTextItems.map((item) => ({ ...item, hasEndOfLine: false })));
    
  }
  const isEmptySpace =(textItem:TextItem)=>!textItem.hasEndOfLine && textItem.text.trim()==="";
  textItems= textItems.filter((textItem)=>!isEmptySpace(textItem))
  return textItems;
}


    