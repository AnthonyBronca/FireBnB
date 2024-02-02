import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";

// Define the types for the User interface
interface User {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    isHost: boolean;
};

// Define a type for the slice state
interface sessionState {
    user: User | null;
};

// Define the initial state using that type
const initialState: sessionState = {
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

export const { setUser, editUser, removeUser } = SessionSlice.actions;

export default SessionSlice.reducer;
