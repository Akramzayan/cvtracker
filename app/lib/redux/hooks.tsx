import { useEffect } from "react"
import { AppDispatch, store,RootState } from "./store"
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./local-storage"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
 

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
            
        }
    })
}