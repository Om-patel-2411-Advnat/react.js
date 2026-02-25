import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem.jsx";

export default function Meal(){

    const [loadedMeal , setLoadMeal] = useState([]);

    useEffect(() => {
        async function fetchmeals() {
        const response = await fetch('http://localhost:3000/meals');

        // if (response.ok) {

        // }
        const meals = await response.json();
        setLoadMeal(meals);
        }
        fetchmeals(); 
    },[])

    


    return(
        <ul id="meals">{loadedMeal.map(meal =>
            <MealItem key={meal.id} meal={meal} />
            )}
        </ul>
    )
}