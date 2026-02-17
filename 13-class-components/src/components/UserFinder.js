// now we are going to convert this whole component into lass based component

import { Fragment, useState, useEffect , Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
// now we will use useContext here 
import UsersContext from '../store/Users-context.js';
import ErrorBoundary from './ErrorBoundary.js';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];  

class UserFinder extends Component{

    // this can only be used once if you wan to use multiple context you have to find another way
    static contextType = UsersContext;

    constructor(){
        super();
        this.state = {
            filteredUsers : [],
            searchTerm : '' ,
        };
    }
    componentDidMount() {
        // Send http request...
        this.setState({ filteredUsers: DUMMY_USERS });
    }

    componentDidUpdate(prevProp , prevState){
        if(prevState.searchTerm !== this.state.searchTerm){
            this.setState({
                filteredUsers : this.context.users.filter((user) => user.name.includes(this.state.searchTerm)),
            });
        }
    }

    searchChangeHandler(event){
        this.setState({ searchTerm : event.target.value});
    }

    render(){
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                </div>
                {/* we can wrap it around any component which might throw error and you can also wrap around more than one components */}
                <ErrorBoundary >
                    {/* here we are expecting the error so we can wrap it around the ErrorBoundary */}
                    <Users users={this.state.filteredUsers} />
                </ErrorBoundary>
            </Fragment>
        );
    }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;