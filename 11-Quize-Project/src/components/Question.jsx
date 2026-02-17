import QuestionTimer from "./QuestionTimer.jsx";
import Answer from "./Answers.jsx";
import Questions from '../Question.js';
import { useState } from "react";

export default function Question({
    index ,
    onConfirm ,
    onSelect ,
}){

    const [userAnswer , setuserAnswer] = useState({
        selectedanswer : '' ,
        isCorrect : null
    })

    let timer = 10000 ; 
     
    if(userAnswer.selectedanswer){
        timer = 1000;
    } 
    if(userAnswer.isCorrect !== null){
        timer = 2000;
    }
    function HandleSelectAnswer(userAnswer){
        setuserAnswer({
            selectedanswer: userAnswer ,
            isCorrect : null
        })   
        
        setTimeout(()=>{
            setuserAnswer({
                selectedanswer: userAnswer,
                isCorrect: Questions[index].answers[0] === userAnswer,
            })  

            setTimeout(() => {
                onSelect(userAnswer);
            } , 2000)
        } , 1000)
    }

    let answerState = '';

    if (userAnswer.selectedanswer && userAnswer.isCorrect !== null){
        answerState = userAnswer.isCorrect ? 'correct' : 'wrong' ;
    } else if (userAnswer.selectedanswer){
        answerState = 'answered' ;
    }

    return(
        <div id="question">
            <div id='question'>
                <QuestionTimer  
                    key={timer}
                    onConfirm={userAnswer.selectedanswer === '' ? onConfirm : null } 
                    TIMER = {timer}
                    mode={answerState}
                />
                <h2>{Questions[index].text}</h2>
                <Answer
                    answers={Questions[index].answers}
                    answerState={answerState}
                    selectedanswer={userAnswer.selectedanswer}
                    onSelect={HandleSelectAnswer} 
                />
            </div>
        </div>
    )
}