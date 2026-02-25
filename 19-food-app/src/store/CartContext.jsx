import { createContext, useReducer } from "react";

const CartContext = createContext({
    items : [],
    addItem : (item) => {},
    removeItem : (id) => {},
});

function CartReducer(state , action ){
    if(action.type === "ADD_ITEMS"){
        const ExistingItemIndex = state.items.findIndex((item)=> item.id === action.item.id);

        const updatedItems = [...state.items];
        
        if(ExistingItemIndex > -1){
            const existingItem = state.items[ExistingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity : existingItem.quantity + 1,
            };
            updatedItems[ExistingItemIndex] = updatedItem ;

        }else{
            updatedItems.push({...action.item , quantity : 1});
        }

        return {...state , items : updatedItems};
    }
    if(action.type === "REMOVE_ITEMS"){
        const ExistingItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingCartItem = state.items[ExistingItemIndex];
        const updatedItems = [...state.items];

        if(existingCartItem.quantity === 1){
            updatedItems.splice(ExistingItemIndex , 1);
        }else{
            const updatedItem = {...existingCartItem , quantity: existingCartItem.quantity - 1};
            updatedItems[ExistingItemIndex] = updatedItem ;
        }

        return {...state , items : updatedItems};
    }

    return state;
}

export function CartContextProvider({children}){

    const [cart , dispatchCartAction ] = useReducer(CartReducer , { items : [] });

    function addItem(item){
        dispatchCartAction({
            type: 'ADD_ITEMS',
            item
        })
    }
    function removeItem(id){
        dispatchCartAction({
            type: 'REMOVE_ITEMS',
            id
        })
    }
    const CartContextValue = {
        items : cart.items ,
        addItem,
        removeItem
    }
    console.log(CartContextValue)

    return <CartContext value={CartContextValue}>{children}</CartContext>
} 

export default CartContext;