import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Spot, SpotInitialState, INewSpotForm, IEditForm } from "../typings/redux";
import axios from "axios";
import urlParser from "../utils/url-parser";


// export const apiSpotSlice = createApi({
//     reducerPath: 'spots',
//     baseQuery: fetchBaseQuery({ baseUrl: `${urlParser(`api`)}`}),
//     endpoints: builder => ({
//         getAllSpots: builder.query({
//             query: () =>'/spots'
//         }),
//         getAllPaginatedSpots: builder.query({
//             query: ({ page, size }) => {
//                 return `/spots?page=${page}&size=${size}`;
//             },
//             transformResponse: (res: { Spots: Spot[] }) => {
//                 res.Spots.sort((a, b) => a.id - b.id);
//                 return res;
//             },
//         }),
//         getUserSpots: builder.query({
//             query: userId => `/spots/current/${userId}`
//         }),
//         getSingleSpot: builder.query({
//             query: spotId  => `/spots/${spotId}`
//         })
//     })
// });

// export const { useGetAllSpotsQuery, useGetAllPaginatedSpotsQuery } = apiSpotSlice;

// DEFINE THUNKS
// To get all spots
export const getAllSpots = createAsyncThunk("spots/fetchAllSpots", async () => {
    try {
        const response = await axios.get(urlParser(`api/spots`));
        return response.data;
    } catch (error) {
        throw error
    }
});

// To get all spots with search parameters
export const getAllPaginatedSpots = createAsyncThunk("spots/fetchAllPaginatedSpots", async ({ page, size }: { page: number, size: number }) => {
    try {
        const response = await axios.get(urlParser(`api/spots?page=${page}&size=${size}`));
        return response.data;
    } catch (error) {
        throw error
    }
});

// To get all of the current users spots
export const getCurrUserSpots = createAsyncThunk("spots/fetchAllCurrUserSpots", async (userId:number) => {
    try {
        const response = await axios.get(urlParser(`api/spots/current/${userId}`));
        return response.data;
    } catch (error) {
        throw error
    }
});

// To get a spot's details
export const getSingleSpotDetails = createAsyncThunk("spots/fetchSingleSpotDetails", async (spotId:number) => {
    try {
        const response = await axios.get(urlParser(`api/spots/${spotId}`));
        return response.data;
    } catch (error) {
        throw error
    }
});

// To post a spot
export const createSpot = createAsyncThunk("spots/addSpot", async (form: INewSpotForm) => {
    try {
        const response = await axios.post(urlParser(`api/spots`), form);
        return response.data;
    } catch (error) {
        throw error
    }
});

// To edit a spot
export const editSpot = createAsyncThunk("spots/editSpot", async ({spotId, form}: {spotId:number, form:IEditForm}) => {
    try {
        const response = await axios.put(urlParser(`api/spots/${spotId}`), form);
        return response.data;
    } catch (error) {
        throw error
    }
});

// To delete a spot
export const deleteSpot = createAsyncThunk("spots/deleteSpot", async (spotId:number) => {
    try {
        const response = await axios.delete(urlParser(`api/spots/${spotId}`));
        return response.data;
    } catch (error) {
        throw error
    }
});


// DEFINE THE INITIAL STATE
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
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllSpots.fulfilled, (state, action) => {
            state.allSpots = action.payload.Spots.sort((a: {id:number}, b: {id:number}) => a.id - b.id);
        })
        .addCase(getAllPaginatedSpots.fulfilled, (state, action) => {
            state.allSpots = action.payload.Spots.sort((a: {id:number}, b: {id:number}) => a.id - b.id);
        })
        .addCase(createSpot.fulfilled, (state, action:PayloadAction<Spot>) => {
            if(state.byId !== null){
                state.byId[`${action.payload.id}`] = action.payload
            };
            if(state.allSpots instanceof Array){
                state.allSpots.push(action.payload);
            };
        })
        .addCase(editSpot.fulfilled, (state, action:PayloadAction<Spot>) => {
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
        })
        .addCase(deleteSpot.fulfilled, (state, action:PayloadAction<Spot>) => {
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
        })

    },
});

export default SpotSlice.reducer;
