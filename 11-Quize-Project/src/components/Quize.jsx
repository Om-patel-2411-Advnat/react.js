import { useState } from "react";
import Questions from '../Question.js';
import QuizComplete from "./QuizeComplete.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quize(){

    const [userAnswer , setuserAnswer] = useState([]);

    const activeQuestionIndex = userAnswer.length;
    const quizComplete = activeQuestionIndex === Questions.length ;


    function HandleNextQuestion(){
        setuserAnswer(prevanswer => [...prevanswer , null]);
    }

    function suffle(arr){
        let suffel = [...arr]
        let size = arr.length - 1;
        for(let i = size ; i>0 ;i--){
            let randomIndex = Math.floor(Math.random()*(i+1));

            [suffel[i], suffel[randomIndex]] = [suffel[randomIndex], suffel[i]];
        }
        return suffel;
    }

    function HandleQuize(selectedanswer){
        setuserAnswer((prevanswer) => {
            return ([...prevanswer, selectedanswer]);
        })
    }
    if (quizComplete){
        return <QuizComplete />;
    }

    let suffledAnswers = suffle(Questions[activeQuestionIndex].answers);

    return(
        <div id="quiz">
            <div id = 'question'>
                <QuestionTimer key={activeQuestionIndex} onConfirm = {HandleNextQuestion}/>
                <h2>{Questions[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {suffledAnswers.map((answer) => (
                        <li key = {answer}  className="answer">
                            <button onClick={() => HandleQuize(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}