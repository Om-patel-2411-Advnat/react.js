import {configureStore } from '@reduxjs/toolkit';
import showCartSlice from './uiSlice';
import cartSlice from './CartSlice.js'

const store = configureStore({
    reducer : {
        showCart : showCartSlice ,
        cart : cartSlice,
    }
})

export default store ;