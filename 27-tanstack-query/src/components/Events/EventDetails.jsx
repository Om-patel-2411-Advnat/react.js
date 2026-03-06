import { useQuery , useMutation } from '@tanstack/react-query';

import { Link, useNavigate, Outlet, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { deleteEvent, fetchEvent , queryClient} from '../Utils/http.js';
import Modal from '../UI/Modal.jsx';
import { useState } from 'react';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {

  const [isDeleting , setIsDeleting] = useState(false);

  const param = useParams();
  const id = param.id;
  const navigate = useNavigate();

  const {mutate , isPending : isDeletePending , isError : isErrorDelete , error : deleteError} = useMutation({
    mutationFn : deleteEvent ,
    onSuccess : ()=>{
      // here this refetchType will stope th execution onf this query once it's success and when new request is send it will work again
      queryClient.invalidateQueries({ queryKey: ['events'], refetchType :'none' });
      // this is used to remove the item from the cache
      // queryClient.removeQueries({ queryKey: ['event-detail', id ] });
      navigate('/events')
    }
  })

  const {data , isPending ,isError ,error } = useQuery({
    queryKey: ['events', id] ,
    queryFn: ({signal}) => fetchEvent({id , signal}) ,
  })
  if (isError) {
    return <p>{error.message}</p>;
  }
  if (isErrorDelete) {
    return <p>{deleteError.message}</p>;
  }

  function startDelete(){
    setIsDeleting(true);
  }
  function stopDelete(){
    setIsDeleting(false);
  }

  function onHandleDelete(){
    mutate({id})
  }

  return (
    <>
      {isDeleting && 
        <Modal onClose={stopDelete}>
          <h2>Are you sure ?</h2>
          <p>Once this is deleted its can not be undone</p>
          <div className='form-actions'>
            <button onClick={stopDelete} className='button-text'>Cancel</button>
            <button onClick={onHandleDelete} className='button'>{isDeletePending ? 'Deleting....' : 'Delete'}</button>
          </div>
          {isErrorDelete && <ErrorBlock title='Failed to Delete' message={error.info?.message || 'Please try again after a while'}/>}
        </Modal>
      }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <p style={{textAlign : 'center'}}>Loading...</p>}
      {!isPending &&
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={startDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt="" />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.time}</time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      }
    </>
  );
}
