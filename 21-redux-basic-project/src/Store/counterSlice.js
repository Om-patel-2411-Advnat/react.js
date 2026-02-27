import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter : 0 , showCounter : true }

// after creating call it like that 
// here we are preparing our slice for the global state and when we have different pieces of state which are not directly related (like authentication state and counter state) we could create different slices potentially in different files to make our code maintainable 
// here we just have one state counter state that's we will create just one slice 
// here we have to use return value of calling createSlice because here we get back our data
const counterSlice  = createSlice({
    // this is the identifier which every slice needs 
    name : 'counter',
    // after identifier you have to set up an initial state 
    initialState : initialCounterState,
    // after that initial value you have to add reducers is again an object of all the reducers this slice needed 
    // here Slice will generate unique identifier for every reducer function where the key names are increment , decrement and so on which will match the method name we have in our createSlice function in the reducers area 
    reducers : {
        // now here we have to create every method that is needed for that slice of state 
        // here every method will get latest state automatically 
        increment(state) {
            // here we can mutate the state directly in the ReduxToolkit because toolkit calls imgur behind the scenes and create the clone of the existing state and keep all the states which we are not editing , and override the state which we are editing in s immutable way.
            // but this is not allowed when you are not using the redux-toolkit 
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        // here we need an extra payload action 
        // we don't have to accept action in other reducers because there we don't need it 
        increase(state , action ) {
            state.counter += action.payload ;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

// this will return an object of this shape  : { type : ' some auto generated unique identifier ' }
// so here we don't have to worry about the unique action identifiers createSlice will create for us 
export const counterActions = counterSlice.actions;

export default counterSlice.reducer ;