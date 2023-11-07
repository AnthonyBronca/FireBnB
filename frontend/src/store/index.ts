import {configureStore} from '@reduxjs/toolkit'
import {SessionSlice} from './session'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'


const reducer = {
    session: SessionSlice.reducer,
}
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
})


declare global {
    interface Window {
        csrfFetch: any,
        store: any,
        sessionActions:any,
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any,
        compose:any
    }
}





export const useAppDispatch: ()=> typeof store.dispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
