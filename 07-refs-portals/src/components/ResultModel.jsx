// forwarding refs is not allowed in older react version fro doing that you have to do this 
// that's how you can get the refs in a older version of the react might be usefull when you  are using an older version of react to update an appp
// import { forwardRef } from "react"

// const froward = forwardRef(function ResultModel({result , targetTime},ref){
//     return (

//         // the ref is important here to show the result on the screen;
//         <dialog ref={ref} className="result-modal" >
//             <h2>You {result}</h2>
//             <p>The target Time was <strong>{targetTime}</strong> seconds.   </p>
//             <p>You stop the timer with <strong>x seconds left.</strong></p>

//             {/* here action dialog is not react specific it's html functionality which give us functionality to close the form after clicking the button it's like submit button but it will close the dialog */}
//             <form action="dialog">
//                 <button>Close</button>
//             </form>
//         </dialog>
//     )
// })


import { useImperativeHandle , useRef } from "react";
import { createPortal } from 'react-dom';

export default function ResultModel({ targetTime , ref , remainingTime , onReset}){

    const userLost = remainingTime <= 0;
    const LeftTime = (remainingTime / 1000).toFixed(2);
    const Score = Math.round((1 - remainingTime / (targetTime * 1000)) *100);
    // we need this ref to reaching out to the dialog
    const dialog = useRef();

    // you can call this hook useImperativeHandle in the component function here to define properties and methods that should be on this component here from outside this component.
    // basically we are using this because we want showModal method to be used even the element is not dialog
    // useImperativeHandle is a another hook of the react use to handle changes 
    // here we are using useImperativeHandle because when more than on developer is working on the same component and if the change the dialog block to the div block thatn this functionality will not work because showmodal is the functionality of the dialog element not the div or any other so make sure if they change but the functionality should be stable we use this useImprativeHandle method for we have to import it .
    // it make component more stable and reusable
    // now we will make this here first argument will be the refs and the second argument will be the function 
    useImperativeHandle(ref , () => {
        return {
            // you can change the name expose()
            // this method will be called outside of this component

            // when ever this expose method will be called the showModal on this dialog is called.
            expose(){
                dialog.current.showModal() ;
            }
        }
    } );

// now with this setup here we can go to the Timerchallenge.jsx file and you can use .expose() insted of .showModal()

    // createPortal is giving us option where we want to put our component and the location should be mentioned 
    // createPortal takes two arguments one is the html element that you wanted to render and the other is location where you want to render it

    // after doing this when you inspect the page on browser the component will be visible on the top of the body inside the modal div
    return  createPortal(

        // the ref is important here to show the result on the screen;
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You'Lost'</h2>}
            {!userLost && <h2>your Score : {Score} </h2>}
            <p>The target Time was <strong>{targetTime}</strong> seconds.   </p>
            <p>You stop the timer with <strong>{LeftTime} seconds left.</strong></p>

            {/* here action dialog is not react specific it's html functionality which give us functionality to close the form after clicking the button it's like submit button but it will close the dialog */}
            {/* we use onSubmit on from insted of onClick on the button because the close button will pop up after the stopping time */}
            <form action="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        // this id is presented in index.html file
        document.getElementById('modal')
    )
}