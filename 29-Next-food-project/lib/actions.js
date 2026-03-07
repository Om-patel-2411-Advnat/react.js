'use server';

import { redirect } from "next/navigation";
import { SaveMeal } from "./meals";
import { revalidatePath } from "next/cache";

// as of now we are using the formState we have to accept two parameters one is prevValue which is the first value which you have accept use it or not is up to you but you have to accept it other wise the second value of the form data will be got to the prevState and the formData will become undefine
export async function shareMeal(prevState , formData) {

    function InvalidCheck(text){
        return !text || text.trim() === '';
    }

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    if (
        InvalidCheck(meal.title) || 
        InvalidCheck(meal.summary) || 
        InvalidCheck(meal.instructions) || 
        InvalidCheck(meal.creator) || 
        InvalidCheck(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ){
        return {
            message : 'Invalid Input'
        };
    }
    
    await SaveMeal(meal);

    // nextjs performs very aggressive caching and it does't re-fetch the data once it stored into the cache 
    // and we ant that when ever the new meal is added we want to re-fetch the data for that nextjs provides a in-build function revalidatePath()
    // this function tells nextJs  to revalidate the cache that belongs to a certain route path
    // by default only this path will be validated not any nested paths 
    // here the second argument is nothing else but the indicated to which reload by default it's set to the page we can change it as we do here 
    // after adding layout all the nested pages will be revalidate 
    // revalidatePath('/meals' , 'layout');
    // we can revalidate every route by doing this 
    // revalidatePath('/' , 'layout');

    // but here we just want to revalidate the meals path so we will do just that
    revalidatePath('/meals' , 'layout');

    redirect('/meals');
}