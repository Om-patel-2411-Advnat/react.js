'use client';

import { useFormState } from 'react-dom';

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function ShareMealPage() {

    // this hook little bit works like the useState hook and this is responsible for managing the state of this function 
    // here we have to pass an first argument is a function that handle the submission and the second argument is the initial value before that action is performed and this value will be used if we haven't get the response
    // we get two value from this hook like useState one of them is current response means the latest response sended by the action function here (shareMeal) if no response is received yet than get the initial value 
    // second value is is the form action function which we should set as a action value on the form 
    const [state , formAction] = useFormState(shareMeal , {message : null} );

    // we are moving this in another component /lib/action.js
    // // for making it complete server action you should add async keyword in front of the function 
    // async function shareMeal(formData){
    //     // this will create so called server action which is a function that guaranteed to execute on the server , and only there  
    //     // you are not allowed to use it into " use client " components
    //     'use server';

    //     const meal = {
    //         title : formData.get('title'),
    //         summary: formData.get('summary'),
    //         instructions: formData.get('instructions'),
    //         image: formData.get('image'),
    //         creator: formData.get('name'),
    //         creator_email : formData.get('email'),
    //     }
    //     console.log(meal);
    // }

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label="Your image" name="image" />
                    {state.message && <p>{state.message}</p>}
                    <p className={classes.actions}>
                        <MealsFormSubmit />
                    </p>
                </form>
            </main>
        </>
    );
}