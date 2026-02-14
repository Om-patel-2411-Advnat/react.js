import completeLogo from '../assets/quiz-complete.png';

export default function QuizComplete(){
    return (
        <div id="summary">
            <img src={completeLogo} alt="" />
            <h2>Quiz Completed</h2>
        </div>
    )
}