import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, SignUpUser, SessionInitialState } from "../typings/redux";
import axios from "axios";

// DEFINE THUNKS
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
export const logOutUser = createAsyncThunk("session/logOutUser", async () => {
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
export const editUser = createAsyncThunk("session/editUser", async ({userId, form}:{userId:number|string, form:any}) => {
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

  
// DEFINE THE INITIAL STATE
const initialState: SessionInitialState = {
    user: null
};

// SessionSlice reducer
export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(signUp.fulfilled, (state, action:PayloadAction<{user:User}>) => {
            state.user = action.payload.user;
        })
        .addCase(restoreUser.fulfilled, (state, action:PayloadAction<{user:User}>) => {
            state.user = action.payload.user;
        })
        .addCase(logOutUser.fulfilled, (state, action) => {
            state.user = null;
        })
        .addCase(logInUser.fulfilled, (state, action:PayloadAction<{user:User}>) => {
            state.user = action.payload.user;
        })
        .addCase(editUser.fulfilled, (state, action:PayloadAction<{user: User}>) => {
            state.user = action.payload.user;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.user = null;
        })
    }
});

export default SessionSlice.reducer;