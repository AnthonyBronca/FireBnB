import { createSlice, PayloadAction, Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { Like, Likes, LikeRes, LikeInitialState } from "../typings/redux";


// Define thunks

// To get all likes
export const getAllLikes = (userId:number):any => async (dispatch: Dispatch): Promise<any> => {
    try {
        const response = await fetch(`/api/spots/likes/${userId}`);
        const data = await response.json();
        dispatch(setLikes(data));
        return data;
    } catch (error) {
        return error;
    }
};

// To add a like
export const addLikeThunk = (userId:number, spotId:number):any => async (dispatch:Dispatch): Promise<any> => {
    try {
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId})
        }
        const response = await fetch(`/api/spots/${spotId}/likes`, options);
        if(response.ok){
            const data = await response.json();
            dispatch(addLike(data));
        } else {
            throw response;
        }
    } catch (error) {
        return error;
    }
};

// To remove a like
export const removeLikeThunk = (userId: number, spotId:number):any => async (dispatch:Dispatch): Promise<any> => {
    try {
        const options = {
            method: "DELETE",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({userId})
            };

        const res = await fetch(`/api/spots/${spotId}/likes`, options);
        if(res.ok){
            const data = await res.json();
            dispatch(removeLike(data));
            return res;
        } else{
            throw res;
        }
    } catch (error) {
        return error;
    }
};


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