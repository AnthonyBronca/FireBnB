import { createSlice, PayloadAction, Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { Spot, SpotInitialState, INewSpotForm, IEditForm } from "../typings/redux";

import axios from "axios";

// Define thunks

// To get all spots
export const fetchSpots = createAsyncThunk("spots/setSpots", async () => {
    try {
        const response = await axios.get("/api/spots")
        return response.data;
    } catch (error) {
        throw error
    }
});

// To get all of the user's spots
export const fetchUserSpots = createAsyncThunk("spots/getUserSpots", async (userId:number) => {
    try {
        const response = await axios.get(`/api/spots/current/${userId}`);
        return response.data;
    } catch (error) {
        throw error
    }
})

// To get a spot's details
export const fetchSingleSpot = createAsyncThunk("spots/setSpot", async (spotId:number) => {
    try {
        const response = await axios.get(`/api/spots/${spotId}`);
        return response.data;
    } catch (error) {
        throw error
    }
});

// To post a spot
export const createSpot = createAsyncThunk("spots/addSpot", async (form: INewSpotForm) => {
    try {
        const response = await axios.post('/api/spots', form);
        return response.data;
    } catch (error) {
        throw error
    }
});

// To edit a spot
export const modifySpot = createAsyncThunk("spots/editSpot", async ({spotId, form}: {spotId:number, form:IEditForm}) => {
    try {
        const response = await axios.put(`/api/spots/${spotId}`, form);
        return response.data;
    } catch (error) {
        throw error
    }
});

// To delete a spot
export const removeSpot = createAsyncThunk("spots/deleteSpot", async (spotId:number) => {
    try {
        const response = await axios.delete(`/api/spots/${spotId}`);
        return response.data;
    } catch (error) {
        throw error
    }
});


// Define the initial state
const initialState: SpotInitialState = {
    byId: {},
    allSpots: [],
    userSpots: [],
    userSpotId: {}
};

// SpotSlice reducer
export const SpotSlice = createSlice({
    name: 'spots',
    initialState,
    reducers: {
        setSpots: (state, action: PayloadAction<{Spots: Spot[]}>) => {
            state.byId = {};
            state.allSpots = action.payload.Spots;

            for(let spot of action.payload.Spots){
                if(!state.byId[`${spot.id}`]){
                    state.byId[`${spot.id}`] = spot;
                }
            };
        },
        addSpot: (state, action: PayloadAction<Spot>) => {
            if(state.byId !== null){
                state.byId[`${action.payload.id}`] = action.payload
            };
            if(state.allSpots instanceof Array){
                state.allSpots.push(action.payload);
            };
        },
        setSpot: (state, action: PayloadAction<Spot>) => {
            if(state.byId){
                state.byId[`${action.payload.id}`] = action.payload;
            };
        },
        getUserSpots: (state, action: PayloadAction<{Spots: Spot[]}>) => {
            state.userSpotId = {};
            state.userSpots = action.payload.Spots;
            for (let spot of action.payload.Spots){
                if(!state.userSpotId[`${spot.id}`]){
                    state.userSpotId[`${spot.id}`] = spot;
                };
            };
        },
        editSpot: (state, action: PayloadAction<Spot>) => {
            if(state.userSpotId && state.userSpotId[`${action.payload.id}`]){
                state.userSpotId[`${action.payload.id}`].name = action.payload.name;
                state.userSpotId[`${action.payload.id}`].price = action.payload.price;
            };
            if(state.byId && state.byId[`${action.payload.id}`]){
                state.byId[`${action.payload.id}`].name = action.payload.name;
                state.byId[`${action.payload.id}`].price = action.payload.price;
            };
            if(state.userSpots && state.userSpots.length > 0){
                for(let i = 0; i < state.userSpots.length; i++){
                 let spot = state.userSpots[i];
                 if(spot.id === action.payload.id){
                     state.userSpots[i].name = action.payload.name;
                     state.userSpots[i].price = action.payload.price;
                     break;
                 }
                }
            };
            if(state.allSpots && state.allSpots.length > 0){
                for(let i = 0; i < state.allSpots.length; i++){
                 let spot = state.allSpots[i];
                 if(spot.id === action.payload.id){
                     state.allSpots[i].name = action.payload.name;
                     state.allSpots[i].price = action.payload.price;
                     break;
                 }
                }
            };
        },
        deleteSpot: (state, action: PayloadAction<Spot>) => {
            if(state.allSpots && state.allSpots.length > 0){
                let newState = state.allSpots.filter(spot => {
                    return spot.id !== action.payload.id;
                })
                state.allSpots = newState;
            };
            if(state.byId && state.byId[`${action.payload.id}`]){
                delete state.byId[`${action.payload.id}`]
            };
            if(state.userSpots && state.userSpots.length > 0){
                let newState = state.userSpots.filter(spot => {
                    return spot.id !== action.payload.id;
                })
                state.userSpots = newState;
            };
            if(state.userSpotId && state.userSpotId[`${action.payload.id}`]){
                delete state.userSpotId[`${action.payload.id}`];
            };
        },
    },
});

export const { 
    setSpots, 
    addSpot, 
    setSpot, 
    getUserSpots, 
    editSpot, 
    deleteSpot 
} = SpotSlice.actions;

export default SpotSlice.reducer;
