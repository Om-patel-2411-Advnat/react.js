import { createContext , useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    UpdateCartItemQuantity: () => { },
});

// we are creating this function outside of the context function because this function should not be recreated when ever the component function executes because it won't need direct access to any value defined or updated in the component function and also it won't need props or anything like that.
// this function should accept two parameters "state" and "action" because this reducer function ultimately will be called by react after you dispatched a so called action 
// remember one thing whatever action you dispatch from the dispatch function will be accepted as a argument here 
// in the other hand the state will be always updated and managed by the reducer
// and inside this function you should return the updated state
function shoppingCartReducer(state , action){
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state,
            items: updatedItems,
        };
    }
    if (action.type === 'UPDATE_QUANTITY') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }
        return {
            ...state,
            items: updatedItems,
        };
    }
}

// now fro improving the structure of the app.jsx we move all the functionality to the context file and from here we will manage this and the components now should be wrapped around the CartContextProvider function and by doing that everything will be same and now context will be passes to the every component that are wrapped into the CartContextProvider function.
export default function CartContextProvider( {children} ){
    
    // for now connecting the reducer function we have to pass it to the reducer function
    // the second argument will set the initial value of the reducer function 
    // this initial state will be returned into the reducer function as a initial value of argument state
    // now for returning the updated state we have to manage the action in order to update the state
    const [shoppingCartState , shoppingCartDispatch] = useReducer(
        shoppingCartReducer ,
        {
            items: [],
        }
    );

    // now after using the reducer we can manage the state from the reducer function also we don't need state 

    // const [shoppingCart, setShoppingCart] = useState({
    //     items: [],
    // });

    // here we pass an object into the dispatch function and in this object we will tha get two values one is identifier (which will help us to identify which action to perform in the reducer function ) and other thing is payload is used for getting the arguments passed into the function in order to get this in action 
    function handleAddItemToCart(id) {

        shoppingCartDispatch({
            type : 'ADD_ITEM' ,
            payload : id
        });

    }
    function handleUpdateCartItemQuantity(productId, amount) {

        shoppingCartDispatch({
            type: 'UPDATE_QUANTITY',
            payload : {
                productId,
                amount
            }
        });

    }
    // here we are creating an object to pass into the value so we can also able to update the context with the state
    // as we discuss we just don't want to read we want to update so will also pass function in it
    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        UpdateCartItemQuantity: handleUpdateCartItemQuantity,
    }
    // now wny component which is wrapped between the context can now use this function by accessing the addItemToCart 
    return <CartContext value={ctxValue}> 
        {children}
    </CartContext>

}