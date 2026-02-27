// here for accessing the redux store and data in there we will use this another react-Redux library which is react hook which is a " custom Hook " made by react-Redux team " useSelector " 
// there is another hook named " useStore " which can give us direct access to the store but we will use this " useSelector " hook because this is more convenient because that allows us to then automatically select a part of our state managed by the store that's why we use " useSelector "  here 
// for class components we can use " connect " to connect the class based components to the store this is not used for the function based components that are we using here 
// note : when ever you use useSelector react will set the subscription to the redux store for this component so this component will get the updated value automatically when ever the data is changed into the store and the change in the data will re-execute this component 
import { useSelector } from 'react-redux';

// now for passing the dispatch function we will use another hook named as " useDispatch "
import { useDispatch } from 'react-redux';

// now here we will import the counterActions with unique identifiers
import { counterActions } from '../Store/counterSlice.js';

import classes from './Counter.module.css';

// if you ever unmount the component like it would be removed from the DOM for any reason React Redux will also automatically clear the subscription for you 
const Counter = () => {

  // when we call dispatch hook we don't pass any argument to it but instead this gives us back a dispatch function which you can execute 
  // here dispatch is a function which we can call and which will dispatch an action against our ReduxStore 
  const dispatch = useDispatch();

  // after calling this we need to pass a function to useSelector which will be executed by a react redux which is basically determines which piece of data we want to extract from the store 
  // this function inside the useSelector will receive the state  managed by the redux and than we will return the part of the state which we wanna extract here for example state.counter
  // here this function will be executed by react-Redux 
  // than use variable to get the returned value
  // here we when we use this we only have one slice into the redux now we have multiple slice so we have to use identifier that we use while exporting the reducer functions
  // const counter = useSelector(state => state.counter);
  // const show = useSelector(state => state.showCounter)

  // if we have multiple state we have to use it like this 
  // here the first counter is identifier of the reducer 
  const counter = useSelector(state => state.counter.counter);
  const show = useSelector(state => state.counter.showCounter)

  const IncrementHandler = ()=>{
    // here you dispatch only contains the type now we will se how we can set more value which actions will carry
    // dispatch({ type : 'increment'});  
    // after importing the counterActions we don't have to use identifiers we can do it like this 
    dispatch(counterActions.increment());
  } ;
  const IncreaseHandler = ()=>{
    dispatch(counterActions.increase(5));  //{ type : UNIQUE_IDENTIFIER , payload : any value you pass } this is default redux toolkit form you can not change it 
  } ;

  const DecrementHandler = ()=>{
    dispatch(counterActions.decrement());  
  } ;

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={IncrementHandler}>Increment</button>
        <button onClick={IncreaseHandler}>Increase by 5 </button>
        <button onClick={DecrementHandler}>Decrement</button> 
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// here is the example of the class based component 

// import { Component } from 'react';
// import { connect } from 'react-redux';

// class Counter extends Component {

// here we added some methods to handle the actions  
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({ type: 'decrement' }),
//   }
// };

// for exporting counter we will call connect and now when connect executed , will actually return a new function as a value which we than execute again and than we pass our component ( here it's (Counter) component ) to that return function as our argument 
// connect want two arguments and both of them are functions 

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);

