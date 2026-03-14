import React, { useState } from "react";
import Todo from "../modals/todo";

type TodoContextObj = {
    items : Todo[];
    addTodo : (text : string) => void ;
    removeTodo : ( id : string ) => void
}

export const TodosContext = React.createContext<TodoContextObj>({
    items : [],
    addTodo : ()=>{},
    removeTodo : (id:string)=>{}
});

const TodoContextProvider:React.FC = (props)=>{

    const [todos , setTodos]= useState<Todo[]>([]);

    const addTodoHandler = (todoText : string) =>{
        const newTodo = new Todo(todoText);

        setTodos(prevTodo => {
        return prevTodo.concat(newTodo);
        })
    };

    const removeTodoHandler = (id : string) =>{

        setTodos(todos.filter(todo => todo.id !== id));
    }

    const contextvalue: TodoContextObj = {
        items : todos ,
        addTodo : addTodoHandler ,
        removeTodo : removeTodoHandler ,
    }

    return(
        <TodosContext.Provider value={contextvalue}>
            {props.children}
        </TodosContext.Provider>
    )
}   

export default TodoContextProvider;