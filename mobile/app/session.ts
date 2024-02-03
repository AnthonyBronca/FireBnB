import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User, SignUpUser, SessionInitialState } from "../typings/redux";
// import type { RootState } from "./store";


// Define thunks

// To create an account
export const signup = (user: SignUpUser):any => async (dispatch: any): Promise<any> => {
    const {firstName, lastName, email, username, password, isHost} = user;
    try {
      const response = await fetch("/api/users", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              firstName,
              password,
              lastName,
              email,
              username,
              isHost: isHost || false
          }),
      });
      const data = await response.json();
        dispatch(setUser(data));
    } catch (res:any) {
      if(!res.ok){
        let errors = await res.json();
        return errors;
      }
    }
};

// To restore the user session
export const restoreUser = () => async (dispatch: Dispatch) => {
    const response = await fetch('/api/session');
    if(response.ok){
        const data = await response.json();
        dispatch(setUser(data));
        return response;
    } else {
        throw new Error("Unable to restore user");
    }
};

// To log out the user
export const logout = ():any => async (dispatch: Dispatch) => {
    const response = await fetch('/api/session', {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"}
    });
    dispatch(removeUser());
    return response;
  };

// To log in the user
  export const login = (user: {credential: string, password: string}):any => async (dispatch: any): Promise<any> => { //thunks for database
    const { credential, password } = user;
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        credential,
        password,
      }),
    });
  
    if(response.ok){
      const data = await response.json();
      dispatch(setUser(data));
      return response;
    } else{
      return response
    }
  };

// To edit the user's information
  export const editUserThunk = (user:any, form:any): any => async(dispatch:any): Promise<any> => {
    const {id} = user;
    const {editEmail, editFirstName, editLastName} = form;
  
    const options = {
      method: "PUT",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail})
    }
    const response = await fetch(`/api/users/${id}`, options);
    if(response.ok){
      const data = await response.json();
      dispatch(editUser(data));
      return response;
    } else{
      return response;
    }
  };

// To delete a user
  export const deleteUserThunk = (user:any):any => async(dispatch:any): Promise<any> => {
    const {id} = user;
  
    const options = {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    }
    const response = await fetch(`/api/users/${id}`, options);
    if(response.ok){
      dispatch(removeUser())
    } else{
      return response;
    }
  };

  
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
