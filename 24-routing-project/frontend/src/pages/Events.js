import { Link } from "react-router-dom"

const DUMMY_EVENTS = [
    {id: '1' , title : 'Event number 1'},
    {id: '2' , title : 'Event number 2'},
    {id: '3' , title : 'Event number 3'},
]

export default function EventsPage(){
    return(
        <main>
            <h1>Your Events</h1>
            {DUMMY_EVENTS.map(event => (
                <li><Link to={event.id}>{event.title}</Link></li>
            ))}
        </main>
    )
}