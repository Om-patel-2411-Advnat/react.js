import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isShow : false ,
    notification : null ,
}

const showCartSlice = createSlice({
    name : 'ShowCart',
    initialState,
    reducers : {
        toggle (state) {
            state.isShow = !state.isShow ;
        },
        showNotification(state , action) {
            state.notification = {
                status : action.payload.status,
                title : action.payload.title ,
                message : action.payload.message,
            };
        }
    }
})

export const  cartAction = showCartSlice.actions ;

export default showCartSlice.reducer ;