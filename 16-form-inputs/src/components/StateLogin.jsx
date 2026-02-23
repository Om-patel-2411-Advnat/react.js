import { useState } from "react";

export default function Login() {

    // const [enteredEmail , setEnteredEmail] = useState('');
    // const [enteredPassword , setEnteredPassword] = useState('');
    const [enteredValue, setEnteredValue] = useState({
        email: '',
        password: ''
    })

    //  here this will not work because of default behavior of the html forms 
    function HandleSubmit(event) {
        // here we can prevent the default behavior by accessing the event and use inbuilt method like that
        event.preventDefault();

        console.log(enteredValue);
        // console.log('hello');
    }

    // now instead of creating this functions for every single form we can just handle it with the help of only one
    // function HandleEmail(event){
    //   setEnteredEmail(event.target.value);
    // }

    function HandleInputChange(identifier, value) {
        setEnteredValue((prevValue) => ({
            ...prevValue,
            [identifier]: value
        }))
    }


    return (
        // here in form whenever the button inside of the form is clicked it sends the http request to the server and this is a default way of forms 
        // now the second way to prevent the default behavior of the forms is to add the onsubmit method into the forms 
        <form onSubmit={HandleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" onChange={(event) => HandleInputChange('email', event.target.value)} value={enteredValue.email} />
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" onChange={(event) => HandleInputChange('password', event.target.value)} value={enteredValue.password} />
                </div>
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
