import { Outlet } from "react-router-dom"
import EventsNavigation from "../components/EventsNavigation"

// import { useLoaderData } from "react-router-dom"

export default function EventsRootPage(){

    // here we will be not able to use this loader data because we are sending in a lower component that this component is 
    // const events = useLoaderData();
    // console.log(events);

    return(
        <>
            <EventsNavigation />
            <Outlet />
        </>
    )
}