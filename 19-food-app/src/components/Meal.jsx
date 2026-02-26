import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const fetchConfig = {} ;

export default function Meal(){

    const { data: loadedMeal, isLoading, error } = useHttp('http://localhost:3000/meals', fetchConfig , []);

    if(isLoading){
        return <p className="center">Fetching the Data....</p>
    }
    if(error){
        return <Error title="Failed to fetch meals" message={error} />
    }

    return(
        <ul id="meals">{loadedMeal.map(meal =>
            <MealItem key={meal.id} meal={meal} />
            )}
        </ul>
    )
}