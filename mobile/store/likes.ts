import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Like, Likes, LikeRes, LikeInitialState, User } from "../typings/redux";
import axios from "axios";
import urlParser from "../utils/url-parser";

// DEFINE THUNKS
// To get all likes
const SET_LIKES = 'likes/setLikes';
const ADD_LIKE = 'likes/addLike';
const REMOVE_LIKE = 'likes/removeLike';

const setLikes = (likes: Likes) => {
    return {
        type: SET_LIKES,
        payload: likes
    }
}

const addLike = (like: LikeRes) => {
    return {
        type: ADD_LIKE,
        payload: like
    }
}

const removeLike = (like: Like) => {
    return {
        type: REMOVE_LIKE,
        payload: like
    }
}

export const fetchLikes = (userId: number): any => async (dispatch: any): Promise<any> => {
    try {
        const response = await axios.get(urlParser(`api/mobile/likes/${userId}`));
        if(response.status !== 200){
            throw response
        } else{
            dispatch(setLikes(response.data));
            return response.data;
        }
    } catch (e: any) {
        return e
    }
}

export const createLike = (data: {userId: number, spotId:number}): any => async (dispatch: any): Promise<any> => {
    try {
        const {spotId} = data;
        const response = await axios.post(urlParser(`api/mobile/likes/${spotId}`), data);
        if(response.status !== 200){
            throw response.data
        } else {
            dispatch(addLike(response.data));
            return response;
        }
    } catch (e: any) {
        return e.data;
    }
}


// // To remove a like
// export const deleteLike = createAsyncThunk("likes/removeLike", async (spotId:number) => {
//     try {
//         const response = await axios.delete(urlParser(`api/spots/${spotId}/likes`));
//         return response.data;
//     } catch (error) {
//         return error
//     }
//   });



const initialState: LikeInitialState = {
    allLikes: [],
    byId: {}
}

export const LikeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        setLikes: (state, action: PayloadAction<Likes>) => {
            state.byId = {};
            state.allLikes = action.payload.likes;
            for (let like of action.payload.likes) {
                let spot = like.Spot
                if (!state.byId[`${spot.id}`]) {
                    state.byId[`${spot.id}`] = spot;
                }
            }
        },
        addLike: (state, action: PayloadAction<LikeRes>) => {
            if (state.byId) {
                state.byId[`${action.payload.Spot.id}`] = action.payload.Spot;
            }
            if (state.allLikes) {
                state.allLikes.push(action.payload.like)
            }
        },
        removeLike: (state, action: PayloadAction<Like>) => {
            if (state.byId) {
                delete state.byId[`${action.payload.spotId}`];
            }
            if (state.allLikes) {
                let newLikes = state.allLikes.filter((like: Like) => {
                    return like.spotId !== action.payload.spotId
                })
                state.allLikes = newLikes
            }

        }
    }
});

export default LikeSlice.reducer;
