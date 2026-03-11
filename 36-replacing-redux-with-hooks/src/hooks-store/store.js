import { useEffect, useState } from "react";

let globalState = {} ;
let listeners = [] ;
let actions = {} ;

export const useStore = (ShouldListen = true)=>{
    
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier , payload) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = { ...globalState , ...newState};

        for(const listener of listeners){
            listener(globalState);
        }
    }

    useEffect(()=>{

        if (ShouldListen){
            listeners.push(setState);
        }

        return ()=>{
            if (ShouldListen){
                listeners = listeners.filter(li => li !== setState); 
            }
        }
    }, [setState, ShouldListen])

    return [globalState , dispatch];
}

export const initStore = (userActions , initialState)=>{
    if(initialState){
        globalState = {...globalState , ...initialState};
    }
    actions = {...actions , ...userActions};
};