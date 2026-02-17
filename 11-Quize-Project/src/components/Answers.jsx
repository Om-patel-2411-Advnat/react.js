import { useRef } from "react";

export default function Answer({ answers, answerState, onSelect, selectedanswer }){

    const suffledAnswers = useRef()

    if(!suffledAnswers.current){
        function suffle(arr) {
            let suffel = [...arr]
            let size = arr.length - 1;
            for (let i = size; i > 0; i--) {
                let randomIndex = Math.floor(Math.random() * (i + 1));
    
                [suffel[i], suffel[randomIndex]] = [suffel[randomIndex], suffel[i]];
            }
            return suffel;
        }
    
        suffledAnswers.current = suffle(answers);
    }

    return (
        <ul id="answers">
            {suffledAnswers.current.map((answer) => {
                const isSelected = selectedanswer === answer;
                let cssClases = '';

                if (answerState == 'answered' && isSelected) {
                    cssClases = 'selected';
                }
                if ((answerState == 'correct' || answerState == 'wrong') && isSelected) {
                    cssClases = answerState;
                }

                return (
                    <li key={answer} className="answer">
                        <button 
                            onClick={() => onSelect(answer)} 
                            className={cssClases} 
                            disabled = {answerState !== ''} 
                        > 
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}