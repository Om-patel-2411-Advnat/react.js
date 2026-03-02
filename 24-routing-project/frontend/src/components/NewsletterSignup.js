// fetcher should basically used whenever you wanna trigger action or also a loader without actually navigating to the page which loader or actions belongs
import { useFetcher } from 'react-router-dom';  

import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {

    // useFetcher gives us an object which is contain some use full properties fro example it gives you another form component which is different from the other from component we used before and same for submit
    // 
    const fetcher = useFetcher();

    // here fetcher also provide data and state which is very use full and state works same as navigation hook(ideal , loading , submitting) ;
    const { data , state} = fetcher ;

    useEffect(()=>{
        if(state === 'idle' && data && data.message){
            window.alert(data.message);
        }
    } ,[data , state])

    return (
        // this is different from the other file components because this will send a request to the action but this will not initialize the route transition 
        <fetcher.Form action="/newsletter" method="post" className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;