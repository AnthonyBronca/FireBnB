import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Like, Likes, LikeRes, LikeInitialState } from "../typings/redux";
import axios from "axios";

// DEFINE THUNKS
// To get all likes
export const fetchLikes = createAsyncThunk("likes/fetchLikes", async (userId:number) => {
    try {
        const response = await axios.get(`/api/spots/likes/${userId}`);
        return response.data;
    } catch (error) {
        throw error
    }
  });

// To add a like
export const createLike = createAsyncThunk("likes/addLike", async (spotId:number) => {
    try {
        const response = await axios.post(`/api/spots/${spotId}/likes`);
        return response.data;
    } catch (error) {
        throw error
    }
  });

// To remove a like
export const deleteLike = createAsyncThunk("likes/removeLike", async (spotId:number) => {
    try {
        const response = await axios.delete(`/api/spots/${spotId}/likes`);
        return response.data;
    } catch (error) {
        throw error
    }
  });


// DEFINE THE INITIAL STATE
const initialState: LikeInitialState = {
    byId: {},
    allLikes: []
};

// LikeSlice reducer
export const LikeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLikes.fulfilled, (state, action:PayloadAction<Likes>) => {
            state.byId = {};
            state.allLikes = action.payload.likes;
            for(let like of action.payload.likes){
                let spot = like.Spot
                if(!state.byId[`${spot.id}`]){
                    state.byId[`${spot.id}`] = spot;
                };
            };
        })
        .addCase(createLike.fulfilled, (state, action:PayloadAction<LikeRes>) => {
            if(state.byId){
                state.byId[`${action.payload.Spot.id}`] = action.payload.Spot;
            };
            if(state.allLikes){
                state.allLikes.push(action.payload.like);
            };
        })
        .addCase(deleteLike.fulfilled, (state, action:PayloadAction<Like>) => {
            if(state.byId){
                delete state.byId[`${action.payload.spotId}`];
            };
            if (state.allLikes) {
                state.allLikes = state.allLikes.filter(
                  (like: Like) => like.spotId !== action.payload.spotId
                );
            };
        })
    } 
});

export default LikeSlice.reducer;