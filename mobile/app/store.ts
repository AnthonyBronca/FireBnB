import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { SessionSlice } from "./session";
import { SpotSlice } from "./spots";
import { LikeSlice } from "./likes";

const rootReducer = combineReducers({
    session: SessionSlice,
    spots: SpotSlice,
    likes: LikeSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch