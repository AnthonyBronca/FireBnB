import { SessionInitialState, SignUpUser, User } from '../typings/redux';
import { csrfFetch } from './csrf';
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const EDIT_USER = 'session/editUser';


const setUser = (user: User ) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => { //action
  return {
    type: REMOVE_USER,
  };
};

const editUser = (user: User) => {
  return {
    type: EDIT_USER,
    payload: user
  }
}

//thunk
export const signup = (user: SignUpUser):any => async (dispatch: any): Promise<any> => {
    const {firstName, lastName, email, username, password, isHost} = user;
    try {
      const response = await csrfFetch("/api/users", {
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
}

export const restoreUser = () => async (dispatch: Dispatch) => {
    const response = await csrfFetch('/api/session');
    if(response.ok){
        const data = await response.json();
        dispatch(setUser(data));
        // dispatch(removeUser())
        console.log(data)
        return response;
    } else {
        throw new Error("Unable to restore user");
    }
};

export const logout = ():any => async (dispatch: Dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
    headers: {"Content-Type": "application/json"}
  });
  dispatch(removeUser());
  return response;
};

export const login = (user: {credential: string, password: string}):any => async (dispatch: any): Promise<any> => { //thunks for database
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if(response.ok){
    const data = await response.json();
    dispatch(setUser(data)); //updates state
    return response;
  } else{
    return response
  }
};

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
  const response = await csrfFetch(`/api/users/${id}`, options);
  if(response.ok){
    const data = await response.json();
    dispatch(editUser(data));
    return response;
  } else{
    return response;
  }
}

export const deleteUserThunk = (user:any):any => async(dispatch:any): Promise<any> => {
  const {id} = user;

  const options = {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
  }
  const response = await csrfFetch(`/api/users/${id}`, options);
  if(response.ok){
    dispatch(removeUser())
  } else{
    return response;
  }
}



//initial state for session
const initialState: SessionInitialState = {
    user: null
}

export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<{ user:User }>) => {
            state.user = action.payload.user;
        },
        editUser: (state, action: PayloadAction<{user: User}>) => {
          state.user = action.payload.user;
        },
        removeUser: (state) => {
          state.user = null;
        }
    //additional reducers go here
  }
});

export default SessionSlice.reducer;
