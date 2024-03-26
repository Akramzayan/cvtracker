import { useEffect } from "react"
import { AppDispatch, store,RootState } from "./store"
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./local-storage"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { deepMerge } from "../deep-mergee";
import { initialResumeState, setResume } from "./resumeSlice";
import { Resume } from "./types";
import { initialSettings, setSettings,Settings } from "./settingsSlice";

 

export const useAppDispatch: () => AppDispatch=useDispatch;
export const useAppSelector :TypedUseSelectorHook<RootState>= useSelector;


export const useSaveStateToLocalStorageOnChange = ()=>{
    useEffect(()=> {
        const unsubscribe =store.subscribe(()=> {
            saveStateToLocalStorage(store.getState())

        })
        return unsubscribe;
    },[]);

}


export const useSetInitialStore =()=> {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        const state = loadStateFromLocalStorage()
        if(!state)return
        if(state.resume){
            const mergedResumeState= deepMerge(initialResumeState,state.resume) as Resume;
            dispatch(setResume(mergedResumeState));
            
        }
        if(state.settings){
            const MergedSettingsState = deepMerge(initialSettings,state.settings) as Settings;
            dispatch(setSettings(MergedSettingsState))

        }
    })
}