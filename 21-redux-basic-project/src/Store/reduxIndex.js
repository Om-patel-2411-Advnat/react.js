// this is the redux with the redux-toolkit
// there ere two function for crating reducer function " createSlice " & " createReducer " but create slice is more powerFull than createReducer that's why here we will use the Slice
// here configureStore will create a store like createStore but it's make merging multiple reducers into one reducer easier thereafter 
import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice.js';
import authSlice from './authSlice.js';


// here in configureStore we have to pass an object which is a configuration object where we then set reducer property 
const store = configureStore({
    // here we are using reducer only one single reducer function because redux only wants one main reducer function , which is responsible for one global state
    // reducer : counterSlice.reducer 

    // here when we have multiple slices than alternatively as a value for this reducer key , we can also set an object and in the object , we can set up any keys of our choice and the values of those keys will be different reducer functions ,  So we should create a map of reducers you could say and this map is then set as a value for the main reducer and behind the scenes configureStore will emerge all those reducers into one big reducer 
    // here we don't have multiple slice that's why we are not using object here but we can use it like this . you can add multiple keys for multiple slice 
    reducer : { 
        counter : counterSlice ,
        auth : authSlice ,
    }
});

export default store ;

// this is normal redux 

// import { createStore } from 'redux';


// const initialValue = { counter : 0 , showCounter : true }

// const Counterreducer = (state = initialValue , action)=>{
//     if(action.type === 'increment'){
//         return state = {
//             counter : state.counter + 1 ,
//             showCounter : state.showCounter
//         }
//     }
//     // we can not add types like that i=this will be not good way because this will lead us to mush larger conditions that's why now we use actions to pass some values 
//     // if(action.type === 'increaseBy5'){
//     //     return state = {
//     //         counter : state.counter + 5 ,
//     //     }
//     // }
//     // for now not repeating the value we will create a general state 
//     if(action.type === 'increase'){
//         return state = {
//             counter : state.counter + action.amount ,
//             showCounter : state.showCounter
//         }
//     }
//     if(action.type === 'decrement'){
//         return state = {
//             counter : state.counter - 1 ,
//             showCounter : state.showCounter
//         }
//     }

//     if(action.type === 'toggle'){
//         return state = { 
//             counter : state.counter ,
//             showCounter : !state.showCounter ,
//         }
//     }
//     return state ;
// }

// const store = createStore(Counterreducer);

// export default store ;
// // now we have to provide this store to the every component of the project so they can use the state for that we will wrap the main app component and than with doing that all the components can have access to the store 