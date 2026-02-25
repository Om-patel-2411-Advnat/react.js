
// this is a new hook added into the react version 19
import { useActionState } from 'react';

import { hasMinLength, isEmail , isEqualToOtherValue , isNotEmpty } from '../util/validation.js'

// due to we are using action we are no longer gonna get event as a parameter but we are going to get "formData" as a parameter that we use in previous section
// in previous section we are making this formData object to get the all form data but here in action method we will get it directly
// now here this action prop will automatically prevent default behavior of browser to send request to the server
// here if we are passing this action function into the useActionState hook than the form data will be the second parameter and first parameter will be the previous state of the form so event if we are not using it we have to pass it into the parameter
function SignupAction(prevState, formData) {
  // now we can get any data just like this (here email is name that we use for the input field which value we want)
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');
  const firstName = formData.get('first-name');
  const lastName = formData.get('last-name');
  const role = formData.get('role');
  const terms = formData.get('terms');
  const acquisitionChannel = formData.getAll('acquisition');

  const error = [];

  if (!isEmail(email)) {
    error.push("Invalid Email Address ...")
  }
  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    error.push("Invalid Password ... ")
  }
  if (!isEqualToOtherValue(password, confirmPassword)) {
    error.push("Password is not same ...");
  }
  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    error.push("Please provide both first and last name ...")
  }
  if (!isNotEmpty(role)) {
    error.push("please select a role ...")
  }
  if (!terms) {
    error.push("you must agree to the terms and condition ...")
  }
  if (acquisitionChannel.length === 0) {
    error.push("please select any ony")
  }

  if (error.length > 0) {
    return {
      error, enteredValue: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        acquisitionChannel,
        terms,
        role,
      }
    };
  }

  return { error: null };
}

export default function Signup() {

  // this hook always wants a action function as a value 
  // this hook aims to manage some form related state for you or some action related state but at the end actions are related to the forms 
  // that's why it's needs a second value where you can provide initial state value because this action function may then return an updated state
  // here we need initial state because when the form is not submitted than the formData will not exists for for that we have to provide initial value and  it will be active if the action is has not been executed yet 
  // we don't just get the value of the form array into the form State but we also get the formAction and this function is wrap around the function that we provide in this case it's " SignupAction " 
  // that's why we get an updated formAction which in the end is our formAction but enhanced by react (it's the same function that we provide to the action but it will come with some extra features or react being aware of it) that's why now this action method should be set as a action prop into the form 
  // the last element you get is a pending element which is true or false depending on whether form is currently being submitted or not here we are not using it because we don't need it 
  const [formState , formAction] = useActionState(SignupAction , { error : null });

  return (
    // in normal html file this action method will send an http request to the server but in react it will be override by react and instead of sending request to server it will execute the function that we provide
    // while using action method make sure you provide name to every field for including those values into formData object 
    // when you use action method react reset the form values after the submit
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          name="email" 
          // here we apply ? after the enteredValue because this will check if the entered values are exist than only it will try to access the value inside that object 
          defaultValue={formState.enteredValue?.email}  
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            defaultValue={formState.enteredValue?.password}    
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValue?.confirmPassword}  
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input 
            type="text" 
            id="first-name" 
            name="first-name" 
            defaultValue={formState.enteredValue?.firstName}  
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input 
            type="text" 
            id="last-name" 
            name="last-name" 
            defaultValue={formState.enteredValue?.lastName}  
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select 
          id="role" 
          name="role"
          defaultValue={formState.enteredValue?.role}  
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked = {formState.enteredValue?.acquisitionChannel.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValue?.acquisitionChannel.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input 
            type="checkbox" 
            id="other" 
            name="acquisition" 
            value="other"
            defaultChecked={formState.enteredValue?.acquisitionChannel.includes('other')}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input 
            type="checkbox" 
            id="terms-and-conditions" 
            name="terms" 
            defaultChecked={formState.enteredValue?.terms}  
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.error && 
        <ul className='error'> 
          {formState.error.map(error => 
            <li key={error}>{error}</li>
          )}
        </ul>
      }

      <p className="form-actions">
        {/* here the reset button will not reset the input values and make them empty instead it will show the default previous value that we are managing if you want to make every input field empty as soon as yo click on the reset button than you have to manage them manually */}
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
