import { createContext } from "react";  

// here the value of this variable CartContext will be a object which contains react component that is created by the function of react CreateContext    
// after creating this the next step is to pass a value to the createContext which will be used as a initial value that can be provided to the multiple components that are wrapped but his context
// here you can provide any value to the createContext like number, string, array ,object etc....
// here we are not gonna use this context value direct this is just gonna help us in auto completion and make our life easy

export const CartContext = createContext({
    items : [],
    addItemToCart : () => {} ,
    UpdateCartItemQuantity : () => {},
});

// the next step after creating this context is to provide the components 
// we need to provide this context to the application and the component and also need to wrap it around the part of application that are parts of our component tree , so the wrapped component can access this value which we are providing here
// you can do this first by exporting it like we do  
// the next step is to go to the component that contains all the other components that will need to use this context here this is out App component
// you can import it and than wrap it around the components see in you app.jsx file for example
// next step is to consume it in the component that need it , to output some data like we are consuming it in cart.jsx component
// for accessing the context you have to import in which ever you file you wanna use the context
// now for accessing the context importing them is not enough we have to use another react Hook in order to get the context value 
// 1] the first Hook we can use is  ex: import { useContext } from 'react'
// now you can use this Hook inside of the component function and pass the context object inside it as an argument   ex: const cartCxt = useContext( CartContext );   
// that's how we can use the context ans storing it into another const variable 
// 2] another way to use this context is by using another Hook called use  ex: import { use } from 'react' and use it like same as useContext  ex: const cartCxt = use( CartContext );
//  the difference between this hook are that " use " Hook is more flexible tha the " useContext " because in the other hand we can not use any Hook inside of if statement or loops but we can use this " use " Hook inside of loops and if statements also that's why if we want to use Hooks in loop or any other place we use this hook
// but " use " hook is only available if you are using version more than 19
// for how we can use the context into elements visit the cart.jsx

// note::
// the default value set when creating the context is only used if a component that was not wrapped by the Provider component tries to access the context value 

// here we have to pass Value to the context wrapper for that see app.jsx

// now the next step is to link the context with the state because we want to update our context as we get the items in the cart not always the empty array

// context will be re-executed as the other hooks if any value inside of the context is changed here the hook will be re-execute not the context itself

// we can also create multiple context files in order to manage more values