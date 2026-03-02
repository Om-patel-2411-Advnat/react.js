import { Form, useNavigate , useNavigation  , useActionData ,redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  // it gives the data returned by the action 
  const data = useActionData(); 
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';



  function cancelHandler() {
    navigate('..');
  }

  return (
    // here this Form is slightly different from the html forms because it will not send request to the server but it will send the request to the action function and this is very use full 
    // here by using this method we are going to send request to the currently active route because of this Form method of the react if we want to send action to another parh we can use action prop to send the request on desire path 
    <Form 
      method={method} 
      // we don't need this because we are calling only current active route here 
      // action='/any-other-path' 
      className={classes.form}
    >
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;

// while the data is sended  from the Form will be handled here 
// for handling the data this action method contains in-build object which is very use-full 
export async function action({ request, params }) {

  // here we are not interested into the params because we have to handle request sended by the form 
  const data = await request.formData();
  const method = request.method;

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }
  let url = 'http://localhost:8080/events';

  if(method === 'PATCH'){
    const id = params.id ;
    url = 'http://localhost:8080/events/' + id
  }

  const response = await fetch(url , {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData)
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'failed to send data...' }), { status: 500 });
  }
  return redirect('/events');
}
