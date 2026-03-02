// import { Link, useParams } from "react-router-dom";
import { useRouteLoaderData, redirect, Await } from 'react-router-dom';
import EventItem from '../components/EventItem.js'
import EventsList from '../components/EventsList.js';
import { Suspense } from 'react';

export default function EventDetailsPage(){

    // const params = useParams();
    const {event , events} = useRouteLoaderData('event-details');


    return(
        <>
            <Suspense  fallback={<p style={{textAlign : 'center'}}>Loadding....</p>}>
                <Await resolve={event}>
                    {(loadEvent) => <EventItem event={loadEvent} />}               
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loadding....</p>}>
                <Await resolve={events}>
                    {(loadEvents) => <EventsList events={loadEvents}/>}
                </Await>
            </Suspense>
        </>
    )
}

async function loadEvent(id){
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'could not fetch event details' }), { status: 500 });
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'could not fetch events' }), { status: 500 });

    } else {

        const resData = await response.json();
        return resData.events;
    }

}

// here loader function containes an object which is passed by the react 
export async function loader({req , params}){

    const id = params.id;

    return {
        event : loadEvent(id),
        events : loadEvents()
    }
   
}

// this is action function 
export async function action({params , request}){
    const id = params.id

    const response = await fetch('http://localhost:8080/events/' + id  ,{
        method : request.method ,
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'could not fetch event details' }), { status: 500 });
    }

    return redirect('/events');
}