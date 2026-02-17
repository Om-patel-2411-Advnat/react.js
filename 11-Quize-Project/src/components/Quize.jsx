import { useState , useCallback } from "react";
import QUESTIONS from '../Question.js';
import QuizComplete from "./QuizeComplete.jsx";
import Question from "./Question.jsx";

export default function Quize(){

    const [userAnswer , setuserAnswer] = useState([]);

    const activeQuestionIndex = userAnswer.length ;
    const quizComplete = activeQuestionIndex === QUESTIONS.length ;

    const HandleQuize = useCallback(function HandleQuize(selectedanswer){
        setuserAnswer((prevanswer) => {
            return ([...prevanswer, selectedanswer]);
        });
    }, [])
    
    const HandleNextQuestion = useCallback(function HandleNextQuestion(){
        setuserAnswer(prevanswer => [...prevanswer , null]);
    } ,[])  



    if (quizComplete){
        return <QuizComplete userAnswer={userAnswer} />;
    }

    return(
        <div id="quiz">
            <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onConfirm={HandleNextQuestion} 
                onSelect={HandleQuize}  
            />
        </div>
    )
}