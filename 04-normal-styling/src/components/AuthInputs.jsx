import { useState } from 'react';

// this is called the styled component method for adding styling in that we install the package named styled-component to apply third party styling 
import { styled } from 'styled-components'

// now we move the all the third party styling in a different files and now we will import them one by one 

import Button from './Button.jsx';
import Input from  './Input.jsx';


// for seeing example of nesting the styling see the Header.jsx file
// that's how we apply third party styling 
const CntorleCantainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">

      {/* after using this the other styles applied to the label and input field will be gone for implements them we also have to create another component like ControleComponnt*/}
      <CntorleCantainer>
          {/* we are managing this in a input.jsx file */}
          {/* <Label 
            // you can also apply two classname one of them is applied all time and one is applied at some certain condition 
            // className={`label ${emailNotValid ? 'invalid' : undefined}`}
             
            // as of now if you are using styled components than you can pass props to the styling like normal jsx code 
            // here while using this props there are some chances that they are clash with the inbulid props like here invalid is a inbuild prop so we can use $ at the start of the prop to stop that clash and you also have to add this sign in above styled field also
            $invalid = {emailNotValid}
          >
          Email</Label> */}
          <Input
            label = {'Email'}
            $invalid = {emailNotValid}
            type="email"

            // you can also apply inline styling like this but this is not good choice because this will make impossible to seperate the css and jsx code 
            // style = {{
            //   backgroundColor : emailNotValid ? 'red' : 'white'
            // }}

            // you can not also use this {  &&  } condition for adding the styles because this will give an error if the condition is false than class name will be set to false and this is not valid class name
            // className = {emailNotValid && 'invalid'};

            // that's why we use calss properties to aplly styling on the component which is look less messy in code
            // we use ternaryoperator because it handles the false case also
            // className={emailNotValid ? 'invalid' : undefined}

            onChange={(event) => handleInputChange('email', event.target.value)}
          />

          <Input
            label = {'Password'}
            $invalid = {passwordNotValid}
            type="password"
            // className={passwordNotValid ? 'invalid' : undefined}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
      </CntorleCantainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button className='button' onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
