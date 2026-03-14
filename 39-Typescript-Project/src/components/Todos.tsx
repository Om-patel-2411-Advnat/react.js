// look here we don't know the type of the props so we can set it to any but than there will be no us eof typescript so what we have to do is set the type of the component function in generic way
// here by doing this you can not use special prop like " children "
// let's see how to do it after this code 
// export default function Todo(props){
//     return(
//         <ul>
//             {props.}
//         </ul>
//     )
// }

import React , {useContext} from "react";

import TodoItem from "./TodoItem";
import classes from './Todos.module.css';
import { TodosContext } from '../store/Todo-context';


// now we can assign type here to this todo constant and here the type should be React.FC ( FC = Functional Component )
// here we are setting the type generic 
// here FC is the type that defined in this react package or typescript package 
// FC is a function component which is yet another type definition built into this react package 
// what FC does is it makes it clear that this here is a function that acts as a Functional component 
// after doing that you can use the special props like " Children prop " 
// by adding this type annotation now our IDE and TS understands that this is functional component and it receives a prop object as a argument which will be an object which will always have children and it understands this all because of this type assignment here 
// here React.FC is already a generic type and it describes a type define by the react package that is actually generic so that type internally is also define with those angular brackets ( <> )
// here we are adding an <> brackets to our code we are not setting up a new generic type with somePlaceholder type T , but here we are plugging in a concrete value for that internally used generic type before that type T  define by that React.FC type
// we are doing that ( adding <{}> this generic type ) because we can't let TS infer that generic type here because here we are not calling some generic function with some parameter where the value then could be used for the inference but instead we are defining a function and we wanna let TS know how it should treat this function internally that it should get some props to find by us and merge those with some base props like the children prop which all Functional Component have
const Todos: React.FC
    // <{ items : Todo[] ; onremoveTodo: (id : string)=> void}> 
    = (props)=>{

    const todoCtx = useContext(TodosContext);


    return(
        <ul className={classes.todos}>
            {todoCtx.items.map(item =>(
                // here bind is default method of JS which allows us to pre-configure a function for future execution 
                // the first argument of the bind is this keyword and here we will set it to null
                // than we set the first argument that onremoveTodo will receive later 
                <TodoItem 
                    key={item.id} 
                    text={item.text} 
                    onremoveTodo={todoCtx.removeTodo.bind(null , item.id)}
                />
            ))}
        </ul>
    )
}
export default Todos ;