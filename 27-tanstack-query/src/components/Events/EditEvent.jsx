import { Link, useNavigate, useParams , redirect , useSubmit , useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent , queryClient } from '../Utils/http.js';
// import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useNavigation();
  const submit = useSubmit();

  // here we are using loader function to fetch data initially when the page is loaded so we don't need the isPending state
  const { data , isError , error } = useQuery({
      queryKey : ['events' , id],
      queryFn : ({signal})=>fetchEvent({signal , id}),
  });

  // we are using useSubmit hook to submit the form data so we don't need the useMutation hook
  // const {mutate } = useMutation({
  //   mutationFn : updateEvent,
  //   // we are not using this here because we are going to use optimistic update instead of queryClient method
  //   // onSuccess : ()=>{}

  //   // this function will execute right after you call the mutation function
  //   // here we are going to update the data because this will be executed even before the mutate function is executed 
  //   onMutate : async (data)=>{
  //     const newEvent = data.event;
  //     // this will cancel all the query for this key and we will not have response clashing data from those queries and our updated data 
  //     // and this process is gonna take the time so you have to use async await here 
  //     await queryClient.cancelQueries({ queryKey: ['events', id]});

  //     // here we want to make sure that if any data us invalid and any error occurs than we want to roll back to the old state for that we have to store our old data and we can do this with the help of queyClient 
  //     // this will give us the currently stored data
  //     const prevEvent = queryClient.getQueryData(['events', id]);

  //     // here queryClient has access on every query so we can get the data and update it right here 
  //     // this will manipulate the already stored data without waiting for a response normally it's manipulated by react query when you get a new response that's being cached but here you can manipulate the data by yourself
  //     // and for updating the data setQueryData needs 2 argument 1] queyKey 2]the new data you wanna store
  //     // the mutate function will pass the data directly into this function so you can get that directly 
  //     queryClient.setQueryData(['events', id], newEvent );

  //     return { prevEvent }
  //   },

  //   // this will execute is the mutation has an error 
  //   // here the context value will be the returned value of the onMutate function in this case context === prevEvent 
  //   onError : (error , data , context )=>{
  //     queryClient.setQueryData(['events', id] , context.prevEvent)
  //   },

  //   // we will call this whenever this mutation is done no matter if it's failed or succeeded 
  //   // here we are taking care of that no matter what happens but when ever the data is changes or not but we always fetch the updated data so the data stays in sync 
  //   onSettled : ()=>{
  //     queryClient.invalidateQueries(['events' , id])
  //   }
  // })

  // here we don't need the mutate function because we are using useSubmit hook to submit the form data
  // function handleSubmit(formData) {
  //   mutate({id , event : formData});
  //   navigate('../')
  // }

  function handleSubmit(formData){
    submit(formData , {method : 'PUT'});
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // if(isPending){
  //   content = <div className='center'>
  //     <LoadingIndicator />
  //   </div>
  // }
  if(isError){
    content = (
      <>
        <ErrorBlock title='Failed to load event' message={error.info?.message || 'Failed to load event. Please check your network'}/>
        <div className='form-actions'>
          <Link to='../' className='button'>Okay</Link>
        </div>
      </>
    )
  }
  if(data){
    content = (<EventForm inputData={data} onSubmit={handleSubmit}>
      {state === 'submitting' ? <p>Submitting...</p> :
      (<> 
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </>)
      }
    </EventForm>)
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

// here we will use loader to fetch the data for the edit event page
// here we are going to use queryClient to fetch the data
export function loader({params}){
  const id = params.id;
  return queryClient.fetchQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  })
}

export async function action({request , params}){
  const id = params.id; 
  const formData = await request.formData();
  const data = Object.fromEntries(formData); // this will convert the form data into an object
  await updateEvent({id, event: data});
  await queryClient.invalidateQueries(['events']);
  return redirect('../'); 
}
