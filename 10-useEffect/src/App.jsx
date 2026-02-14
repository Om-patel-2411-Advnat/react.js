import { useRef, useState, useEffect , useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// we are using it here so when the code star to execute line by line this will execute first and we will have the stored places and we can pass them directly into states as a initial value as we passed in here 
const storedIds = JSON.parse(localStorage.getItem('selectedplaces')) || [];
const storedplaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
)

function App() {

  // now we are going to handle this model close and open with the help of useEffect we can remove the ref here
  // const modal = useRef();
  // add add one more state to set the value of open prop true or false 
  // so here we switch from managing the model in imperative way to managing it in a declarative way
  // now after doing this we have to change where we are using model.current.open() we should setIsOpen(true) and where we are using model.current.close() we should use setIsOpen(false);
  const [isOpen , setIsOpen] = useState(false);
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedplaces);

  // now let's say we use the useEffect for the localstorage like this 
  // now here this will work fine no error will be there but here we don't need to be execute on every render we only want to execute once so we can just directly use it and we are going to move this outside of the component function
  // useEffect(()=>{
  //   const storedIds = JSON.parse(localStorage.getItem('selectedplaces')) || [];
  //   const storedplaces = storedIds.map((id) => {
  //     AVAILABLE_PLACES.find((place) => place.id === id)
  // })
  //   setPickedPlaces(storedplaces);
  // } ,[])

  // here this navigator function is a in-build function of a browser that give us the current location of the user and it takes one function as a argument to handle what to do after fetching the location here we are sorting the places according to the use distance fom each and every places
  // it's returning an position object (you can change name if you want) that contains the longitude and latitude of the use location which help us to calculate the distance
  // but this function is a side effect because this code needed by the application but it's not directly related to the task the main goal of the component function because the main application of any main component is to return a render-able JSX code
  // let's try it to handle with the use state for that we created a new state up there
  // but this will drag us to the infinite execution of the app component because every time anything changes and app component re render it will recalculate the use distance again and go through the same process again and this loop will not stop
  // so overcome this problem we will now use useEffect Hook
  // navigator.geolocation.getCurrentPosition((position)=>{
  //   const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES , position.coords.latitude ,position.coords.longitude);

  //   setavailablePlaces(sortedPlaces);
  // })

  // now after using this the infinite loop of recalculating the distance will be gone
  // it takes two arguments 1] is a function that will contain you side effect code   2] second is an array of dependencies
  // very important ::  this function will be executed by react after every component execution
  // what means to say is that when this component executes this function will not execute immediately but it will execute after the jsx code is executed and than this side effect will execute the function
  // the dependency array will decide how many times this and when this useEffect will be executed
  // If you define this dependency array than react will take a look at the dependencies specified there and it will only execute this effect function again if the dependencies values changed , is we make it empty the react will only execute this effect once
  // here if you not include the array of second argument than this side effect will be execute after avery re-execution of the component


  useEffect(() => {
    console.log(navigator);
    if(navigator?.geolocation){
    navigator.geolocation.getCurrentPosition(
      (position) => {
      console.log(position);
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    } ,
    (error) => {
      console.log("Location error:", error);  

      // Optional: show default places if location fails
    });
    }
  }, []);

  function handleStartRemovePlace(id) {
    setIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // it's browser method like navigator we can use it directly
    // localstorage allow us to use setItem method to store some data into the browser storage and that data will be available if we leave the website or reload the website.
    // it takes two arguments as a input 1] identifier 2]value that should be stored and they both should be "String" no object no array for converting the array and object into string we have to use another method JSON.stringify() this will convert the data into string format
    // fro the getItem you have to use same identifier you used for the setItem
    // now the data we get from the getItem will be in string format to convert it into the original form we have to use another method JSON.parse()
    //  || [] this after the JSON.parse() is because if we not get any data than we will get an empty array 

    // here this is a side effect because this is not related to the JSX code directly 
    // but we should not use side effect here because we don't want it to be executed after every cycle of re-execution we only want it to execute when user click the any of the picture that's why it's not gonna led us to the infinite execution
    const storedIds = JSON.parse(localStorage.getItem('selectedplaces')) || [] ;
    // if same id we will not add the data
    if(storedIds.indexOf(id) === -1){      
      localStorage.setItem('selectedplaces' , JSON.stringify([id , ...storedIds]))
    }
  }

  // we are using this useCallback hook to make sure this function is created only one time and stored into the memory so whenever this function is has to recreate it will use the same value stored into the memory
  // it works same as useEffect
  // this hook basically returns a function as a value and this function is nothing else but wrapped inside of this hook
  const handleRemovePlace = useCallback(
    function handleRemovePlace() {
      setPickedPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
      );
      setIsOpen(false)

      // now this is also useEffect but we just want it to run on click so we will not use useEffect
      // now storing is not good enough we should be able to delete the items based on there id so let's do it
      // here we are getting id's which places are stored into the array and than array od id's stored 
      const storedIds = JSON.parse(localStorage.getItem('selectedplaces')) || [];
      // now we will remove the item using the setItem and inside that using a filter method
      // here in filter method is the id that use click is not the current id than it will stay and is they are same than it will be removed 
      localStorage.setItem('selectedplaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)))
    }
  , [])
  // here we got an dependency array which works same as useEffect

 

  return (
    <>
      {/* now here we are passing the value of open true or false so we don't need ref */}
      <Modal 
      // ref={modal} 
      onClose={handleStopRemovePlace}
      open = {isOpen}
      >
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
