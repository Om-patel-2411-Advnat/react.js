import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items : [] ,
    totalQuantity : 0 ,
    change : false ,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState ,
    reducers : {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items || [];
        },
        addItemtoCart (state , action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.change = true ;
            if(!existingItem){
                state.items.push({
                    id : newItem.id , 
                    price : newItem.price , 
                    quantity : 1 , 
                    totalPrice : newItem.price ,
                    name :  newItem.title
                });
            }else{
                existingItem.quantity ++ ;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemtoCart (state , action){
            const id = action.payload ;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.change=true ;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);
            }else{
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price
            }
        },
    },
})

export const ModifyCart = cartSlice.actions ;

export default cartSlice.reducer ;