import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../Utils/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const token  = useLoaderData();
  const submit = useSubmit();


  // here this approach has a flow because if user login and than go away for 10 min and than come and reload the application and therefore this effect will trigger again and the timer will be reset that's why we can not use it
  // so we are going to manage the timer into our auth file
  useEffect(()=>{

    if(!token){
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
    }
    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);

  } ,[token , submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
