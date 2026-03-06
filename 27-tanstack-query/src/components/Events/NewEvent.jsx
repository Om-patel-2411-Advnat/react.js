import { Link, useNavigate } from 'react-router-dom';

// here we are using useMutation because we want to send a post request if we want to get data we can use useQuery hook but for sending we have to use useMutation
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../Utils/http.js';
import { queryClient } from '../Utils/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  // this mutate is a function which you can call anywhere in this component to actually send this request because useMutation doesn't send request automatically it will send only when you tell it send
  const { mutate , isPending , isError , error } = useMutation({
    // here we can set the mutationKey but it's not necessary because they are about changing something on your backend , not about getting and storing data in your frontend
    mutationFn: createNewEvent,
    // here we can pass function that should be executed once the action is completed 
    // this will only execute if this mutation is success 
    onSuccess : ()=>{
      // when we add any new event the event is not visible into the event page but when we switch the tab and than switch back than we can see the new event but we want the data to be updated immediately when ever any new event is triggered 
      // for that we are using this queryClient which tell the react query that the data fetched by certain query is outdated now than it should be marked as stale and that an immediate refresh should be triggered if the query belong to the component that's currently visible on screen
      // and for doing that it takes an object which contains queryKey and this change will affect every query who contains this 'event' key into there queryKey like this will also update " queryKey: ['events', { search: SearchTerm }] " because this also contains the ' events ' key.
      // you can also make this applied changes to the exact key by adding this into the object " exact : true " so any other key like this queryKey: ['events', { search: SearchTerm }] , will be not affected only those will be affected who has exact key as 'events'
      queryClient.invalidateQueries({queryKey : ['events']});
      navigate('/events'); 
    },
  });

  function handleSubmit(formData) {
    mutate({event : formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting....'}
        {!isPending &&
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create 
            </button>
          </>
        }
      </EventForm>
      {isError && <ErrorBlock title="failed to create event" message={error.info?.message || 'Failed to create the event. Please check your inputs and try again later.'} />}
        
    </Modal>
  );
}
