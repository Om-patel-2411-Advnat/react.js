// this is the most basic redux function with store , reducer function , action , state etc...
// this is the whole process how redux works the output of this code is 
// { counter : 1 }   this is because of the first dispatch action 
// { counter : 0 }   this is because of the second dispatch action

const redux = require('redux');

// here we have to set the initial value of the state otherwise it will give us error 
const counterReducer = ( state = { counter : 0 } , action )=> { 

    if ( action.type === 'increment'){
        return {
            counter : state.counter + 1 ,
        }; 
    }
    if(action.type === 'decrement'){
        return {
            counter : state.counter - 1 ,
        }; 
    }
    return state ; 
};

// here we are defining which reducer function is responsible to update the store value 
const store = redux.createStore(counterReducer);

const CounterSubscriber = ()=>{
    // this is the inbuilt method of the redux when we can get the updated state when ever the state is updated
    const latestState = store.getState();
    console.log(latestState);
};

// now we have to tell the store about the subscriber function that it exists and have to send notification on every update
// that's how we do the subscribe we pass the subscriber function here to connect the subscriber with the store
// note : here both CounterSubscriber and counterReducer function we just point at them we don't execute them react will automatically executes them by redux
store.subscribe(CounterSubscriber);

// now here we have to dispatch an action to perform the action other wise nothing will be seen in the output 
// action is a js Object with a type property which acts as an identifier typically you use a string here and than this should be a unique string because every action you dispatch will do different thing 
store.dispatch({type : 'increment'});
store.dispatch({type : 'decrement'});