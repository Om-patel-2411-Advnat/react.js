import Image from 'next/image';

import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';


// this how we can generate metaData to the dynamic pages 
// this function receives the same data as the component function receive props
// the function name should be generateMetadata
export async function generateMetadata({params}){
    const meal = await getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }

    return {
        title : meal.title ,
        description : meal.summary,
    }
}

export default async function MealDetailPage({params}){

    const meal = await getMeal(params.mealSlug);

    // this is used to get the nearest not-found page if the meal is not found
    if(!meal){
        // this will show the nearest not-found page or the nearest error page who ever is closer but if they both are on same level than it will show the not-found page 
        notFound();
    }

    // this is to make the line break between every new line 
    meal.instructions = meal.instructions.replace(/\n/g , '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        By <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>   
                    </p>
                    <p className={classes.summery}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                {/* here we want to output every instruction of the meal that is stored and those should be output as a HTML code which can be achieved in React */}
                {/* this can be happen by setting dangerouslySetInnerHTML prop on element it's called like this because you open yourself up to cross-site scripting attack when outputting content as HTML content , as least if you're not validating it. */}
                {/* now this prop want object as a value and that object should have an __html property which then contains the actual HTML code that should be output on the screen  */}
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions, 
                }}></p>
            </main>
        </>
    )
}