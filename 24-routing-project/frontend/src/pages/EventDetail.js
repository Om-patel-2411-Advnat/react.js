import { Link, useParams } from "react-router-dom"

export default function EventDetailsPage(){

    const params = useParams();

    return(
        <>
            <h1>Event Details...</h1>
            <p>{params.id}</p>
            <Link to='..' relative="path">Back</Link>
        </>
    )
}