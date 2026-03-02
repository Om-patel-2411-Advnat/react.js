import { useRouteLoaderData } from 'react-router-dom'
import EventForm from '../components/EventForm.js'

export default function EditEventPage(){

    // this works same useLoaderData but it takes id as an argument
    const data = useRouteLoaderData('event-details');

    return(
        <EventForm event={data.event} method='patch'/>
    )
}