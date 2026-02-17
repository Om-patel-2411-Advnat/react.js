import completeLogo from '../assets/quiz-complete.png';
import Questions from '../Question.js';

export default function QuizComplete({ userAnswer }){

    const skippedAnswers = userAnswer.filter(answer => answer === null);
    const correctAnswer = userAnswer.filter((answer , index) => answer  === Questions[index].answers[0]);

    const totalSkip = Math.round((skippedAnswers.length / userAnswer.length) * 100) ; 
    const totalCorrect = Math.round((correctAnswer.length / userAnswer.length) * 100);
    const totalWrong = 100 - totalSkip - totalCorrect

    return (
        <div id="summary">
            <img src={completeLogo} alt="" />
            <h2>Quiz Completed</h2>
            <div id='summary-stats'>
                <p>
                    <span className='number'>{totalSkip}%</span>
                    <span className='text'>Skipped</span>
                </p>
                <p>
                    <span className='number'>{totalCorrect}%</span>
                    <span className='text'>Right Answers</span>
                </p>
                <p>
                    <span className='number'>{totalWrong}%</span>
                    <span className='text'>Wrong Answers</span>
                </p>
            </div>
                <ol>
                    {userAnswer.map((answer , index)=> {

                        let cssClases = 'user-answer';
                        if(answer == null){
                            cssClases += ' skipped';
                        }else if(answer === Questions[index].answers[0]){
                            cssClases += ' correct';
                        }else{
                            cssClases += ' wrong';
                        }

                        return(
                            <li key = {index}>
                                <h3>{index +1}</h3>
                                <p className='question'>{Questions[index].text}</p>
                                <p className={cssClases}>{answer !== null ? answer : 'skipped'}</p>
                            </li>
                        );
                    })}
                </ol>
        </div>
    )
}