import Header from "./components/Header.jsx";
import UserInput from "./components/userInput.jsx";
import Result from "./components/result.jsx";
import { useState } from "react";

const Initial = {
    initialInvestment : 10000,
    annualInvestment : 1200,
    expectedReturn : 6 ,
    duration : 10
};

function App() {

  const [userInput , setuserInput] = useState(Initial);

  const inputIsValid =  userInput.duration > 0;

  function HandleChange(inputidentifier , newvalue){
    setuserInput(prevvalue => {
        return {
            ...prevvalue ,
            [inputidentifier] : +newvalue
        };
    });
  }

  return (
    <>
      <Header />
      <UserInput  userInput={userInput} onChangeinput={HandleChange}/>
      {!inputIsValid && <p className = "center">Please enter valid duration(should be greater than zero).</p>}
      {inputIsValid && <Result input={userInput}/>}
    </>
  )
}

export default App
