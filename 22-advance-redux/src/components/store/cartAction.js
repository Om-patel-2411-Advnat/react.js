import { cartAction } from './uiSlice.js';
import { ModifyCart } from './CartSlice.js';

// now we are going to create another thunk for fetching the data
export const fetchCartData = ()=>{
    return async (dispatch)=>{
        const fetchData = async ()=> {
            const response = await fetch('https://advance-redux-6e3fd-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok){
                throw new Error('Could not fetch Data..')
            }

            const data = await response.json();

            return data
        }
        try {

            const cartData = await fetchData()
            dispatch(ModifyCart.replaceCart(cartData));

        } catch (error) {
            dispatch(cartAction.showNotification({
                status : 'error',
                title : 'Error!...',
                message : 'Fetching Cart Data Failed! ..'
            })) 
        }
    }
}

// here we re going to create our own action creators let's see how we can do that
// for general reducer function redux automatically creates an action creator method for us which contains { type : '' , payload : ''}
// but in our own action creators we have to create our own action creator methods like we are doing in here 
// but here we are not going to return a object as we know thunk returns a function ad that function that handle the action 
// this is our " thunk " just an action creator 
export const sendCartData = (cart) =>{
    return async (dispatch)=>{
        dispatch(cartAction.showNotification({
            status : 'pending',
            title : 'sending...',
            message : 'Sending Cart Data! ..'
        }))

        const sendRequest = async () => {
            // cart.json is a firebase specific and it will create a new cart node in the database 
            const response = await fetch('https://advance-redux-6e3fd-default-rtdb.firebaseio.com/cart.json' ,{
                method : 'PUT',
                body : JSON.stringify({
                    items : cart.items , 
                    totalQuantity : cart.totalQuantity,
                }), 
            })
    
            if(!response.ok){
                throw new Error('Sending cart data is failed...');
            };
        }

        try {
            await sendRequest(); 

            dispatch(cartAction.showNotification({
                status : 'success',
                title : 'success!...',
                message : 'Send Cart Data successfully! ..'
            })) 

        } catch (error) {
            dispatch(cartAction.showNotification({
                status : 'error',
                title : 'Error!...',
                message : 'Sending Cart Data Failed! ..'
            })) 
        }  
    }
}