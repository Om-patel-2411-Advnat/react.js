// this is the hook which gives us access to the currently set query parameter
import {  useActionData, useNavigation, useSearchParams } from 'react-router-dom'

// import { useState } from 'react';
import { Form , Link } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {

  const data = useActionData();
  const navigation = useNavigation();

  // this hook gives us array which contain some values and out of them first is searchParams will give us the current query parameter ans second is a function that updates the query parameters
  // here we don't need the second value because we will update it via Link
  const [searchParams ] = useSearchParams();
  // this allows use to get the value for specific query parameter.
  const isLogin = searchParams.get('mode') === 'login';

  const isSubmitting = navigation.state === 'submitting';

  // we are going to handle this with the help of query
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && <ul>
            {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
          </ul>
        }
        {
          data && data.message && <p>{data.message}</p>
        }
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
