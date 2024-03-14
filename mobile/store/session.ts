import axios from 'axios';
import { SessionInitialState, SignUpUser, User } from '../typings/redux';
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import urlParser from '../utils/url-parser';
import { removeToken, saveToken } from '../utils/auth';


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const EDIT_USER = 'session/editUser';


const setUser = (user: User) => {
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
export const signup = (user: SignUpUser): any => async (dispatch: any): Promise<any> => {
    const { firstName, lastName, email, username, password, isHost } = user;
    try {
        const response = await axios.post("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                password,
                lastName,
                email,
                username,
                isHost: isHost || false
            }),
        });

        dispatch(setUser(response.data));
    } catch (res: any) {
        if (!res.ok) {
            let errors = await res.json();
            return errors;
        }
    }
}

export const restoreUser = () => async (dispatch: Dispatch) => {
    try{
        const response = await axios.get('/api/session');
        dispatch(setUser(response.data));
        return response;
    } catch(e){
        return e;
    }
};

export const logout = () => async (dispatch: Dispatch) => {
    const response = await axios.delete(urlParser('api/mobile/session'))
    .catch((e: any) => {
        if(e.response.status !== 200){
            return e.response
        } else{
            dispatch(setUser(e.response.data))
        }
    })
    let res = await removeToken();
    if(res === "removed"){
        dispatch(removeUser());
    }
    return { status: response.status, message: response.data, resMsg: res}
};

export const login = (user: { credential: string, password: string }): any => async (dispatch: any): Promise<any> => {
    const response = await axios.post(urlParser('api/mobile/session'), user)
    .catch((e:any)=> {
        if(e.response.status !== 200){
            return e.response
        }else{
            dispatch(setUser(e.response.data))
        }
    })
    await saveToken(response.headers.token);
    dispatch(setUser(response.data));
    return response;
};

export const editUserThunk = (user: any, form: any): any => async (dispatch: any): Promise<any> => {
    try{

        const { id } = user;
        const { editEmail, editFirstName, editLastName } = form;

        const response = await axios.put(`/api/users/${id}`, {
            firstName: editFirstName,
            lastName: editLastName,
            email: editEmail
        });
        dispatch(editUser(response.data));
        return response;
    } catch (e:any) {
        console.log(e.toJSON())
        return e.toJSON();
    }
}

export const deleteUserThunk = (user: any): any => async (dispatch: any): Promise<any> => {
    try{
        const { id } = user;
        await axios.delete(`/api/users/${id}`);
        dispatch(removeUser())
    } catch (e) {
        return e;
    }
}



//initial state for session
const initialState: SessionInitialState = {
    user: null,
}

export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User}>) => {
            console.log(action.payload)
            state.user = action.payload.user;
        },
        editUser: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
        },
        removeUser: (state) => {
            state.user = null;
        }
        //additional reducers go here
    }
});

export default SessionSlice.reducer;
