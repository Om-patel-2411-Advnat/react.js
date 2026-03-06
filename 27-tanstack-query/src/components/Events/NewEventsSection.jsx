// now we are going to use this custom hook created by the tanstack team and this hook will send the HTTP request  and get us this events data that we need and also give information about the loading state and potential errors 
import { useQuery } from '@tanstack/react-query';

// import { useEffect, useState } from 'react';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../Utils/http.js';

export default function NewEventsSection() {

  // here we have to pass an object into th hook in order to configure this hook
  // here in object we can set multiple methods and one of thm is " queryFn " with this function you define actual code that will be executed that will send the actual request
  // here we will get back an object as a result of react query and this object contains data , error , and loading state
  // the data is returned by your custom fetching function that you use 
  // for making sure that isError is true you must have to make sure that your code throws an error and here " error " contains the actual error message
  // there more things that you can use here as you need 
  const { data , isPending , isError , error } = useQuery({
    // queryKey is the name/ID of your data. it says “Hey, store and manage this data using this unique key.”
    // this key is actually an array which define using a unique queryKey name and all the component who has the same key will share the same data across with this array
    // Different keys keep data independent (['users'], ['posts'], etc.).
    // Changing values inside the key automatically fetches new data 
    // instead of strings only you can use object numbers anything you want 
    queryKey : ['events' , {max : 3}] ,
    // queryFn is the function that fetches the data.
    // this is a function that returns a promise 
    // we have create our own function to send the http request tanstack query doesn't have it's own method to send http request
    // here we also have access to the queryKey 
    queryFn: ({signal , queryKey})=>fetchEvents({signal , ...queryKey[1]}),

    refetchOnMount: 'always',

    // this will set the time like how much time after query will send request for updated data if you set 5000 for the stealTime than it will send request after 5 seconds
    staleTime : 5000 ,

    // this is Garbage collection Time. This controls how long the data and the cache will be kept around and the default here are 5 minutes. we can also change that 
    // gcTime : 30000 , // 30 seconds
  })


  console.log(data);

  // we are going to use tanstack query so we don't need this states
  // const [data, setData] = useState();
  // const [error, setError] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {

  //   fetchEvents()
  //     .then((events) => {
  //       setData(events);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);



  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to fetch events'} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
