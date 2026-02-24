import Input from "./Input.jsx";
import {isEmail , isNotEmpty , hasMinLength } from '../util/validation.js'
import { useValidate } from "./hooks/useValidatee.js"; 

export default function Login() {

    const {
        value : emailValue,
        HandleInputChange : HandleEmailChnage ,
        HandleInputBlure : HandleEmailBlur ,
        hasError: EmailhasError
    } = useValidate('' , (value)=>isEmail(value) && isNotEmpty(value));
    const {
        value : passwordValue,
        HandleInputChange : HandlePasswordChnage ,
        HandleInputBlure : HandlePasswordBlur ,
        hasError : PasswordhasError
    } = useValidate('' , (value)=>hasMinLength(value , 6));

    // const [enteredEmail , setEnteredEmail] = useState('');
    // const [enteredPassword , setEnteredPassword] = useState('');
    
    // const EmailisValid = didEdit.email && !isEmail(enteredValue.email) && !isNotEmpty(enteredValue.email);
    const PasswordISValid = didEdit.password && !hasMinLength(enteredValue.password , 6) ;

    //  here this will not work because of default behavior of the html forms 
    function HandleSubmit(event) {
        // here we can prevent the default behavior by accessing the event and use inbuilt method like that
        event.preventDefault();

        if(EmailhasError || PasswordhasError){
            return;
        }

        console.log(emailValue , passwordValue);
        // console.log('hello');
    }

    // now instead of creating this functions for every single form we can just handle it with the help of only one
    // function HandleEmail(event){
    //   setEnteredEmail(event.target.value);
    // }

    // function HandleInputChange(identifier, value) {
    //     setEnteredValue((prevValue) => ({
    //         ...prevValue,
    //         [identifier]: value
    //     }));
    //     // this was added because when ever user stop typing and if the input is wrong it will show error and when user start typing again than error will be gone and if the input is wrong the error will show again 
    //     setDidEdit(prevEdit => ({
    //         ...prevEdit,
    //         [identifier]: false
    //     }))
    // }

    // function HandleInputBlure(identifier) {
    //     setDidEdit(prevEdit => ({
    //         ...prevEdit,
    //         [identifier]: true
    //     }))
    // }

    return (
        // here in form whenever the button inside of the form is clicked it sends the http request to the server and this is a default way of forms 
        // now the second way to prevent the default behavior of the forms is to add the onsubmit method into the forms 
        <form onSubmit={HandleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <Input 
                    label='Email' 
                    id='email' 
                    type='email' 
                    name='email' 
                    // this in another built in property of html tags that can be used when ever the input field looses the focus than the accordingly function will be called 
                    onBlur={HandleEmailBlur}
                    onChange={HandleEmailChnage}
                    value={emailValue} 
                    error={EmailhasError && 'Please enter valid email..' }
                />
                <Input 
                    label='Password' 
                    id='password' 
                    type='password' 
                    name='password' 
                    // this in another built in property of html tags that can be used when ever the input field looses the focus than the accordingly function will be called 
                    onBlur={HandlePasswordBlur}
                    onChange={HandlePasswordChnage}
                    value={passwordValue} 
                    error={PasswordhasError && 'Please enter more than 6 characters..'}
                />
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                {/* we can prevent the default behaviour of the form into the button by adding it's type like this but remember that the default type is submit type */}
                {/* <button type="button" className="button" onClick={HandleSubmit}>Login</button> */}
                <button className="button" >Login</button>
            </p>
        </form>
    );
}
