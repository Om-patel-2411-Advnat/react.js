import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

const Meals = async function (){

    console.log('Fetching...............');
    const meals = await getMeals();

    return <MealsGrid meals={meals} />

}

export default async function MealsPage() {


    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious Meals , created <span className={classes.highlight}>by you </span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself. It is Easy and Fun !!</p>
                <p className={classes.cta}>
                    <Link href='/meals/share' >
                        Share your favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching Meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}