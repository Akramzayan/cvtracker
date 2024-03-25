import { RootState } from "./store";

const LOCAL_STORAGE_KEY = "cvtracker";


export const saveStateToLocalStorage = (state: RootState) => {
try {
    const stringifiedState=JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY,stringifiedState)
} catch (error) {

    
}
}

export const loadStateFromLocalStorage =() => {
    try {
        const stringifiedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(!stringifiedState){
            return undefined;
        }
        else{
            return JSON.parse(stringifiedState);
        }
    
    } catch (error) {
        return undefined;
        
    }
} 

export const getHasUsedBefore =() => Boolean(loadStateFromLocalStorage());