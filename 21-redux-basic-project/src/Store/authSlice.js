import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated : false ,
}

const authSlice = createSlice({
    name: 'authentication',
    initialState : initialAuthState ,
    reducers : {
        login(state){
            state.isAuthenticated = true ;
        },
        logout(state){
            state.isAuthenticated = false ;
        },
    }
});

export const authActions = authSlice.actions ;

// we are exporting reducer only because we just want the reducer only 
export default authSlice.reducer ;