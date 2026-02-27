import { useSelector , useDispatch } from 'react-redux';
import { authActions } from '../Store/authSlice.js';

import classes from './Header.module.css';

const Header = () => {

  const dispatch = useDispatch();

  function handleLogout(){
    dispatch(authActions.logout());
  }

  const authenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {authenticated && (
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
      
    </header>
  );
};

export default Header;
