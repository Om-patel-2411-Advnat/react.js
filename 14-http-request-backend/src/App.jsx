import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces, HandleUserPlaces } from './Http.js'
import ErrorPage from './components/ErrorPage.jsx';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatingplaces , seterrorUpdatingPlaces ] = useState();

  // here we are adding states for handling the http requests 
  // now we have to manage the loading state also 
  const [isFetching, setisFetching] = useState(false);
  // another state for managing the error
  const [error, setError] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(()=>{
    async function fetchUserPlaces(){
      setisFetching(true)
      try {
        const places = await HandleUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({message: error.message || "failed to fetch user places.."})
      }

      setisFetching(false);
    }

    fetchUserPlaces();
  } ,[]);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;  
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    // fatch is also useful for sending the data not just receiving the data
    try {
      await updateUserPlaces([selectedPlace , ...userPlaces]);
    }catch(error){
      // now here instead of showing error we can simply set the places back to it previous sate so if any error occur we can get the older places 
      // that's called optimistic updates
      setUserPlaces(userPlaces);
      seterrorUpdatingPlaces({
        message : error.message || 'Failed to update',
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(
        userPlaces.filter((place)=>place.id === selectedPlace.current.id)
      ); 
    } catch (error) {
      setUserPlaces(userPlaces);
      seterrorUpdatingPlaces({message : error.message || 'Failed to delete place...'})
    }
   

    setModalIsOpen(false);
  }, [userPlaces]);

  function HandleError(){
    seterrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingplaces} onClose={HandleError} >
        {errorUpdatingplaces  && <ErrorPage title={'An error occurred !!'} message={errorUpdatingplaces.message} onConfirm={HandleError}/>}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
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
        {error && <ErrorPage title={"An error occurred!!"} message={error.message}/>}
        {!error && (
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isFetching = { isFetching }
          loadingText = {"Fetching your places..."}
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />)
        }

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
