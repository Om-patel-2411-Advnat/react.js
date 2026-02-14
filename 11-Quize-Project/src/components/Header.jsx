import logo from '../assets/quiz-logo.png'

export default function Header(){
    return(
        <header>
            <img src={logo} alt="Quize-logo" />
            <h1>ReactQuize</h1>
        </header>
    )
}