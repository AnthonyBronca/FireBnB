import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, SessionInitialState } from "../typings/redux";
// import type { RootState } from "./store";


// Define the initial state
const initialState: SessionInitialState = {
    user: null
};

// SessionSlice reducer
export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{user: User}>) => {
            state.user = action.payload.user;
        },
        editUser: (state, action: PayloadAction<{user: User}>) => {
            state.user = action.payload.user;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
});

export const { 
    setUser, 
    editUser, 
    removeUser 
} = SessionSlice.actions;

export default SessionSlice.reducer;
