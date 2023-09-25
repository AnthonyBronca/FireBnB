import { SessionInitialState } from '../typings/redux';
import { csrfFetch } from './csrf';
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


interface User {
    user: {
    id: number,
    firstName: string,
    lastName: string,
    email: string
    username: string,
  }}

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
//Initial State for Session
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


export const signup = (user: {credential: string, password: string}) => async (dispatch: Dispatch) => {
    const {credential, password} = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    console.log(response)
    if(response.ok){
        const data = await response.json();
        dispatch(setUser(data.user));
        return data;
    } else {
        throw new Error("Unable to sign up")
    }
}

export const restoreUser = () => async (dispatch: Dispatch) => {
    // console.log('am i here?')
    const response = await csrfFetch('/api/session');
    // console.log(data)
    if(response.ok){
        const data = await response.json();
        dispatch(setUser(data));
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
  const data = await response.json();
  console.log(data)
  dispatch(setUser(data)); //updates state
  return response;
};




const initialState: SessionInitialState = {
    user: null
}

export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<{ user:any }>) => {
            console.log(action.payload)
            state.user = action.payload.user;
        },
    //additional reducers go here
  }
});

export default SessionSlice.reducer;
