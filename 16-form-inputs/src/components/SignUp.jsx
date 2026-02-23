export default function Signup() {

    // here you can use useRef and useState but it would be more complex to implement and required lot of work to be done
    // now we are going to use built in feature for getting hold of this values because it turns out that browser actually helps you with handling the form submission 

    function HandleSubmit(event){
        event.preventDefault();

        // this inbuilt feature allows you to create a special kind of object based on a special kind of constructor function that's built into the browser name is "FormData()"
        // note : all the input that you want to access must have the name prop on them like " name = 'email' "
        const formdata = new FormData(event.target);

        // here now we have to get all the data manually by doing this but by doing this we might end up with large code block so for preventing this we can use another built in feature of js 
        // const enteredEmail = formdata.get('email');

        // this will convert all the entered values into the key:value prop like " email : enteredEmail " like this 
        // when we are using formEntries than we might loss the multiple values of same name that we want to store into array here like we are doing with options 
        // but you can easily get them back by manually extracting ang storing them like we do here 
        const acquisitionChannel = formdata.getAll('acquisition')
        const data = Object.fromEntries(formdata.entries());
        // here we are merging the data 
        data.acquisition = acquisitionChannel;
        console.log(data);

        // this will reset the form and act same as when we pass the button type reset like this " type = 'reset' "
        event.target.reset();
    }

    return (
        <form onSubmit={HandleSubmit}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" />
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                    />
                </div>
            </div>

            <hr />

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" />
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" />
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                <select id="role" name="role">
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
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input type="checkbox" id="other" name="acquisition" value="other" />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms" />I
                    agree to the terms and conditions
                </label>
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button type="submit" className="button">
                    Sign up
                </button>
            </p>
        </form>
    );
}