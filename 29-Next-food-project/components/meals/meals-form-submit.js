'use client';

// this hook is part of react but can only be used in next.js 
import { useFormStatus } from "react-dom";

export default function MealsFormSubmit(){
    // here we get an object as a status here so we are destructuring the values here
    const { pending } = useFormStatus();

    return (
        <button disabled={pending}>
            {pending ? 'Submitting....' : 'Share Meal'}
        </button>
    )
}