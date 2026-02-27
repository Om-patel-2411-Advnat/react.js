import Counter from './components/Counter.js';
import Header from './components/Header.js';
import Auth from './components/Auth.js';
import UserProfile from './components/UserProfile.js';
import { useSelector } from 'react-redux';



function App() {

  const authenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <>
      <Header />
      {authenticated 
        ? <UserProfile />
        : <Auth /> 
      }
      <Counter />
    </>
  );
}

export default App;
