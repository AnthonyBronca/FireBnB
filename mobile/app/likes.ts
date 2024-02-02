import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Like, Likes, LikeRes, LikeInitialState } from "../typings/redux";


// Define the initial state
const initialState: LikeInitialState = {
    byId: {},
    allLikes: []
};

// LikeSlice reducer
export const LikeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        setLikes: (state, action: PayloadAction<Likes>) => {
            state.byId = {};
            state.allLikes = action.payload.likes;
            for(let like of action.payload.likes){
                let spot = like.Spot
                if(!state.byId[`${spot.id}`]){
                    state.byId[`${spot.id}`] = spot;
                };
            };
        },
        addLike: (state, action: PayloadAction<LikeRes>) => {
            if(state.byId){
                state.byId[`${action.payload.Spot.id}`] = action.payload.Spot;
            };
            if(state.allLikes){
                state.allLikes.push(action.payload.like);
            };
        },
        removeLike: (state, action:PayloadAction<Like>) => {
            if(state.byId){
                delete state.byId[`${action.payload.spotId}`];
            };
            if(state.allLikes){
                let newLikes = state.allLikes.filter((like:Like) => {
                    return like.spotId !== action.payload.spotId
                })
                state.allLikes = newLikes;
            };
        },
    },
});

export const { 
    setLikes, 
    addLike, 
    removeLike 
} = LikeSlice.actions;

export default LikeSlice.reducer;