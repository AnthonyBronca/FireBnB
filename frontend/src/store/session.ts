import { SessionInitialState, SignUpUser, User } from '../typings/redux';
import { csrfFetch } from './csrf';
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


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

//thunk
export const signup = (user: SignUpUser):any => async (dispatch: any): Promise<any> => {
    const {firstName, lastName, email, username, password} = user;
    try {
      const response = await csrfFetch("/api/users", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              firstName,
              password,
              lastName,
              email,
              username
          }),
      });
      const data = await response.json();
        dispatch(setUser(data));
    } catch (res:any) {
      if(!res.ok){
        let errors = await res.json();
        console.log(errors)
        return errors;
      }
    }
}

export const restoreUser = () => async (dispatch: Dispatch) => {
    const response = await csrfFetch('/api/session');
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

  if(response.ok){
    const data = await response.json();
    dispatch(setUser(data)); //updates state
    return response;
  } else{
    return response
  }
};



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
    //additional reducers go here
  }
});

export default SessionSlice.reducer;
