import { useState , useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { HandleFetchPlaces } from '../Http.js'

export default function AvailablePlaces({ onSelectPlace }) {

  // now we have to manage the loading state also 
  const [isFetching , setisFetching] = useState(false);
  // another state for managing the error
  const [error , setError ] = useState();
  // here we are going to fetch the data 
  const [AvailablePlaces , setAvailablePlaces] = useState([])

  // now here this fetch will return a js promise which will get us the value 
  // so it is a promise so you can apply promise methods into it by chaining
  // now fetching data like this can cause infinite loop because when ever this component re-executes this fetch request will re-executes and we will stuck in infinite loop
  // so for avoiding this infinite loop we are going to use useEffect
  // after using this we are fetching the data successfully here and now we will try to do it with async and await 
  // useEffect(()=>{
  //   fetch('http://localhost:3000/places')
  //     .then((response)=>{
  //       return response.json();
  //     })
  //     .then((data)=>{
  //       setAvailablePlaces(data.places);
  //     })
  // } ,[]) 

  // let's see how we can get the data using async await
  // for using async await you have to create a function inside of useEffect function like this and than you can use async await 
  useEffect(() => {

    async function fetchplaces(){
      setisFetching(true);
      try {       

        const places = await HandleFetchPlaces();
          
        // now here we have to change the place of setisFetching because this might take time to sort the places and mean while before we got the sorted places this setisFetching will set false and that's not we want so we will put this setisFetching into this because we can not use await on this navigator function because this will not return a promise
        navigator.geolocation.getCurrentPosition((position)=>{

          let sortedPlaces = sortPlacesByDistance(
            places , 
            position.coords.latitude , 
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setisFetching(false);

        })

      } catch (error) {
        setError(error);
        setisFetching(false);
      }

    }

    // for making sure that this function executes we have to call it and that's for we are calling it inside the useEffect 
    fetchplaces();
  }, []) 
  
  // now if we have an error we want to go to the another component instead of printing this jsx component
  if(error){
    return <ErrorPage title={"An error occurred !! "} message={error.message}/>
  }

  // now here instead off using promise methods you directly use async await for the values 
  // now here fo using the await keyword you have to use async for the function but in this case react don't allow this type of keywords in component functions
  // const response = await fetch('http://localhost:3000/places')

  return (
    <Places
      title="Available Places"
      places={AvailablePlaces}
      isFetching = {isFetching}
      loadingText = {'Fetching the data ....'}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
