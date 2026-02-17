import { Component , useState } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {

  // now we have the method but we don't have the state so we will see how to use states into classes 
    // as we do in hooks first we have ti initialize and define the state and than update it when needed 
    // for defining we use constructor
    constructor(){
      // in class based components state is always a object
      // you have to add all the state into this one object like this
      super() ;
      this.state = {
        showUsers : true ,
        morestate : 'test',
      };
    }

    componentDidUpdate(){
      // we simply handle the error by using try and catch block if we want to handle the error into the same component
      // try {
      //   someError();
      // } catch (error) {
      //   // handle error
      // }

      // but if we want to handle this error in another component than we will just throw the error and we will handle it into another component
      // for that we have to create a error boundaries  
      if(this.props.users.length === 0){
        throw new Error ('No users Provided !!');
      }
    }

  // here you can define the functions as a method because you are defining function inside the class like this
  toggleUsersHandler(){

    // this is not valid how we can update the state 
    // this.state.showUsers = false

    // for updating state we have to do this
    // here it will always take object as a argument and this will not update the state directly but react will merge this state with the old behind the scenes 
    // like here we are updating the showUsers but the other state will be stay as it is 
    // here we not just want it ti set false we want a toggle value so we can use a function like the function component 
    // this.setState({showUsers : false});
    // here we can not do it totally same but we can do it by passing object like this
    // that's how we update the state 
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });

  }


  render(){

    // we can pass the helping variables into the  render methods like the function components
    const usersList = (
    <ul>
      {this.props.users.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>
  );

    return(
    <div className={classes.users}>
      {/* here you can not call it like this */}
      {/* <button onClick={toggleUsersHandler}> */}
      {/* for calling it you have to use this */}
      <button onClick={this.toggleUsersHandler.bind(this)}>
        {/* that's how we use the state  */}
        {this.state.showUsers ? 'Hide' : 'Show'} Users
      </button>
      {this.state.showUsers && usersList}
    </div>
  )}
};

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );
//   return(
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );


// };

export default Users;
