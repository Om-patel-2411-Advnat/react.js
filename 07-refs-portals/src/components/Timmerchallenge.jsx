import { useRef, useState } from "react"
import ResultModel from "./ResultModel.jsx";

// we use timer here because we don't want timer to re-execute every time change occur that's why we use it outside of component
// let timer;

// but at the end it's not a good aproch because when we click start on 5s timer and than click the start of 1s timer and than stop it and after that we will stop the 5s timer 
// what will happen here is 1s timer will be stopped but 5s timer will not stop because when we start the 1s timer after the 5s the variable override the timer of 1s over 5s so the 5s timer is now not stoed into the timer variable 
// to avoid this situation we can use Ref
// yes ref is ot only used to connect the react with the html component but we can also use it for managing some variables let's see here with an example

export default function Timmerchallenge({title , targetTime}){

    // const [startTimer , setStartTimer] = useState(false);
    // const [timerExpired , settimerExpired] = useState(false);
    
    // insted of using two state we can use one to keep track on remaining time in state
    const [timeRemaining , settimeRemaining] = useState(targetTime * 1000);

    // now here using ref will give us benifit that it will creat different timer for every timer like different for 1s and different for 5s and so on for 10s and 15s;
    // unlike variables defined in component functions , this ref will not be reset or cleared when this component is re-executes insted of that it will store the values like states and react will store that timmer value and make sure they don't get lost
    const timer = useRef();

    // we will use another ref fro getting the exact time of stop and start 
    const dialog = useRef();

    // here we define the timer variable in side the component than when ever any change happens it will e-execute and seted to the null value again so it will not stop the timer for make it work we have to use it out side the component function
    // let timer;

    const timerisActive = timeRemaining > 0 && timeRemaining < (targetTime * 1000) ;

    if( timeRemaining <= 0){
        clearInterval(timer.current);

        // we are not using this settimeRemaining here because it will set the timer back to the initial value if user is lost so we will handle it using a function
        // settimeRemaining(targetTime * 1000);
        // now for opening the dialog box we have to use ref here 
        // here dialog will open automatically if user didn't press the stop button befor the time ends 
        dialog.current.expose();
    }

    function Handlerestart(){
        settimeRemaining(targetTime * 1000);
    }

    function HandleStart(){

        // this is ref method
        // timer.current = setTimeout(()=>{
        //     settimerExpired(true);

        //     // .showmodal() method is used to show the results it's a dialog propertie used by the ref as we say before
        //     // dialog.current.showModal(); 

        //     // we can now use .expose() here as we set everything into the ResultModel.jsx file
        //     dialog.current.expose();
        // } , targetTime * 1000);

        // now we want to get the eact time of stop and remaining time also not just stop and start for that we will use setTimeinterval method of js

        timer.current = setInterval(()=>{
            settimeRemaining(prevRemainingTime => prevRemainingTime - 10 );
        } , 10);

        // setStartTimer(true);

        // this is using normal variable 
        // timer = setTimeout(()=>{
        //     settimerExpired(true);
        // } , targetTime * 1000);

        // setStartTimer(true);
    }
    function HandleStop(){
        // here we wan to stop the timmer we can do this with the help of cleartimeout but for that we need an indicator which indicate which timer to stop so for that frist we try to make it work with variable timer
        // clearTimeout(timer);

        // here we use ref
        // clearTimeout(timer.current);

        // we used timeInterval up there so we have to use method accordingly
        clearInterval(timer.current);   
        // here we will open the dialog box manually when user click the button 
        dialog.current.expose();
    }

    return (
        <>
            {/* on screen the pop up is showing because we are forwarding the ref to the result component which result use it for when to visible */}
            <ResultModel ref={dialog} targetTime={targetTime} remainingTime = {timeRemaining} onReset = {Handlerestart}/>
            <section className="challenge">
                <h2>{title}</h2>   
                <p className="challenge-time">
                    {targetTime} second{targetTime ? 's' : ''}
                </p> 
                <p>
                    <button onClick={timerisActive ? HandleStop : HandleStart}> 
                        {timerisActive ? 'stop' :'start'} button
                    </button>
                </p>
                <p className={timerisActive ? "active" : undefined}> 
                    {timerisActive ? 'Time is running ...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}