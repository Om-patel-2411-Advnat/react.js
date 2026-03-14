import { useRef , useContext } from "react";
import classes from './NewTodo.module.css';
import { TodosContext } from '../store/Todo-context'

const NewTodo: React.FC
    // <{onAddTodo: (text : string)=> void }> 
    =  ()=>{

    const todoCtx = useContext(TodosContext);

    // here we don't which type of data will this ref will hold so we have to set it's type to generic 
    // here we have to define a type of the input so TS has it's inbuilt type with the name HTMLInputElement after doing that we can use this ref with any other inputs
    // using ref for different places we have different type for every field like HTMLParagraphElement for <p> element , HTMLButtonElement for <button> element etc 
    // now here we are making it clear that this ref will be connected to the HTML Input element 
    const textRef = useRef<HTMLInputElement>(null);

    function submitHandler(event : React.FormEvent){
        event.preventDefault();
        
        // here ? means if there is no value than connect this ref and set the value null
        // const enteredText = textRef.current?.value;

        // here ! means this ref will never be connected to the null value it will always have the value 
        const enteredText = textRef.current!.value;

        if(enteredText.trim().length === 0){
            return;
        }
         
        todoCtx.addTodo(enteredText);
    }

    return(
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">Todo Text</label>
            <input type="text" id="text" ref={textRef}/>
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo ;