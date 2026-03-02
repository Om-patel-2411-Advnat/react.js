// import { useEffect, useState } from 'react';

// this is a another hook of react which is used for fetching the loader data that we provide 
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import EventsList from '../components/EventsList.js';

function EventsPage() {

    // now here we are using loader into the parent component so we don't havee to use this  function here we will get the fetch data directly from the parent component
    // const [isLoading, setIsLoading] = useState(false);
    // const [fetchedEvents, setFetchedEvents] = useState();
    // const [error, setError] = useState();

    // useEffect(() => {
    //     async function fetchEvents() {
    //         setIsLoading(true);

    //         setIsLoading(false);
    //     }

    //     fetchEvents();
    // }, []);

    // now for getting the loader data
    // const data = useLoaderData();

    //now here we are getting data in a object form 
    const {events} = useLoaderData();


    // now we will not render data directly we will use Await component to print the events
    // if(data.isError){
    //     return <p>{data.message}</p>
    // }

    // const events = data.events;

    // return (
    //     // now we can directly use this loader data into the child component so we don't have to pass the props 
    //     <EventsList events={events}/>
    // );

    // here Await has one special resolve prop which wants one of our deferred value( value that we send from the loader) as a value
    return (
        // now ffinal step is we have to wrap this component into Suspense component which is imported from the react 
        // this component is used to show some fallback while the data is not loaded 
        <Suspense fallback={<p style={{textAlign : 'center'}}>Loading....</p>}>
            <Await resolve={events}>
                {/* this function will execute once we have the data */}
                {(loadedEvents) => <EventsList events={loadedEvents}/>}
            </Await>
        </Suspense>
    )
}

export default EventsPage;

export async function loadEvents(){
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // this is how we can return an object of error also 
        // return {isError : true , message : 'could not fetch events.'}
        // throw { message: 'could not fetch events.' };

        // for differentiate the error based on there status we can send a new response
        throw new Response(JSON.stringify({ message: 'could not fetch events' }), { status: 500 });

        // when we use this json function we don't have to parse the data when we are using it
        // you can only do this in older versions of router into React Router v6.4 – v6.22
        // throw json(
        //     { message: 'could not fetch events' },
        //     { status : 500 } 
        // );
    } else {

        // instead of doing this all you can just simply return the response it self instead of extracting data and than you can extract the data where ever you are using it
        const resData = await response.json();
        return resData.events;

        // const resData = await response.json();
        // you can return any kind of data into loader 
        // return resData.events;

        // you can return a response object here also 
        // inside this response you can take any data of your choice string , array , object etc....  as a first argument and than you can configure it with greater detail with help of an extra object that can be set as a second argument
        // when ever you use return such a response in your loader , teh react touter package will automatically extract the data from your response when using useLoaderData 
        // const res = new Response('hello' , {status : 200});
        // return res ;
    }

}

// this loader code executes on the client side not on the server side it means it renders on the browser instead of backend so you can access localstorage any api etc..
// but you can not use hooks into the loaders like useState or useEffect etc...
// we take the code into the other function because we don't want to load whole component when the events are available but we want to show the button first and then when the events are there we will show the events
export function Loader(){
    // this differ function is used in older version if react older tha v7 and we are using higher version so we are not going to us it we can send directly an object
    // defer

    // now this data will be sended to the loadEvents 
    return {
        events : loadEvents(),

    }
}