import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export interface settings{
    themeColor:string;
    fontFamily:string;
    fontSize:string;
    documentSize:string;
    formToShow:{
        workExperiences:boolean;
        educations:boolean;
        projects:boolean;
        skills:boolean;
        custom:boolean;
    };
    formToHeading:{
        workExperiences:string;
        educations:string;
        projects:string;
        skills:string;
        custom:string;

    };
    formsOrder:ShowForm[];
    showBulletsPoints:{
        educations:boolean;
        projects:boolean;
        skills:boolean;
        custom:boolean;

    }


}
export type ShowForm =keyof settings['formToShow'];
export type  FormWithBulletsPoints = keyof settings['showBulletsPoints'];
export type GeneralSettings = Exclude<keyof settings,
"formToshow"| "formToHeading" | "formsOrder" | "showBulletsPoints">;

export const DEFAULT_THEME_COLOR="#38bdf8";
export const DEFAULT_FONT_FAMILY="roboto";
export const DEFAULT_FONT_SIZE="11";
export const DEFAULT_FONT_COLOR="#171717";
export const initialSettings:settings={
    themeColor:DEFAULT_THEME_COLOR,
    fontFamily:DEFAULT_FONT_FAMILY,
    fontSize:DEFAULT_FONT_SIZE,
    documentSize:"Letter",
    formToShow:{
        workExperiences:true,
        educations:true,
        projects:true,
        skills:true,
        custom:true,


    },
    formToHeading:{
        workExperiences:"Work Experiences",
        educations:"Educations",
        projects:"Projects",
        skills:"Skills",
        custom:"Custom Section"

    },
    formsOrder:["workExperiences","educations","projects","skills","custom"],
    showBulletsPoints:{
        educations:true,
        projects:true,
        skills:true,
        custom:true,
    },   


};
export const settingsSlice = createSlice({
    name:"settings",
    initialState: initialSettings,
    reducers:{
        changeSettings: (
            draft,
            action: PayloadAction<{ field: GeneralSettings; value: string }>
          ) => {
            const { field, value } = action.payload;
            draft[field] = value;
          },
    }

});