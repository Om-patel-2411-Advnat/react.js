 import { useRef, useState } from 'react';
 import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../Utils/http';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [SearchTerm , setSearchTerm] = useState();

  // here we are using isLoading because isPending will be true if the query is disabled but isLoading will not so we are using it here for that reason 
  const { data , isLoading , isError , error } = useQuery({
    // here we can set the queryKey to the 'events' than it will fetch all the vents but we want only those events who match the search value
    // by constructing a query key dynamically  , react query can cache (and refuse) different data for different key based on the same quey 
    queryKey: ['events', { search: SearchTerm }] ,
    queryFn: ({signal}) => fetchEvents({signal , SearchTerm}),
    // here is one more method of query to make it disable the request when we don't want to send request by doing this 
    enabled : SearchTerm !== undefined , 
  });


  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading){
    content = <LoadingIndicator />
  }

  if(isError){
    content = <ErrorBlock title="An error occurred " message={error.info?.message || 'Failed to fetch events'}/>
  }
  if(data){
    content = <ul className='events-list'>
      {data.map(event => (
        <li key={event.id}><EventItem event={event}/></li>
      ))}
    </ul>
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
