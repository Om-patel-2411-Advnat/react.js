import { Component } from 'react'

import classes from './User.module.css';

// now let's make this component class based component
// here in class based components we are not getting props as a destructuring them as we do in the function components 
// we need to do something else nt just using props in here but in general
// for that we have to import component from react
// for using prop you have to do that
// now we can access the props using this keyword basically it contains all the props data as we get for the components
class User extends Component{
  render(){
      return <li className={classes.user}>{this.props.name}</li>;
  }
}

// this is function based component
// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
