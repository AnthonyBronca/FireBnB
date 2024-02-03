import { createSlice, Dispatch, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, SignUpUser, SessionInitialState } from "../typings/redux";
import axios from "axios";
// import type { RootState } from "./store";


// Define thunks

// To create an account
export const signUp = createAsyncThunk("session/setUser", async (user:SignUpUser) => {
  try {
      const response = await axios.post("/api/users");
      return response.data;
  } catch (error) {
      throw error
  }
});

// To restore the user session
export const restoreUser = createAsyncThunk("session/restoreUser", async () => {
  try {
      const response = await axios.get("/api/session");
      return response.data;
  } catch (error) {
      throw error
  }
});

// To log out the user
export const logOutUser = createAsyncThunk("session/removeUser", async () => {
  try {
      const response = await axios.delete("/api/session");
      return response.data;
  } catch (error) {
      throw error
  }
});

// To log in the user
export const logInUser = createAsyncThunk("session/logInUser", async () => {
  try {
      const response = await axios.post("/api/session");
      return response.data;
  } catch (error) {
      throw error
  }
});

// To edit the user's information
export const modifyUser = createAsyncThunk("session/editUser", async ({userId, form}:{userId:number|string, form:any}) => {
  try {
      const response = await axios.put(`/api/users/${userId}`, form);
      return response.data;
  } catch (error) {
      throw error
  }
});

// To delete a user
export const deleteUser = createAsyncThunk("session/removeUser", async (userId:number|string) => {
  try {
      const response = await axios.delete(`/api/users.${userId}`);
      return response.data;
  } catch (error) {
      throw error
  }
});

  
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
