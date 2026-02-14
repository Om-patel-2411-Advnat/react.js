import { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000 ;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  // const [remainingTime , setRemainingTime] = useState(0);

  // this will create a infinite loop here so we have to use useEffect
  // setInterval(() =>{
  //   setRemainingTime(prevTime => prevTime - 10);
  // },10)

  // now we have to stop the interval like we stop the setTimeout function 
  // here this useEffect cause this whole component to re-execute every 10 milliseconds and it cause this whole component to re-execute so it's better if we create a seperate component for the progress bar
  // useEffect(() => { 
  //   const interval = setInterval(() =>{
  //     console.log('interval'); 
  //     setRemainingTime(prevTime => prevTime + 10);
  //   },10)

  //   return () => {
  //     clearInterval(interval);
  //   }
  // },[])

  // here will be an error because this deleteConfirmation function is the part of the render cycle and it will be the part of the dom so this timer will be started after the first render of this component and this is gonna cause us error 
  // but here is and error is we use it like this than even if we click no after opening the dialog box it will still remove the place after three seconds for handling this we can use useEffect
  // at the end this code is a side effect
  // setTimeout(() => {
  //   onConfirm();
  // }, 3000);

  // here we don't want to use useEffect just to set the value or not fro preventing the infinite loop but we want to use it for cleanup the timer function when this component is closed so let's see how we can do that using useEffect
  useEffect(() => {
    const Timer = setTimeout(() => {
      onConfirm();
    } , TIMER);

    // this is a cleanup function 
    // this cleanup function does not run right before the effect function is executed for the first time. It's only executed before subsequent executions of this effect function  and as mention , when this component is removed 
    return () => {
      clearTimeout(Timer);
    }
  } ,[onConfirm])
  // here note one more thing is that we have used the prop value here but we never pass it into the dependency array 
  // now here remember one thing when you pass the function as a dependency there is a danger of creating an infinite loop
  // if the dependency is number ,String or a boolean than the useEffect will execute if the value is change but in the functions it's a little complicated
  // note :: here we are using the onConfirm function and when this component is renders this function will get a value of a function handleRemovePlace from the app.jsx which is passed as a prop here and after getting that function it will compare it with the old value and in the js if the both functions have the same value still they are not same than the dependency array will think that the function is changed and it will re-execute the useEffect again and this will cause an infinite loop here because in handleRemovePlace function we are having a value of state in the handleRemovePlace function which will re-render the app component when ever the value is changed and at the end we will get an infinite loop
  // note :: here even we are using this onConfirm function we will not enter into infinite loop because the the state value false will remove this whole component and if the component is not there we can not go to the infinite loop
  // now for prevent the infinite loop we can set the value to the false is one way but we can do it with another react Hook 
  // the comparison code is , in the end , the comparison code executed by react based on your side effect dependencies. it compares the effect dependency values for (in)equality 


  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer = {TIMER}/>
      {/* <progress value={remainingTime} max={TIMER}/> */}
    </div>
  );
}
