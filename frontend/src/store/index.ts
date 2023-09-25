import { configureStore } from '@reduxjs/toolkit'
import { SessionSlice } from './session'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';


export const store = configureStore({
  reducer: {
    user: SessionSlice.reducer
  }
})

export const useAppDispatch: ()=> typeof store.dispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
